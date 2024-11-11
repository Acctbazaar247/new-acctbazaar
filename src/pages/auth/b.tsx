import React from "react";

type Props = {
  items: {
    name: string;
  };
};

const B = (props: Props) => {
  function sendDataToWebView() {
    const data = {
      type: "userInfo",
      payload: {
        userId: 123,
        name: "John Doe",
        age: 30
      }
    };

    // Convert the data to a string before sending
    // window?.ReactNativeWebView?.postMessage(JSON.stringify(data));
  }

  return (
    <div
      onClick={sendDataToWebView}
      className="mt-10 w-full bg-green-900 text-white h-[30px] "
    >
      b
    </div>
  );
};

export default B;
