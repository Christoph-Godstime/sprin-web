import React, { useState } from "react";
import { BaseUrl } from "../constants/theme";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import Header from "../components/Header";
import Button from "../components/Button";

const validationSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .min(8, "Current password must be at least 8 character")
    .required("Required"),
  newPassword: Yup.string()
    .min(8, "New password must be at least 8 character")
    .required("Required"),
});

const ChangePassword = () => {
  const [loader, setLoader] = useState(false);
  const [obsecureText, setObsecureText] = useState(true);

  const inValidForm = () => {
    toast.warning("Please provide all required fields", {
      position: "top-center",
      autoClose: 3000,
    });
  };

  const changePassword = async (values) => {
    const token = localStorage.getItem("token");
    const accessToken = JSON.parse(token);
    setLoader(true);

    try {
      const response = await axios.post(`${BaseUrl}/change-password`, values, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.status === 200) {
        toast.success("Password has been changed successfully", {
          position: "top-center",
          autoClose: 3000,
        });
      }
      setLoader(false);
    } catch (error) {
      setLoader(false);
      if (error.response) {
        toast.error(
          error?.response?.data?.message ||
            "Something went wrong. Please try again.",
          {
            position: "top-center",
            autoClose: 3000,
          }
        );
      } else if (error.request) {
        toast.error(
          "No response received from the server. Please try again later.",
          {
            position: "top-center",
            autoClose: 3000,
          }
        );
      } else {
        toast.error(error.message, {
          position: "top-center",
          autoClose: 3000,
        });
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white items-center pb-[50px]">
      <Header text="Change Password" />
      <div className="w-full max-w-2xl pt-[20px] px-[12px]">
        <Formik
          initialValues={{ currentPassword: "", newPassword: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => changePassword(values)}
        >
          {({
            handleChange,
            handleBlur,
            touched,
            handleSubmit,
            values,
            errors,
            isValid,
            setFieldTouched,
          }) => (
            <Form className="space-y-[30px]">
              {/* Email Input */}
              <div>
                <label className="block text-gray-700 font-[500] text-end text-[12px] md:text-[14px]">
                  Current Password
                </label>
                <div className="flex items-center border border-gray-300 rounded-[12px] p-[12px] focus-within:ring-1 focus-within:ring-primary mt-[5px] bg-gray-100">
                  <FaLock className="text-gray-500 mr-2" />
                  <input
                    type="text"
                    name="currentPassword"
                    placeholder="Enter current password"
                    className="w-full outline-none  bg-gray-100 placeholder:text-[12px]  text-[12px] md:text-[14px] "
                    onFocus={() => setFieldTouched("currentPassword")}
                    onBlur={() => setFieldTouched("currentPassword", "")}
                    value={values.currentPassword}
                    onChange={handleChange("currentPassword")}
                    autoComplete="off"
                  />
                </div>
                {touched.currentPassword && errors.currentPassword && (
                  <p className="text-red-400 text-[12px] md:text-[14px] mt-1">
                    {errors.currentPassword}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-[500] text-end text-[12px] md:text-[14px]">
                  New Password
                </label>
                <div className="flex items-center border border-gray-300 rounded-[12px] p-[12px] focus-within:ring-1 focus-within:ring-primary mt-[5px] bg-gray-100">
                  <FaLock className="text-gray-500 mr-2" />
                  <input
                    type={obsecureText ? "password" : "text"}
                    name="newPassword"
                    placeholder="Enter new password"
                    className="w-full outline-none  bg-gray-100 placeholder:text-[12px]  text-[12px] md:text-[14px] "
                    onFocus={() => setFieldTouched("newPassword")}
                    onBlur={() => setFieldTouched("newPassword", "")}
                    value={values.newPassword}
                    onChange={handleChange("newPassword")}
                    autoComplete="off"
                  />
                  <button
                    type="button"
                    onClick={() => setObsecureText(!obsecureText)}
                    className="text-gray-500 focus:outline-none"
                  >
                    {obsecureText ? (
                      <FaEyeSlash size={20} />
                    ) : (
                      <FaEye size={20} />
                    )}
                  </button>
                </div>
                {touched.newPassword && errors.newPassword && (
                  <p className="text-red-400 text-[12px] md:text-[14px] mt-1">
                    {errors.newPassword}
                  </p>
                )}
              </div>

              <Button
                title="Change Password"
                isLoading={loader}
                onClick={isValid ? handleSubmit : inValidForm}
                isValid={isValid}
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ChangePassword;
