import Image from "next/image";

function LoadingScreenComponent() {
  return (
    <div>
      <Image
        src="/images/loading_screen.gif"
        alt="loading_screen"
        height="100vh"
        width="100vw"
      ></Image>
    </div>
  );
}

export default LoadingScreenComponent;
