import React from "react";
import Logo from "./SprinLogo";

const LoadingScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100dvh)] overflow-y-auto bg-secondary relative">
      <div className="w-[40px] h-[40px] border-4 border-primary border-t-transparent rounded-full animate-spin mb-[30px]"></div>
      <Logo />
    </div>
  );
};

export default LoadingScreen;
