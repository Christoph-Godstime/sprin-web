import React, { useEffect, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { AuthContext } from "../App";
import { BaseUrl } from "../constants/theme";
import { toast } from "react-toastify";
import Button from "../components/Button";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import Logo from "../components/SprinLogo";
import Lottie from "lottie-react";
import deliveryAnimation from "../assets/anime/delivery.json";
import { UserReversedGeoCode } from "../context/UserReversedGeoCode";
import { CheckLoadRestaurantData } from "../context/CheckRestaurantData";
import { CheckUserAddressType } from "../context/CheckUserAddressType";
import { UserProfileContext } from "../context/UserProfileContext";
import { DefaultAddressContext } from "../context/DefaultAddressContext";
import { GroceryStoreCategoryContext } from "../context/GroceryStoreCategory";
import { NearByRestaurantsContext } from "../context/NearByRestaurants";
import { TrySomethingNewContext } from "../context/TrySomethingNewContext";
import { FastestNearYouContext } from "../context/FastestNearYou";
import { LoginContext } from "../context/LoginContext";

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  email: Yup.string()
    .email("Provide a valid email address")
    .required("Email is required"),
});

const Login = () => {
  const navigate = useNavigate();

  const { signIn } = useContext(AuthContext);
  const [loader, setLoader] = useState(false);
  const [setLocation] = useState(null);
  const { updateLoginStatus } = useContext(LoginContext);
  const { setAddress } = useContext(UserReversedGeoCode);
  const { setLoadRestaurantData } = useContext(CheckLoadRestaurantData);
  const { checkUserAddressType, setCheckUserAddressType } =
    useContext(CheckUserAddressType);
  const { profileDetails, isLoading, error, refetch, updateProfileDetails } =
    useContext(UserProfileContext);
  const { refetchDefaultAddress } = useContext(DefaultAddressContext);
  const { refetchGroceryStoreCategory } = useContext(
    GroceryStoreCategoryContext
  );
  const { refetchNearByRestaurants } = useContext(NearByRestaurantsContext);
  const { refetchTrySomethingNew } = useContext(TrySomethingNewContext);
  const { refetchFastestNearYou } = useContext(FastestNearYouContext);

  const [isObsecure, setIsObsecure] = useState(true);
  //   const [isLoading, setIsLoading] = useState(false);

  const inValidForm = () => {
    toast.warning("Please provide all required fields", {
      position: "top-center",
    });
  };

  const getDefault = async () => {
    const token = localStorage.getItem("token");
    const accessToken = JSON.parse(token);

    try {
      const response = await axios.get(`${BaseUrl}/api/address/default`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 200) {
        if (!response.data) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              setLocation({ latitude, longitude });

              localStorage.setItem("latitude", JSON.stringify(latitude));
              localStorage.setItem("longitude", JSON.stringify(longitude));

              const reverseGeocodedAddress = await axios.get(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
              );

              const { road, house_number, city, state, postcode, country } =
                reverseGeocodedAddress.data.address;
              setAddress(
                `${house_number || ""} ${road || ""}, ${city || ""}, ${
                  postcode || ""
                }, ${state || ""}, ${country || ""}`
              );
            },
            (error) => {
              console.error("Location access denied", error);
            }
          );
        } else {
          setAddress(response.data);

          localStorage.setItem(
            "latitude",
            JSON.stringify(response.data.latitude)
          );
          localStorage.setItem(
            "longitude",
            JSON.stringify(response.data.longitude)
          );
        }

        setLoadRestaurantData(true);
        setCheckUserAddressType(true);
      } else {
        console.error(
          "Could not get user address from LoginPage",
          response.status
        );
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const loginFunc = async (values) => {
    setLoader(true);

    try {
      localStorage.clear();

      updateLoginStatus(false);

      setLoadRestaurantData(false);

      const endpoint = `${BaseUrl}/login`;
      const response = await axios.post(endpoint, values);

      if (response.status === 200) {
        const data = response.data;
        setLoader(false);
        updateLoginStatus(true);
        localStorage.setItem("id", JSON.stringify(data._id));
        localStorage.setItem("token", JSON.stringify(data.userToken));
        localStorage.setItem("verification", JSON.stringify(data.verified));
        localStorage.setItem("email", JSON.stringify(data.email));
        localStorage.setItem("user", JSON.stringify(data));

        if (!data.verified) {
          navigate("/verification-page", { state: { email: data.email } });
          toast.info("Please verify your account", {
            position: "top-center",
            autoClose: 3000,
          });
        } else {
          toast.success("Successfully logged in", {
            position: "top-center",
            autoClose: 3000,
          });
          refetch();
          await signIn(data);
          await getDefault();
          await refetchDefaultAddress();
          await refetchGroceryStoreCategory();
          await refetchNearByRestaurants();
          await refetchTrySomethingNew();
          await refetchFastestNearYou();

          navigate("/profile");
        }
      } else {
        updateLoginStatus(false);
        toast.error("Error Logging in. Please provide valid credentials", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      updateLoginStatus(false);
      let errorMessage = "Oops, something went wrong";
      if (error.response) {
        errorMessage = error.response.data.message || "Internal Server Error";
      } else if (error.message) {
        errorMessage = error.message;
      }
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 3000,
      });
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
      <div className="w-full max-w-lg py-[30px]">
        <div className="flex justify-center mb-6">
          <Lottie
            animationData={deliveryAnimation}
            autoPlay
            style={{ width: "100%", height: "30vh" }}
          />
        </div>

        <div className="flex justify-center my-[40px]">
          <Logo />
        </div>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => loginFunc(values)}
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
                <label className="block text-gray-700 font-[500] text-end  text-[10px] md:text-[12px]">
                  Email
                </label>
                <div className="flex items-center border border-gray-300 rounded-[12px] p-[12px] focus-within:ring-1 focus-within:ring-primary mt-[5px] bg-gray-100">
                  <FaEnvelope className="text-gray-500 mr-2" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    className="w-full outline-none  bg-gray-100 placeholder:text-[10px]   text-[10px] md:text-[12px] "
                    onFocus={() => setFieldTouched("email", true)}
                    onBlur={handleBlur}
                    value={values.email}
                    onChange={(e) =>
                      handleChange("email")(removeEmojis(e.target.value))
                    }
                    autoComplete="off"
                  />
                </div>
                {touched.email && errors.email && (
                  <p className="text-red-400  text-[10px] md:text-[12px] mt-1">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
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
                    onChange={handleChange("password")}
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

              <Button
                title="L O G I N"
                isLoading={loader}
                onClick={isValid ? handleSubmit : inValidForm}
                isValid={isValid}
              />

              <div className="flex justify-between  text-[10px] md:text-[12px] text-gray-600 mt-4">
                <Link
                  to="/signup"
                  className="text-primary font-medium hover:underline"
                >
                  Register
                </Link>
                <Link to="/forgot-password" className="hover:underline">
                  Forgot Password?
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
