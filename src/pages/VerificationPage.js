import React, { useEffect, useState } from "react";
import { BaseUrl } from "../constants/theme";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import OtpInput from "react-otp-input";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaSpinner } from "react-icons/fa";

const VerificationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {};

  console.log("emails: ", email);

  const [code, setCode] = useState("");
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getEmail();
  }, []);

  const getEmail = async () => {
    // const data = await AsyncStorage.getItem("email");
    setData(email);
  };

  const verifyAccount = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${BaseUrl}/api/users/verify/${code}`, {
        email: email,
      });

      if (response.status === 200) {
        localStorage.setItem(
          "verification",
          JSON.stringify(response.data.verified)
        );
        toast.success(
          "Client account verified successfully, Please login to create a restaurant account.",
          {
            position: "top-center",
            autoClose: 15000,
          }
        );

        navigate("/");
      } else {
        toast.error(response.data.message, { position: "top-center" });
      }
    } catch (error) {
      let errorMessage = "Oops, something went wrong";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      toast.error(errorMessage, { position: "top-center" });
    }
    setLoading(false);
  };

  const resendOtp = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${BaseUrl}/api/users/resend-otp`, {
        email,
      });
      toast.success(response.data.message, { position: "top-center" });
    } catch (error) {
      let errorMessage = "Oops, something went wrong";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      toast.error(errorMessage, { position: "top-center" });
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100dvh)] overflow-y-auto bg-white px-4">
      <div className="w-full max-w-lg py-[30px]">
        <h2 className=" text-[22px] font-[600] text-primary mb-2 text-center">
          Verify Your Account
        </h2>
        <p className=" text-[10px] md:text-[12px] text-gray-600 text-center mb-5">
          Verification email has been sent to {email}. If the email is
          incorrect, please delete this account and create a new one with the
          correct email.
        </p>
        <div className="mb-5">
          <OtpInput
            value={code}
            onChange={setCode}
            numInputs={6}
            isInputNum={true}
            containerStyle="flex justify-center gap-3 "
            inputStyle="!w-[40px] !h-[60px] ! text-[12px] !font-[500] !border-2 !border-primary !rounded-lg !text-center !outline-none focus:ring-[1px] focus:ring-primary focus:border-transparent  !transition-all !duration-200 !shadow-sm"
            renderInput={(props) => (
              <input
                {...props}
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength="1"
              />
            )}
          />
        </div>
        <div className="flex flex-col items-center gap-3">
          <button
            className="w-full py-3 text-white font-bold rounded-lg flex justify-center items-center bg-primary hover:bg-orange-600 mt-[20px]"
            onClick={verifyAccount}
            disabled={loading}
          >
            {loading ? (
              <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Confirm Code"
            )}
          </button>

          <button
            className="mt-3 text-primary underline cursor-pointer disabled:opacity-50"
            onClick={resendOtp}
            disabled={loading}
          >
            Resend OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerificationPage;
