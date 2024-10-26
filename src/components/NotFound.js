import React from "react";

function NotFound() {
  return (
    <div
      className="relative lg:rounded-l-[50px] lg:rounded-tr-[0px] rounded-t-[40px] bg-white h-full w-full"
      style={{ minHeight: "calc(100vh - 70px)" }}
    >
      <h1
        className="absolute md:text-[25px] text-[22px] font-medium text-gray-500 w-full flex justify-center"
        style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%" }}
      >
        404 | Not Found.
      </h1>
    </div>
  );
}

export default NotFound;
