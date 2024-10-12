const Loading = ({ screen = "full" }: { screen?: "full" | "half" }) => {
  return (
    <div
      className={`flex items-center justify-center gap-4 ${
        screen === "full" ? "h-screen" : " h-[50dvh]"
      }`}
    >
      <div className="loader">
        <div className="loader-square bg-loader"></div>
        <div className="loader-square bg-loader"></div>
        <div className="loader-square bg-loader"></div>
        <div className="loader-square bg-loader"></div>
        <div className="loader-square bg-loader"></div>
        <div className="loader-square bg-loader"></div>
        <div className="loader-square bg-loader"></div>
      </div>
    </div>
  );
};

export default Loading;
