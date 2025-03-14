import React, { useState } from "react";
import axios from "axios";
import ScrollToTopOnMount from "../components/ScrollToTopOnMount";

const DeleteAccount = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleDeleteRequest = async () => {
    if (!email) {
      setErrorMessage("Email is required");
      return;
    }

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/users/delete-request`,
        {
          email,
          message,
        },
        { withCredentials: true }
      );
      setSuccessMessage(response.data.message || "Request sent successfully");
      setEmail("");
      setMessage("");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" -mt-[70px] lg:-mt-[100px] 2xl:-mt-[200px] h-[calc(100dvh)] overflow-y-auto">
      <ScrollToTopOnMount />
      <div className="px-[3%] lg:px-[5%] xl:px-[15%] 2xl:px-[20%] pb-[100px] bg-orange-100 pt-[100px]">
        <h4 className="lg:text-[16px]  text-[10px] text-black md:w-[600px] mx-auto text-center">
          In accordance with our privacy policy, deleting your account and data
          can't be undone, so we need to check it's you before going ahead.
        </h4>
        <h4 className="lg:text-[16px]  text-[10px] text-black md:w-[600px] mx-auto text-center mt-[20px]">
          Send us a request and we'll confirm via email after we've reviewed it.
        </h4>

        <div className="flex justify-center mt-[30px]">
          <input
            type="email"
            name="email"
            className="py-[10px] px-[14px] rounded-[8px] border-[1px] border-gray-200 mt-[8px] focus:outline-none focus:border-orange-300 focus:border-[1px] w-full md:w-[400px]"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex justify-center mt-[30px]">
          <textarea
            className="py-[10px] px-[14px] rounded-[8px] border-[1px] border-gray-200 mt-[8px] focus:outline-none focus:border-orange-300 focus:border-[1px] w-full md:w-[400px]"
            placeholder="Your enquiry..."
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        {errorMessage && (
          <p className="text-red-600 text-center my-2">{errorMessage}</p>
        )}
        {successMessage && (
          <p className="text-green-600 text-center my-2">{successMessage}</p>
        )}
        <div className="flex justify-center">
          <button
            className={` text-[10px] text-white bg-primary hover:bg-orange-600 px-[14px] py-[12px] rounded-full font-[500] md:mt-[30px] mt-[30px] md:w-[400px] w-full ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleDeleteRequest}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send request"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccount;
