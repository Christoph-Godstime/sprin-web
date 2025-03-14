import React, { useContext } from "react";
import { UserProfileContext } from "../context/UserProfileContext";
import { BsClipboard, BsShare } from "react-icons/bs";
import { toast } from "react-toastify";
import Header from "../components/Header";

const Referral = () => {
  const { profileDetails } = useContext(UserProfileContext);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(profileDetails.referralCode);
      toast.success("Referral code copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy referral code.");
    }
  };

  const shareReferralCode = async () => {
    try {
      await navigator.share({
        title: "Sprin Referral Code",
        text: `Hi! Enjoy ₦500 off your first order on Sprin using my referral code "${profileDetails.referralCode}"! Download the app and start ordering here:`,
        url: "https://www.sprinapp.com",
      });
    } catch (error) {
      toast.error("Failed to share referral code.");
    }
  };

  return (
    <div className="flex flex-col h-[calc(100dvh)] overflow-y-auto bg-white items-center pb-[100px]">
      <Header text="Refer a Friend" />
      <div className="w-full max-w-2xl pt-[20px] px-[12px] flex flex-col items-center">
        <h1 className="text-xl font-medium text-black text-center pb-4">
          Earn ₦500 For Every Friend You Invite
        </h1>
        <p className="text-[12px] text-black text-center pb-6 max-w-lg">
          Share your unique referral code below with your friends. They will get
          an immediate discount of ₦500 on their first order when they use your
          referral code and you will get ₦500 in your wallet. The more people
          use your code, the more times you can earn. You can always use your
          wallet balance to pay for an order at any time. Terms & conditions
          apply.
        </p>
        <div className="text-lg font-medium text-primary text-center bg-gray-100 px-4 py-2 rounded-lg mb-6">
          {profileDetails.referralCode}
        </div>
        <div className="flex flex-col gap-3 w-full max-w-xs">
          <button
            className="flex items-center justify-center gap-2 border border-primary text-primary py-2 rounded-md hover:bg-primary hover:text-white transition"
            onClick={copyToClipboard}
          >
            <BsClipboard size={16} /> Copy Code
          </button>
          <button
            className="flex items-center justify-center gap-2 bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition"
            onClick={shareReferralCode}
          >
            <BsShare size={16} /> Share Code
          </button>
        </div>
      </div>
    </div>
  );
};

export default Referral;
