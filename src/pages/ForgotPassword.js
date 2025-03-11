import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { BaseUrl } from "../constants/theme";
import Button from "../components/Button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BackBtn from "../components/BackBtn";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Provide a valid email address")
    .required("Required"),
});

const ForgotPassword = () => {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const handleForgotPassword = async (values) => {
    setLoader(true);
    try {
      const response = await axios.post(`${BaseUrl}/forgot-password`, values);
      if (response.status === 200) {
        toast.success(response.data.message, { position: "top-center" });
        navigate("/reset-password", { state: { email: values.email } });
      }
    } catch (error) {
      if (error.response) {
        toast.error(
          error?.response?.data?.message ||
            "Something went wrong. Please try again.",
          { position: "top-center" }
        );
      } else if (error.request) {
        toast.error(
          "No response received from the server. Please try again later.",
          { position: "top-center" }
        );
      } else {
        toast.error(error.message, { position: "top-center" });
      }
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <div className="max-w-lg w-full bg-gray-100 p-[18px] rounded-lg shadow-md">
        <BackBtn onClick={() => navigate(-1)} />

        <h2 className="text-xl font-bold text-center mb-6">Forgot Password</h2>
        <Formik
          initialValues={{ email: "" }}
          validationSchema={validationSchema}
          onSubmit={handleForgotPassword}
        >
          {({
            handleChange,
            handleSubmit,
            values,
            errors,
            isValid,
            touched,
          }) => (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-[500] text-end text-[12px] md:text-[14px]">
                  Email
                </label>
                <div className="flex items-center border border-gray-300 rounded-[12px] p-[12px] focus-within:ring-1 focus-within:ring-primary mt-[5px] bg-gray-100">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    onChange={handleChange("email")}
                    value={values.email}
                    className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500 "
                  />
                </div>
                {touched.email && errors.email && (
                  <p className="text-red-400 text-[12px] md:text-[14px] mt-1">
                    {errors.email}
                  </p>
                )}
              </div>
              <Button
                title="SEND OTP"
                isLoading={loader}
                onClick={isValid ? handleSubmit : null}
                isValid={isValid}
              />
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ForgotPassword;
