import { useState, useEffect } from "react";

const InstallBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if the user is on an Android device
    const isAndroid = /android/i.test(navigator.userAgent);

    // Check if the banner has already been dismissed
    const isDismissed = localStorage.getItem("appInstallDismissed");

    if (isAndroid && !isDismissed) {
      setShowBanner(true);
    }
  }, []);

  const handleInstall = () => {
    // Redirect to Google Play Store
    window.location.href =
      "https://play.google.com/store/apps/details?id=com.sprin.sprincustomer"; // Replace with your Play Store URL
  };

  const handleDismiss = () => {
    setShowBanner(false);
    localStorage.setItem("appInstallDismissed", "true"); // Prevent showing again
  };

  if (!showBanner) return null;

  return (
    <div className="w-full px-[12px] fixed bottom-[70px] flex justify-center z-40">
      <div className="max-w-lg w-full py-3 text-white font-bold rounded-lg flex  items-center bg-primary  space-x-[10px] justify-between px-[12px] shadow-lg">
        <p className="text-[12px]">Install SprinApp for a better experience!</p>
        <button
          onClick={handleInstall}
          className="bg-white text-orange-500 px-3 py-1 rounded-md font-semibold text-[12px]"
        >
          Install
        </button>
        <button
          onClick={handleDismiss}
          className="text-white text-lg font-bold ml-2"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default InstallBanner;
