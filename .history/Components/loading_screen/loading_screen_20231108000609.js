import Image from "next/image";

function LoadingScreenComponent() {
  return (
    <div>
      <Image
        src="/images/logo/logo.png"
        alt="loading_screen"
        height="100vh"
        width="100vw"
      ></Image>
    </div>
  );
}

export default LoadingScreenComponent;
