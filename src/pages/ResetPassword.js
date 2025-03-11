import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { BaseUrl } from "../constants/theme";
import BackBtn from "../components/BackBtn";
import axios from "axios";
import OtpInput from "react-otp-input";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import Button from "../components/Button";

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {};

  const [loader, setLoader] = useState(false);
  const [code, setCode] = useState("");
  const [obsecureText1, setObsecureText1] = useState(true);
  const [obsecureText2, setObsecureText2] = useState(true);

  const handleResetPassword = async (values) => {
    setLoader(true);
    try {
      const response = await axios.post(`${BaseUrl}/reset-password`, {
        ...values,
        email,
        otp: code,
      });

      if (response.status === 200) {
        toast.success(response.data.message, { position: "top-center" });
        navigate("/login");
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

        <h2 className="text-xl font-bold text-center mb-6">Reset Password</h2>
        <Formik
          initialValues={{ password: "", confirmPassword: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => handleResetPassword(values)}
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
              <div>
                <label className="block text-gray-700 font-[500] text-end  text-[10px] md: text-[12px]">
                  New Password
                </label>
                <div className="flex items-center border border-gray-300 rounded-[12px] p-[12px] focus-within:ring-1 focus-within:ring-primary mt-[5px] bg-white">
                  <FaLock className="text-gray-500 mr-2" />
                  <input
                    type={obsecureText1 ? "password" : "text"}
                    name="password"
                    placeholder="Enter new password"
                    className="w-full outline-none  bg-white placeholder: text-[10px]   text-[10px] md: text-[12px] "
                    onFocus={() => setFieldTouched("password")}
                    onBlur={() => setFieldTouched("password", "")}
                    value={values.password}
                    onChange={handleChange("password")}
                    autoComplete="off"
                  />
                  <button
                    type="button"
                    onClick={() => setObsecureText1(!obsecureText1)}
                    className="text-gray-500 focus:outline-none"
                  >
                    {obsecureText1 ? (
                      <FaEyeSlash size={20} />
                    ) : (
                      <FaEye size={20} />
                    )}
                  </button>
                </div>
                {touched.password && errors.password && (
                  <p className="text-red-400  text-[10px] md: text-[12px] mt-1">
                    {errors.password}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-[500] text-end  text-[10px] md: text-[12px]">
                  Confirm Password
                </label>
                <div className="flex items-center border border-gray-300 rounded-[12px] p-[12px] focus-within:ring-1 focus-within:ring-primary mt-[5px] bg-white">
                  <FaLock className="text-gray-500 mr-2" />
                  <input
                    type={obsecureText2 ? "password" : "text"}
                    name="confirmPassword"
                    placeholder="Confirm new password"
                    className="w-full outline-none  bg-white placeholder: text-[10px]   text-[10px] md: text-[12px] "
                    onFocus={() => setFieldTouched("confirmPassword")}
                    onBlur={() => setFieldTouched("confirmPassword", "")}
                    value={values.confirmPassword}
                    onChange={handleChange("confirmPassword")}
                    autoComplete="off"
                  />
                  <button
                    type="button"
                    onClick={() => setObsecureText2(!obsecureText2)}
                    className="text-gray-500 focus:outline-none"
                  >
                    {obsecureText2 ? (
                      <FaEyeSlash size={20} />
                    ) : (
                      <FaEye size={20} />
                    )}
                  </button>
                </div>
                {touched.confirmPassword && errors.confirmPassword && (
                  <p className="text-red-400  text-[10px] md: text-[12px] mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

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

              <Button
                title="RESET PASSWORD"
                isLoading={loader}
                onClick={isValid ? handleSubmit : null}
                isValid={isValid}
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ResetPassword;
