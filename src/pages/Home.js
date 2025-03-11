import React from "react";
import BottomNavBar from "../components/BottomNavBar";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white items-center pb-[100px]">
      <div className="w-full max-w-2xl">
        <h4>Home</h4>
      </div>
      <BottomNavBar />
    </div>
  );
};

export default Home;
