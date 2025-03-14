import React, { useContext, useEffect, useState } from "react";
import { BaseUrl } from "../constants/theme";
import ProfileUploader from "../components/ProfileUploader";
import axios from "axios";
import { UserProfileContext } from "../context/UserProfileContext";
import Loading from "../components/Loading";
import Header from "../components/Header";
import { toast } from "react-toastify";
import useFetchProfile from "../hooks/useFetchProfile";

const ProfileDetials = () => {
  const { refetch: refreshFetchProfile } = useFetchProfile();
  const { profileDetails, isLoading, error, refetch, updateProfileDetails } =
    useContext(UserProfileContext);

  useEffect(() => {
    refetch();
  }, []);

  const [profile, setProfile] = useState(profileDetails?.profile || "");
  const [firstName, setFirstName] = useState(profileDetails?.firstName || "");
  const [lastName, setLastName] = useState(profileDetails?.lastName || "");
  const [email, setEmail] = useState(profileDetails?.email || "");
  const [phone, setPhone] = useState(profileDetails?.phone || "");
  const [currentImage, setCurrentImage] = useState(
    profileDetails?.profile || ""
  );
  const [loadProfile, setLoadProfile] = useState(false);

  useEffect(() => {
    if (profileDetails) {
      setProfile(profileDetails.profile);
      setFirstName(profileDetails.firstName);
      setLastName(profileDetails.lastName);
      setEmail(profileDetails.email);
      setPhone(profileDetails.phone);
      setCurrentImage(profileDetails.profile);
    }
  }, [profileDetails]);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) throw new Error("Token not found");
      const accessToken = JSON.parse(token);
      setLoadProfile(true);

      const response = await axios.put(
        `${BaseUrl}/api/users`,
        {
          profile,
          firstName,
          lastName,
          phone,
          email,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Profile details updated successfully", {
          position: "top-center",
        });

        // Update context with the new data
        updateProfileDetails({
          ...profileDetails,
          profile,
          firstName,
          lastName,
          phone,
          email,
        });
        refetch();
        refreshFetchProfile();
      }
      setLoadProfile(false);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("Please fill out all required fields.", {
          position: "top-center",
        });
      } else {
        toast.error("Failed to update profile", {
          position: "top-center",
        });
      }
      setLoadProfile(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col h-[calc(100dvh)] overflow-y-auto bg-white items-center pb-[50px]">
        <Header text="Edit Profile Details" />
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100dvh)] overflow-y-auto bg-white items-center pb-[50px]">
      <Header text="Edit Profile Details" />
      <div className="w-full max-w-2xl pt-[20px] px-[12px]">
        <div className="flex justify-center my-[30px]">
          <ProfileUploader
            selectedImage={profile}
            setSelectedImage={setProfile}
            currentImage={currentImage}
            label={"Edit profile pic"}
          />
        </div>
        <div className="space-y-4">
          <div className="flex items-center border border-gray-300 rounded-[12px] p-[12px] focus-within:ring-1 focus-within:ring-primary mb-[20px] bg-gray-100">
            <input
              type="text"
              className="w-full outline-none  bg-gray-100 placeholder:text-[10px]  text-[10px] md:text-[12px]"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="flex items-center border border-gray-300 rounded-[12px] p-[12px] focus-within:ring-1 focus-within:ring-primary mb-[20px] bg-gray-100">
            <input
              type="text"
              className="w-full outline-none  bg-gray-100 placeholder:text-[10px]  text-[10px] md:text-[12px]"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="flex items-center border border-gray-300 rounded-[12px] p-[12px] focus-within:ring-1 focus-within:ring-primary mb-[20px] bg-gray-100">
            <input
              type="tel"
              className="w-full outline-none  bg-gray-100 placeholder:text-[10px]  text-[10px] md:text-[12px]"
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-center mt-[20px]">
          <button
            onClick={handleUpdate}
            className="max-w-lg w-full py-3 text-white font-bold rounded-lg flex justify-center items-center bg-primary hover:bg-orange-600"
          >
            {loadProfile ? (
              <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Update Profile"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetials;
