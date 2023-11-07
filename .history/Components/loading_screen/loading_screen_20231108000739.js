import Image from "next/image";

function LoadingScreenComponent() {
  return (
    <div className={StyleSheet.container}>
      <Image
        src="/images/logo/company_logo.png"
        alt="loading_screen"
        height="1500"
        width="1500"
      ></Image>
    </div>
  );
}

export default LoadingScreenComponent;
