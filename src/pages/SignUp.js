import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { BaseUrl } from "../constants/theme";
import axios from "axios";
import Button from "../components/Button";
import Logo from "../components/SprinLogo";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

const emojiRegex =
  /^[^\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2300}-\u{23FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]+$/u;

const trustedEmailDomains = [
  "gmail.com",
  "yahoo.com",
  "outlook.com",
  "hotmail.com",
  "icloud.com",
];

const emailRegex = new RegExp(
  `^[^@\\s]+@(${trustedEmailDomains.join("|").replace(/\./g, "\\.")})$`
);

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "First name must be at least 2 characters")
    .matches(emojiRegex, "Emojis are not allowed")
    .required("First name is required"),
  lastName: Yup.string()
    .min(2, "Last name must be at least 2 characters")
    .matches(emojiRegex, "Emojis are not allowed")
    .required("Last name is required"),
  email: Yup.string()
    .email("Provide a valid email address")
    .matches(
      emailRegex,
      "Only Gmail, Yahoo, Outlook, Hotmail, and iCloud emails are allowed"
    )
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(emojiRegex, "Emojis are not allowed")
    .required("Password is required"),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(
      /^\+234\d{10}$/,
      "Phone number must be in the format +234 followed by 10 digits, e.g., +2348012345678"
    ),
});

const SignUp = () => {
  const navigate = useNavigate();

  const [loader, setLoader] = useState(false);
  const [isObsecure, setIsObsecure] = useState(true);

  const inValidForm = () => {
    toast.warning("Please provide all required fields", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const registerUser = async (values) => {
    setLoader(true);

    try {
      const endpoint = `${BaseUrl}/register`;
      const data = values;

      const response = await axios.post(endpoint, data);

      if (response.status === 201) {
        toast.success(response.data.message, { position: "top-center" });
        navigate("/verification-page", { state: { email: values.email } });
      } else {
        toast.error(response.data.message, { position: "top-center" });
      }
    } catch (error) {
      console.log(error);
      let errorMessage = "Oops, something went wrong";

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        } else {
          errorMessage = `Error: ${error.response.status}`;
        }
      } else if (error.request) {
        // The request was made but no response was received
        errorMessage = "No response received from server";
      } else {
        // Something happened in setting up the request that triggered an Error
        errorMessage = error.message;
      }

      toast.error(errorMessage, { position: "top-center" });
    } finally {
      setLoader(false);
    }
  };

  const removeEmojis = (text) =>
    text.replace(
      /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2300}-\u{23FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu,
      ""
    );

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100dvh)] overflow-y-auto bg-white px-4">
      <div className="w-full max-w-lg py-[40px]">
        <div className="flex justify-center my-[20px]">
          <Logo />
        </div>

        <Formik
          initialValues={{
            email: "",
            password: "",
            // username: "",
            firstName: "",
            lastName: "",
            phone: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => registerUser(values)}
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
            <Form className="w-full max-w-md mx-auto bg-white p-3 sm:p-6 rounded-lg shadow-md space-y-4">
              {[
                {
                  name: "firstName",
                  type: "text",
                  placeholder: "First Name",
                  icon: <FaUser className="text-gray-500 mr-2" />,
                  customChange: (text) =>
                    handleChange("firstName")(removeEmojis(text)),
                },
                {
                  name: "lastName",
                  type: "text",
                  placeholder: "Last Name",
                  icon: <FaUser className="text-gray-500 mr-2" />,
                  customChange: (text) =>
                    handleChange("lastName")(removeEmojis(text)),
                },
                {
                  name: "email",
                  type: "email",
                  placeholder: "Email",
                  icon: <FaEnvelope className="text-gray-500 mr-2" />,
                  customChange: (text) =>
                    handleChange("email")(removeEmojis(text)),
                },
                {
                  name: "phone",
                  type: "tel",
                  placeholder: "Phone Number",
                  icon: <FaPhone className="text-gray-500 mr-2" />,
                  customChange: (text) => {
                    const formattedText = text
                      .replace(/[^\+\d]/g, "")
                      .slice(0, 14); // Only digits and "+" max length 14
                    handleChange("phone")(formattedText);
                  },
                },
              ].map(({ name, placeholder, type, icon, customChange }) => (
                <div key={name}>
                  <label className="block text-gray-700 font-[500] text-end  text-[10px] md:text-[12px]">
                    {placeholder}
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-[12px] p-[12px] focus-within:ring-1 focus-within:ring-primary mt-[5px] bg-gray-100">
                    <span>{icon}</span>
                    <input
                      type={type}
                      name={name}
                      placeholder={placeholder}
                      className="w-full outline-none  bg-gray-100 placeholder:text-[10px]   text-[10px] md:text-[12px] "
                      onFocus={() => setFieldTouched(name, true)}
                      onBlur={handleBlur}
                      onChange={(e) =>
                        customChange
                          ? customChange(e.target.value)
                          : handleChange(name)(e)
                      }
                      value={values[name]}
                      autoComplete="off"
                    />
                  </div>
                  {touched[name] && errors[name] && (
                    <p className="text-red-400  text-[10px] md:text-[12px] mt-1">
                      {errors[name]}
                    </p>
                  )}
                </div>
              ))}

              <div className="pb-[20px]">
                <label className="block text-gray-700 font-[500] text-end  text-[10px] md:text-[12px]">
                  Password
                </label>
                <div className="flex items-center border border-gray-300 rounded-[12px] p-[12px] focus-within:ring-1 focus-within:ring-primary mt-[5px] bg-gray-100">
                  <FaLock className="text-gray-500 mr-2" />
                  <input
                    type={isObsecure ? "password" : "text"}
                    name="password"
                    placeholder="Password"
                    className="w-full outline-none  bg-gray-100 placeholder:text-[10px]   text-[10px] md:text-[12px] "
                    onFocus={() => setFieldTouched("password", true)}
                    onBlur={handleBlur}
                    value={values.password}
                    onChange={(event) =>
                      handleChange("password")(removeEmojis(event.target.value))
                    }
                    autoComplete="off"
                  />
                  <button
                    type="button"
                    onClick={() => setIsObsecure(!isObsecure)}
                    className="text-gray-500 focus:outline-none"
                  >
                    {isObsecure ? (
                      <FaEyeSlash size={20} />
                    ) : (
                      <FaEye size={20} />
                    )}
                  </button>
                </div>
                {touched.password && errors.password && (
                  <p className="text-red-400  text-[10px] md:text-[12px] mt-1">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                title="S I G N U P"
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

export default SignUp;
