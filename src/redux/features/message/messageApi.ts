import { io } from "socket.io-client";
import { apiSlice } from "./../apiSlice/apiSlice";
import config from "@/utils/config";
const url = config.serverUrl || "";
export const messageApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: (query) => {
        return {
          url: `/message?${query}`,
        };
      },
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved, dispatch }
      ) {
        // create socket

        const socket = io(url.replace(/\/api\/v1/g, ""), {
          reconnectionDelay: 1000,
          reconnection: true,
          reconnectionAttempts: 10,
          transports: ["websocket"],
          agent: false,
          upgrade: false,
          rejectUnauthorized: false,
        });

        try {
          await cacheDataLoaded;
          socket?.emit("join-room", arg.replace(/orderId=/g, ""));
          socket.on("receive-message", (data) => {
            // console.log("hi i have reacive a message");
            updateCachedData((draft) => {
              draft.data.push(data);
              // console.log(JSON.parse(JSON.stringify(draft)));
              draft.meta.unSeenCount++;
            });
          });
        } catch (err) {}

        await cacheEntryRemoved;
        socket.close();
      },
    }),
    getMessageById: builder.query({
      query: (id: any) => `/message/${id}`,
    }),
    addMessage: builder.mutation({
      query: (info) => {
        return {
          url: "/message",
          method: "POST",
          body: info,
        };
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // const result = await queryFulfilled;

        const socket = io(url.replace(/\/api\/v1/g, ""), {
          reconnectionDelay: 1000,
          reconnection: true,
          reconnectionAttempts: 10,
          transports: ["websocket"],
          agent: false,
          upgrade: false,
          rejectUnauthorized: false,
        });
        const id = "pending";
        // update data
        const pathResult1 = dispatch(
          messageApi.util.updateQueryData(
            "getMessages",
            `orderId=${arg.orderId}`,
            (draft) => {
              draft.data.push({
                ...arg,
                id,
                name: "name",
                profileImg: "a image",
              });
            }
          )
        );

        // optimistic cache update end
        try {
          const result = await queryFulfilled;

          if (result?.data?.success) {
            socket.emit("send-message", result.data.data);
            pathResult1.undo();
            // dispatch(
            //   messageApi.util.updateQueryData(
            //     "getMessages",
            //     `orderId=${arg.orderId}`,
            //     (draft) => {
            //       // draft.data.push(result.data.data);
            //     }
            //   )
            // );
          }
        } catch (err) {
          pathResult1.undo();
        }
      },
    }),
    editMessage: builder.mutation({
      query: (info) => {
        return {
          url: `/message/${info.id}`,
          method: "PATCH",
          body: info,
        };
      },
    }),
    updateSeenMessage: builder.mutation({
      query: (info) => {
        return {
          url: `/seen-message`,
          method: "PATCH",
          body: info,
        };
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // console.log(`orderId=${arg.orderId}`);
        dispatch(
          messageApi.util.updateQueryData(
            "getMessages",
            `orderId=${arg.orderId}`,
            (draft) => {
              // console.log("DSSS", JSON.stringify(draft));
              if (draft) {
                draft.meta.unSeenCount = 0;
              }
            }
          )
        );
        try {
          await queryFulfilled;
        } catch (e) {}
      },
    }),
    deleteMessage: builder.mutation({
      query: (id) => {
        return {
          url: `/message/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});
export const {
  useGetMessagesQuery,
  useAddMessageMutation,
  useDeleteMessageMutation,
  useEditMessageMutation,
  useGetMessageByIdQuery,
  useUpdateSeenMessageMutation,
} = messageApi;
