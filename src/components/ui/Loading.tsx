import Image from "next/image";

const Loading = ({ screen = "full" }: { screen?: "full" | "half" }) => {
  return (
    <div
      className={`flex items-center justify-center gap-4 ${
        screen === "full" ? "h-screen" : " h-[50dvh]"
      }`}
    >
      {/* <div className="loader">
        <div className="loader-square bg-primary"></div>
        <div className="loader-square bg-primary"></div>
        <div className="loader-square bg-primary"></div>
        <div className="loader-square bg-primary"></div>
        <div className="loader-square bg-primary"></div>
        <div className="loader-square bg-primary"></div>
        <div className="loader-square bg-primary"></div>
      </div> */}
      <Image
        src="/assets/logo.PNG"
        className="size-20 lg:size-40 animate-pulse"
        alt="loader"
        width={400}
        height={400}
      />
    </div>
  );
};

export default Loading;
