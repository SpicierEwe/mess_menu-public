import Image from "next/image";

function LoadingScreenComponent() {
  return (
    <div>
      <Image
        src="/images/logo/comapny_logo.png"
        alt="loading_screen"
        height="1500"
        width="1500"
      ></Image>
    </div>
  );
}

export default LoadingScreenComponent;
