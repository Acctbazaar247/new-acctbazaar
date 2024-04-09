import { INotifications } from "@/types/common";
import { apiSlice } from "../apiSlice/apiSlice";
export const notificationsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotificationss: builder.query({
      query: (query) => {
        return {
          url: `/notification`,
        };
      },
    }),
    getNotificationsById: builder.query({
      query: (id) => `/notificationss/${id}`,
    }),
    addNotifications: builder.mutation({
      query: (info) => {
        return {
          url: "/notification",
          method: "POST",
          body: info,
        };
      },
    }),
    editNotifications: builder.mutation({
      query: () => {
        return {
          url: `/notification/update-seen`,
          method: "PATCH",
          // body: info,
        };
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // const result = await queryFulfilled;

        // update data
        const pathResult1 = dispatch(
          notificationsApi.util.updateQueryData(
            "getNotificationss",
            "",
            (draft) => {
              // console.log(JSON.stringify(draft));
              if (draft) {
                draft.data = draft?.data?.map((single: INotifications) => {
                  return {
                    ...single,
                    isSeen: true,
                  };
                });
              }
            }
          )
        );
        try {
          await queryFulfilled;
        } catch (err) {
          // pathResult1.undo();
        }
      },
    }),
    deleteNotifications: builder.mutation({
      query: (id) => {
        return {
          url: `/notificationss/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});
export const {
  useGetNotificationssQuery,
  useAddNotificationsMutation,
  useDeleteNotificationsMutation,
  useEditNotificationsMutation,
  useGetNotificationsByIdQuery,
} = notificationsApi;
