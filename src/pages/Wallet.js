import React, { useContext, useEffect } from "react";
import { UserProfileContext } from "../context/UserProfileContext";
import Loading from "../components/Loading";
import Header from "../components/Header";

const Wallet = () => {
  const { profileDetails, isLoading, refetch } = useContext(UserProfileContext);

  useEffect(() => {
    refetch();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-white items-center pb-[50px]">
        <Header text="Wallet Balance" />
        <Loading />
      </div>
    );
  }

  const walletBalance = Number(profileDetails.walletBalance).toFixed(2);
  const formattedBalance = Number(walletBalance).toLocaleString("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  });

  return (
    <div className="flex flex-col min-h-screen bg-white items-center pb-[100px]">
      <Header text="Wallet Balance" />
      <div className="w-full max-w-2xl pt-[20px] px-[12px] flex flex-col items-center">
        <h2 className="text-lg font-bold text-primary mb-2">Total in NGN</h2>
        <p className="text-2xl font-semibold text-black">{formattedBalance}</p>
      </div>
    </div>
  );
};

export default Wallet;
