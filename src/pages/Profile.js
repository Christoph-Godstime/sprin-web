import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App";
import { UserProfileContext } from "../context/UserProfileContext";
import useFetchProfile from "../hooks/useFetchProfile";
import ProfileTile from "../components/ProfileTile";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import AssetImage from "../components/AssetImage";
import Header from "../components/Header";
import LoadingScreen from "../components/LoadingScreen";
import BottomNavBar from "../components/BottomNavBar";
import RegistrationTile from "../components/RegistrationTile";
import ScrollToTopOnMount from "../components/ScrollToTopOnMount";

const Profile = () => {
  const { signOut, isSigningOut } = useContext(AuthContext);
  const { profileDetails, isLoading } = useContext(UserProfileContext);
  const { user } = useFetchProfile();
  const navigate = useNavigate();

  if (isSigningOut) {
    return <LoadingScreen />;
  }

  const handlePress = (url) => {
    window.open(url, "_blank");
  };

  const profile =
    "https://firebasestorage.googleapis.com/v0/b/sprinfare2024.appspot.com/o/images%2Fboy.png?alt=media&token=bf004ac5-75a6-4d0d-b323-91fe9021754e";

  return (
    <div className="h-dvh">
      <div className="flex flex-col h-[calc(100dvh)] overflow-y-auto bg-gray-100 items-center pb-[100px] relative">
        <ScrollToTopOnMount />
        <Header text="Profile" />
        <div className="w-full max-w-2xl pt-[20px] px-[12px]">
          <div className="flex flex-col flex-grow">
            <div className="flex justify-between items-center mb-4">
              {isLoading ? (
                <p className="text-gray-600">Loading Profile...</p>
              ) : (
                <div className="flex items-center">
                  <AssetImage
                    data={
                      profileDetails === null
                        ? profile
                        : profileDetails?.profile
                    }
                    width={45}
                    height={45}
                    radius={99}
                  />
                  <div className="ml-3  text-[10px] md:text-[12px]">
                    <p className="font-medium text-black">
                      {profileDetails
                        ? `${profileDetails.firstName} ${profileDetails.lastName}`
                        : ""}
                    </p>
                    <p className="text-gray-500">
                      {profileDetails?.email || ""}
                    </p>
                  </div>
                </div>
              )}

              <button onClick={signOut} className="text-red-500">
                {user ? <FiLogOut size={24} /> : <FiLogIn size={24} />}
              </button>
            </div>

            <div className=" mt-[10px]">
              <div className="bg-white px-[12px] pt-[4px] rounded-[12px]">
                <ProfileTile
                  title="Profile Details"
                  icon="person"
                  onPress={() => navigate("/profile-details")}
                />

                <ProfileTile
                  title="Refer to a Friend & Earn"
                  icon="gift"
                  onPress={() => navigate("/referral")}
                />
                <ProfileTile
                  title="My Wallet"
                  icon="wallet"
                  onPress={() => navigate("/wallet")}
                />
              </div>

              <RegistrationTile
                heading={"Join the courier team"}
                desc={
                  "Embark on a journey, deliver joy, and earn on your own schedule."
                }
                onClick={() => handlePress("https://www.sprinapp.com/riders")}
              />

              <div className="bg-white px-[12px] pt-[4px] rounded-[12px]">
                <ProfileTile
                  title="Delivery Addresses"
                  icon="location"
                  onPress={() => navigate("/shipping-address")}
                />
                <ProfileTile
                  title="Contact Us"
                  icon="customerservice"
                  onPress={() => navigate("/contact-us")}
                />
                <ProfileTile
                  title="Settings"
                  icon="setting"
                  onPress={() => navigate("/change-password")}
                />
              </div>

              <RegistrationTile
                heading={"Register a restaurant"}
                desc={
                  "Join our community and showcase your culinary delights to a wider audience."
                }
                onClick={() => handlePress("https://www.sprinapp.com/vendors")}
              />

              <div className="bg-white px-[12px] pt-[4px] rounded-[12px]">
                <ProfileTile
                  title="FAQs"
                  icon="questioncircle"
                  onPress={() => handlePress("https://www.sprinapp.com/faqs")}
                />
                <ProfileTile
                  title="Privacy Policy"
                  icon="privacy"
                  onPress={() =>
                    handlePress("https://www.sprinapp.com/privacy")
                  }
                />
                <ProfileTile
                  title="Terms of Use"
                  icon="bulb"
                  onPress={() => handlePress("https://www.sprinapp.com/terms")}
                />
                <ProfileTile
                  title="Delete Account"
                  icon="delete"
                  onPress={() =>
                    handlePress("https://www.sprinapp.com/delete-account")
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <BottomNavBar />
      </div>
    </div>
  );
};

export default Profile;
