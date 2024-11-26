import React, { useEffect, useState } from "react";
import { NavLink, Link, useHistory } from "react-router-dom";
import Logo from "./Logo";
import logo from "../assets/logo1.png";
import { FaLocationDot } from "react-icons/fa6";
import { FiMenu } from "react-icons/fi";
import { MdOutlineClose } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import validate from "../utils/validate";
import Select from "react-select";

const Header = ({ show, setShow }) => {
  const riderInitialState = {
    riderFirstName: "",
    riderLastName: "",
    riderPhoneNumber: "",
    riderEmail: "",
    riderNextOfKinName: "",
    riderNextOfKinPhoneNumber: "",
    riderDriverLicense: "",
    riderVehicleType: "",
    riderPlateNumber: "",
    riderGuarantorName: "",
    riderGuarantorPhoneNumber: "",
    riderGuarantorRelationship: "",
    riderBankName: "",
    riderAccountNumber: "",
    riderPassword: "",
    riderConfirmPassword: "",
    riderAccountName: "",
  };

  const vendorInitialState = {
    vendorFirstName: "",
    vendorLastName: "",
    vendorPhoneNumber: "",
    vendorEmail: "",
    vendorPassword: "",
    vendorConfirmPassword: "",
    restaurantName: "",
    officialEmail: "",
    officialPhoneNumber: "",
    restaurantAddress: "",
  };

  const [fix, setFix] = useState(false);
  const [signup, setSignup] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [customerModal, setCustomerModal] = useState(false);
  const [riderModal, setRiderModal] = useState(false);
  const [vendorModal, setVendorModal] = useState(false);
  const [typePass, setTypePass] = useState(false);
  const [typePass1, setTypePass1] = useState(false);
  const [typePass2, setTypePass2] = useState(false);
  const [typePass3, setTypePass3] = useState(false);
  const [typePass4, setTypePass4] = useState(false);
  const [typePass5, setTypePass5] = useState(false);
  const [typePass6, setTypePass6] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [valid, setValid] = useState(true);
  const [riderPage, setRiderPage] = useState(0);
  const [riderFormData, setRiderFormData] = useState(riderInitialState);
  const [riderErrors, setRiderErrors] = useState({});
  const [vendorPage, setVendorPage] = useState(0);
  const [vendorFormData, setVendorFormData] = useState(vendorInitialState);
  const [vendorErrors, setVendorErrors] = useState({});

  const riderFormTiles = [
    "Personal Details",
    "Verification Details",
    "Bank Details",
  ];

  //  rider functions

  const handleRiderSubmit = () => {
    const riderValidationErrors = validate(riderFormData);
    setRiderErrors(riderValidationErrors);

    const riderCurrentSectionErrors = Object.keys(riderValidationErrors).filter(
      (key) => {
        const inspectRiderSection = getRiderInputSection(key);
        return inspectRiderSection === riderPage;
      }
    );

    if (riderCurrentSectionErrors.length === 0) {
      alert("FORM SUBMITTED");
    }
    console.log(riderFormData);
  };

  const handleRiderNext = () => {
    const riderValidationErrors = validate(riderFormData);
    setRiderErrors(riderValidationErrors);

    const riderCurrentSectionErrors = Object.keys(riderValidationErrors).filter(
      (key) => {
        const inspectRiderSection = getRiderInputSection(key);
        return inspectRiderSection === riderPage;
      }
    );

    if (riderCurrentSectionErrors.length === 0) {
      setRiderPage((riderPrevPage) => {
        const riderNextPage = riderPrevPage + 1;
        if (riderNextPage < riderFormTiles.length) {
          clearRiderErrors();
        }
        return riderNextPage;
      });
    }
  };

  const clearRiderErrors = () => {
    setRiderErrors({});
  };

  const getRiderInputSection = (riderInputName) => {
    switch (riderInputName) {
      case "riderFirstName":
      case "riderLastName":
      case "riderPhoneNumber":
      case "riderEmail":
      case "riderNextOfKinName":
      case "nextOfKinPhoneNumber":
        return 0;
      case "riderDriverLicense":
      case "riderVehicleType":
      case "riderPlateNumber":
      case "riderGuarantorName":
      case "riderGuarantorPhoneNumber":
      case "riderGuarantorRelationship":
      case "riderPassword":
      case "riderConfirmPassword":
        return 1;
      case "riderBankName":
      case "riderAccountNumber":
      case "riderAccountName":
        return 2;
      default:
        return -1;
    }
  };

  const handleRiderChange = (value, name) => {
    setRiderFormData({
      ...riderFormData,
      [name]: value,
    });
  };

  // vendor functions
  const vendorFormTiles = ["Personal Details", "Restaurant Details"];

  const handleVendorSubmit = () => {
    const vendorValidationErrors = validate(vendorFormData);
    setVendorErrors(vendorValidationErrors);

    const vendorCurrentSectionErrors = Object.keys(
      vendorValidationErrors
    ).filter((key) => {
      const inspectVendorSection = getVendorInputSection(key);
      return inspectVendorSection === riderPage;
    });

    if (vendorCurrentSectionErrors.length === 0) {
      alert("FORM SUBMITTED");
    }
  };

  const handleVendorNext = () => {
    const vendorValidationErrors = validate(vendorFormData);
    setVendorErrors(vendorValidationErrors);

    const vendorCurrentSectionErrors = Object.keys(
      vendorValidationErrors
    ).filter((key) => {
      const inspectVendorSection = getVendorInputSection(key);
      return inspectVendorSection === riderPage;
    });

    if (vendorCurrentSectionErrors.length === 0) {
      setVendorPage((vendorPrevPage) => {
        const vendorNextPage = vendorPrevPage + 1;
        if (vendorNextPage < vendorFormTiles.length) {
          clearVendorErrors();
        }
        return vendorNextPage;
      });
    }
  };

  const clearVendorErrors = () => {
    setVendorErrors({});
  };

  const getVendorInputSection = (vendorInputName) => {
    switch (vendorInputName) {
      case "vendorFirstName":
      case "vendorLastName":
      case "vendorPhoneNumber":
      case "vendorEmail":
      case "vendorPassword":
      case "vendorConfirmPassword":
        return 0;
      case "restaurantName":
      case "officialEmail":
      case "officialPhoneNumber":
      case "restaurantAddress":
        return 1;
      default:
        return -1;
    }
  };

  const handleVendorChange = (value, name) => {
    setVendorFormData({
      ...vendorFormData,
      [name]: value,
    });
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      fontSize: "12px",
      padding: "3px",
      height: "39.6px",
      backgroundColor: "white",
      borderColor: "#d1d5db",
      borderColor: state.isFocused ? "none" : "#d1d5db",
      borderRadius: "8px",
      "&:hover": {
        borderColor: "none",
      },
      outline: "none",
      boxShadow: state.isFocused ? "0 0 0 1px #fdba74" : "none",
    }),
    menu: (provided) => ({
      ...provided,
      fontSize: "12px",
      marginTop: "10px",
      boxShadow: "0px 10px 15px gray",
      borderRadius: "8px",
    }),
    option: (provided, state) => ({
      ...provided,

      backgroundColor: state.isSelected ? "#f97316" : "white",
      color: state.isSelected ? "white" : "black",
      fontSize: "12px",
      borderRadius: "20px",
      "&:hover": {
        backgroundColor: "#fff7ed",
        color: "black",
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "black",
    }),
  };

  const vehicleTypeOptions = [
    { value: "bicycle", label: "Bicycle" },
    { value: "motorbike", label: "Motorbike" },
    { value: "car", label: "Car" },
  ];

  const riderGuarantorRelationshipOptions = [
    { value: "brother", label: "Brother" },
    { value: "sister", label: "Sister" },
    { value: "cousin", label: "Cousin" },
    { value: "father", label: "Father" },
    { value: "mother", label: "Mother" },
    { value: "friend", label: "Friend" },
    { value: "aunty", label: "Aunty" },
    { value: "uncle", label: "Uncle" },
    { value: "colleague", label: "Colleague" },
    { value: "supervisor", label: "Supervisor" },
  ];

  const handleChange = (value) => {
    setPhoneNumber(value);
    setValid(validatePhoneNumber(value));
  };

  const validatePhoneNumber = (phoneNumber) => {
    // console.log(phoneNumber);
    const phoneNumberPattern = /^\d{13}$/;
    return phoneNumberPattern.test(phoneNumber);
  };

  function setFixed() {
    if (window.scrollY >= 300) {
      setFix(true);
    } else {
      setFix(false);
    }
  }

  window.addEventListener("scroll", setFixed);

  useEffect(() => {
    setShow(show);
    setLoginModal(loginModal);
    setCustomerModal(customerModal);
    setRiderModal(riderModal);
    setVendorModal(vendorModal);
    setSignup(signup);
    if (
      show ||
      loginModal ||
      customerModal ||
      riderModal ||
      vendorModal ||
      signup
    ) {
      document.body.classList.add("overflow-y-hidden");
    } else {
      document.body.classList.remove("overflow-y-hidden");
    }
  }, [show, loginModal, customerModal, riderModal, vendorModal, signup]);

  return (
    <div>
      <div
        className={
          fix
            ? "fixed w-full 2xl:mt-[200px] lg:mt-[100px]  z-40 mt-[70px] bg-orange-100 shadow-xl ease-in-out duration-500"
            : "sticky z-40 "
        }
      >
        <div className="px-[3%] lg:px-[5%] xl:px-[15%] ">
          <div className="flex justify-between items-center h-[70px]">
            <div className="flex items-center gap-[30px]">
              <FiMenu
                onClick={() => setShow(!show)}
                className="text-[25px] cursor-pointer lg:hidden"
              />
              <div className="cursor-pointer">
                <div className={fix ? "flex" : "hidden"}>
                  <Link to="/">
                    <img className="w-[15px]" src={logo} />
                  </Link>
                </div>
                <div className={fix ? "hidden" : "flex"}>
                  <Link to="/">
                    <Logo width="w-[15px]" text="text-[18px]" />
                  </Link>
                </div>
              </div>
            </div>
            <div
              className={
                fix
                  ? "flex relative justify-end  w-[60%] md:w-[400px]"
                  : "hidden"
              }
            >
              <input
                className="pr-[14px] pl-[40px] py-[12px] w-full focus:outline-none  focus:border-orange-300  focus:border-b-2 rounded-t-[6px] text-gray-900 text-[12px]"
                placeholder="Enter delivery address"
              />
              <FaLocationDot className="absolute top-1/2 left-[14px] transform  -translate-y-1/2" />
            </div>
            <div className="hidden lg:flex gap-[10px]">
              <button
                onClick={() => setLoginModal(!loginModal)}
                className="flex justify-center items-center w-[90px] bg-orange-500 text-white text-[12px] md:text-[16px] h-[40px] font-[500] rounded-[30px] hover:bg-orange-600"
              >
                Sign In
              </button>
              <button
                onClick={() => setSignup(!signup)}
                className="flex justify-center items-center w-[90px] bg-white text-black text-[12px] md:text-[16px] h-[40px] font-[500] rounded-[30px] hover:bg-gray-100"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* nav bar */}
      <div
        className={`fixed w-full h-full block lg:hidden ${
          show ? "translate-x-0 z-40" : "-translate-x-full z-40"
        } ease-in-out duration-500`}
        style={{
          minWidth: show ? "200px" : "",
          zIndex: show ? 50 : "",
          background: show ? "#0007" : "",
          color: show ? "white" : "",
          top: show ? 0 : 0,
        }}
      >
        <div
          className={`top-0 left-0 z-40 absolute overflow-y-auto lg:h-[calc(100vh+30rem)] bg-orange-100 w-3/4 h-screen pt-[18px] xl:hidden ${
            show ? "translate-x-0" : "-translate-x-full"
          } ease-in-out duration-500`}
        >
          <div className="px-[3%] lg:px-[5%] xl:px-[15%]">
            <div className="flex items-center gap-[30px]">
              <MdOutlineClose
                onClick={() => setShow(!show)}
                className="text-primary text-[30px] cursor-pointer w-[25px]"
              />
              <div className="cursor-pointer">
                <div className={fix ? "flex" : "hidden"}>
                  <Link to="/">
                    <img className="w-[15px]" src={logo} />
                  </Link>
                </div>
                <div className={fix ? "hidden" : "flex"}>
                  <Link to="/">
                    <Logo width="w-[15px]" text="text-[18px]" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="lg:hidden mt-[30px] grid grid-cols-1 gap-[20px]">
              <button
                onClick={() => {
                  setLoginModal(!loginModal);
                  setShow(!show);
                }}
                className="flex justify-center items-center w-[90px] bg-orange-500 text-white text-[12px] md:text-[16px] h-[40px] font-[500] rounded-[30px] hover:bg-orange-600"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setSignup(!signup);
                  setShow(!show);
                }}
                className="flex justify-center items-center w-[90px] bg-white text-gray-900 text-[12px] md:text-[16px] h-[40px] font-[500] rounded-[30px] hover:bg-gray-100"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Login modals */}
      <div
        className={`fixed w-full h-full block ${
          loginModal ? "translate-y-0 z-40" : "translate-y-full z-40"
        } ease-in-out duration-500`}
        style={{
          minWidth: loginModal ? "200px" : "",
          zIndex: loginModal ? 50 : "",
          background: loginModal ? "#0007" : "",
          color: loginModal ? "white" : "",
          top: loginModal ? 0 : 0,
        }}
      >
        <div
          className={`bottom-0 left-1/2 transform -translate-x-1/2 z-40 absolute overflow-y-hidden h-[90%]  bg-white sm:w-[500px] w-full rounded-t-[30px] pt-[18px]  ${
            loginModal ? "translate-y-0" : "translate-y-full"
          } ease-in-out duration-500`}
        >
          <div className=" ">
            <div className="flex items-center justify-end  px-[3%] md:px-[5%]">
              <MdOutlineClose
                onClick={() => setLoginModal(!loginModal)}
                className="text-black text-[30px] cursor-pointer"
              />
            </div>
            <div className="mt-[15px]">
              <div className="text-gray-900 text-[22px] font-[500] flex justify-center border-b-[1px] border-gray-300 pb-[10px]">
                Log In
              </div>
              <div className="px-[3%] md:px-[5%] h-[calc(40vh+100px)] overflow-y-auto">
                <form className=" mt-[60px]">
                  <div>
                    <div className="flex gap-[5px] items-center font-[500] mb-[5px]">
                      <h4 className="text-[12px] lg:text-[16px] text-gray-900 ">
                        Email
                      </h4>{" "}
                      <h4 className="text-[12px] text-primary">*</h4>
                    </div>
                    <input
                      type="email"
                      className="placeholder:text-[12px] placeholder:lg:text-[16px] px-[14px] py-[10px] border-[1px] border-gray-300 w-full rounded-[8px] focus:outline-none  focus:border-orange-300  focus:border-[1px] text-black text-[12px] lg:text-[16px]"
                      placeholder="example@abc.com"
                    />
                  </div>

                  <div className="mt-[15px]">
                    <div className="flex gap-[5px] items-center font-[500] mb-[5px]">
                      <h4 className="text-[12px] lg:text-[16px] text-gray-900 ">
                        Password
                      </h4>{" "}
                      <h4 className="text-[12px] text-primary">*</h4>
                    </div>
                    <div className="relative">
                      <input
                        type={typePass ? "text" : "password"}
                        className="placeholder:text-[12px] placeholder:lg:text-[16px] px-[14px] py-[10px] border-[1px] border-gray-300 w-full rounded-[8px] focus:outline-none  focus:border-orange-300  focus:border-[1px] text-black text-[12px] lg:text-[16px]"
                        placeholder="Enter password"
                      />
                      <small
                        className="cursor-pointer absolute top-1/2  transform  -translate-y-1/2 right-[20px] font-semibold text-primary"
                        onClick={() => setTypePass(!typePass)}
                      >
                        {typePass ? <FaEye /> : <FaEyeSlash />}
                      </small>
                    </div>
                  </div>

                  <button className="text-white font-[500] px-[16px] py-[12px] bg-primary w-full rounded-[8px] mt-[30px] hover:bg-orange-600 relative">
                    Login
                  </button>
                </form>

                <div className="mt-[25px]">
                  <span className="text-[12px] text-gray-800 mt-[25px]  ">
                    By signing in, you agree to the{" "}
                    <Link to="/terms" className="text-primary">
                      <span onClick={() => setLoginModal(!loginModal)}>
                        Terms of Service
                      </span>
                    </Link>
                    {" and "}
                    <Link to="/privacy-policy" className="text-primary">
                      <span onClick={() => setLoginModal(!loginModal)}>
                        Privacy Policy
                      </span>
                    </Link>
                    {" of SpingFare"}
                  </span>
                </div>
              </div>
            </div>
            <span className="absolute bottom-[0px] transform left-1/2 -translate-x-1/2  flex gap-[5px] text-gray-600 text-[12px] font-[400] px-[5%] whitespace-nowrap border-t-[1px] border-gray-300 py-[20px] w-full justify-center bg-white">
              {"Don't have an account? "}
              <span
                onClick={() => {
                  setLoginModal(!loginModal);
                  setSignup(!signup);
                }}
                className="text-primary font-[500] cursor-pointer"
              >
                Sign up
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* sign up buttons*/}
      <div
        className={`fixed w-full h-full block ${
          signup ? "translate-y-0 z-40" : "translate-y-full z-40"
        } ease-in-out duration-500`}
        style={{
          minWidth: signup ? "200px" : "",
          zIndex: signup ? 50 : "",
          background: signup ? "#0007" : "",
          color: signup ? "white" : "",
          top: signup ? 0 : 0,
        }}
      >
        <div
          className={`bottom-0 left-1/2 transform -translate-x-1/2 z-40 absolute overflow-y-auto  bg-white sm:w-[500px] w-full rounded-t-[30px] pt-[18px] h-[90%]  ${
            signup ? "translate-y-0" : "translate-y-full"
          } ease-in-out duration-500`}
        >
          <div className="">
            <div className="flex items-center justify-end gap-[30px] px-[3%] md:px-[5%] ">
              <MdOutlineClose
                onClick={() => setSignup(!signup)}
                className="text-black text-[30px] cursor-pointer"
              />
            </div>
            <div className="mt-[15px]">
              <div className="text-gray-900 text-[22px] font-[500] flex justify-center border-b-[1px] border-gray-300 pb-[10px]">
                Select User
              </div>
              <div className="px-[5%] h-[calc(40vh+100px)] overflow-y-auto mt-[30px]">
                <div className="grid grid-cols-1 gap-[30px]">
                  <button
                    onClick={() => {
                      setSignup(!signup);
                      setCustomerModal(!customerModal);
                    }}
                    className="px-[14px] py-[14px] rounded-[8px] bg-secondary font-[500] hover:bg-indigo-900"
                  >
                    Customer
                  </button>
                  <button
                    onClick={() => {
                      setSignup(!signup);
                      setRiderModal(!riderModal);
                    }}
                    className="px-[14px] py-[14px] rounded-[8px] bg-secondary font-[500] hover:bg-indigo-900"
                  >
                    Rider
                  </button>
                  <button
                    onClick={() => {
                      setSignup(!signup);
                      setVendorModal(!vendorModal);
                    }}
                    className="px-[14px] py-[14px] rounded-[8px] bg-secondary font-[500] hover:bg-indigo-900"
                  >
                    Vendor
                  </button>
                </div>
                <div className="mt-[25px]">
                  <span className="text-[12px] text-gray-800 mt-[25px]  ">
                    By signing up, you agree to the{" "}
                    <Link to="/terms" className="text-primary">
                      <span onClick={() => setLoginModal(!loginModal)}>
                        Terms of Service
                      </span>
                    </Link>
                    {" and "}
                    <Link to="/privacy-policy" className="text-primary">
                      <span onClick={() => setLoginModal(!loginModal)}>
                        Privacy Policy
                      </span>
                    </Link>
                    {" of Sprin"}
                  </span>
                </div>
              </div>
            </div>
            <span className="absolute bottom-[0px] transform left-1/2 -translate-x-1/2  flex gap-[5px] text-gray-600 text-[12px] font-[400] px-[5%] whitespace-nowrap border-t-[1px] border-gray-300 py-[20px] w-full justify-center bg-white">
              {"Already have an account? "}
              <span
                onClick={() => {
                  setSignup(!signup);
                  setLoginModal(!loginModal);
                }}
                className="text-primary font-[500] cursor-pointer"
              >
                Login
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* customer sign up*/}
      <div
        className={`fixed w-full h-full block ${
          customerModal ? "translate-y-0 z-40" : "translate-y-full z-40"
        } ease-in-out duration-500`}
        style={{
          minWidth: customerModal ? "200px" : "",
          zIndex: customerModal ? 50 : "",
          background: customerModal ? "#0007" : "",
          color: customerModal ? "white" : "",
          top: customerModal ? 0 : 0,
        }}
      >
        <div
          className={`bottom-0 left-1/2 transform -translate-x-1/2 z-40 absolute overflow-y-auto  bg-white sm:w-[500px] w-full rounded-t-[30px] pt-[18px] h-[90%] ${
            customerModal ? "translate-y-0" : "translate-y-full"
          } ease-in-out duration-500`}
        >
          <div className="">
            <div className="flex items-center justify-between gap-[30px] px-[3%] md:px-[5%]">
              <FaArrowLeftLong
                onClick={() => {
                  setCustomerModal(!customerModal);
                  setSignup(!signup);
                }}
                className="text-primary text-[30px] cursor-pointer w-[25px]"
              />
              <MdOutlineClose
                onClick={() => setCustomerModal(!customerModal)}
                className="text-black text-[30px] cursor-pointer"
              />
            </div>
            <div className="mt-[15px]">
              <div className="text-gray-900 text-[22px] font-[500] flex justify-center border-b-[1px] border-gray-300 pb-[10px]">
                Customer Sign Up
              </div>
              <div className="px-[3%] md:px-[5%] h-[calc(80vh-50px)] overflow-y-auto pb-[50px]">
                <form className=" mt-[30px]">
                  <div>
                    <div className="flex gap-[5px] items-center font-[500] mb-[5px]">
                      <h4 className="text-[12px] lg:text-[16px] text-gray-900 ">
                        First Name
                      </h4>{" "}
                      <h4 className="text-[12px] text-primary">*</h4>
                    </div>
                    <input
                      type="text"
                      className="placeholder:text-[12px] placeholder:lg:text-[16px] px-[14px] py-[10px] border-[1px] border-gray-300 w-full rounded-[8px] focus:outline-none  focus:border-orange-300  focus:border-[1px] text-black text-[12px] lg:text-[16px]"
                      placeholder="Enter first name"
                    />
                  </div>
                  <div className="mt-[15px]">
                    <div className="flex gap-[5px] items-center font-[500] mb-[5px]">
                      <h4 className="text-[12px] lg:text-[16px] text-gray-900 ">
                        Last Name
                      </h4>{" "}
                      <h4 className="text-[12px] text-primary">*</h4>
                    </div>
                    <input
                      type="text"
                      className="placeholder:text-[12px] placeholder:lg:text-[16px] px-[14px] py-[10px] border-[1px] border-gray-300 w-full rounded-[8px] focus:outline-none  focus:border-orange-300  focus:border-[1px] text-black text-[12px] lg:text-[16px]"
                      placeholder="Enter last name"
                    />
                  </div>
                  <div className="mt-[15px]">
                    <div className="flex gap-[5px] items-center font-[500] mb-[5px]">
                      <h4 className="text-[12px] lg:text-[16px] text-gray-900 ">
                        Email
                      </h4>{" "}
                      <h4 className="text-[12px] text-primary">*</h4>
                    </div>
                    <input
                      type="email"
                      className="placeholder:text-[12px] placeholder:lg:text-[16px] px-[14px] py-[10px] border-[1px] border-gray-300 w-full rounded-[8px] focus:outline-none  focus:border-orange-300  focus:border-[1px] text-black text-[12px] lg:text-[16px]"
                      placeholder="example@abc.com"
                    />
                  </div>

                  <div className="mt-[15px]">
                    <div className="flex gap-[5px] items-center font-[500] mb-[5px]">
                      <h4 className="text-[12px] lg:text-[16px] text-gray-900 ">
                        Phone Number
                      </h4>{" "}
                      <h4 className="text-[12px] text-primary">*</h4>
                    </div>
                    <PhoneInput
                      placeholder="08012345678"
                      inputStyle={{ borderColor: "transparent" }}
                      containerStyle={{}}
                      buttonStyle={{
                        borderColor: "transparent",
                        borderTopLeftRadius: "8px",
                        borderBottomLeftRadius: "8px",
                      }}
                      dropdownStyle={{ height: "full" }}
                      country={"ng"}
                      value={phoneNumber}
                      onChange={handleChange}
                      inputProps={{
                        required: true,
                      }}
                      className="placeholder:text-[12px] placeholder:lg:text-[16px] py-[10px] border-[1px] border-gray-300 w-full rounded-[8px] focus:outline-none  focus:border-orange-300  focus:border-[1px] text-black text-[12px] lg:text-[16px]"
                    />
                    {!valid && (
                      <p className="text-red-500">
                        Please enter a valid phone number!
                      </p>
                    )}
                  </div>

                  <div className="mt-[15px]">
                    <div className="flex gap-[5px] items-center font-[500] mb-[5px]">
                      <h4 className="text-[12px] lg:text-[16px] text-gray-900 ">
                        Create Password
                      </h4>{" "}
                      <h4 className="text-[12px] text-primary">*</h4>
                    </div>
                    <div className="relative">
                      <input
                        type={typePass1 ? "text" : "password"}
                        className="placeholder:text-[12px] placeholder:lg:text-[16px] px-[14px] py-[10px] border-[1px] border-gray-300 w-full rounded-[8px] focus:outline-none  focus:border-orange-300  focus:border-[1px] text-black text-[12px] lg:text-[16px]"
                        placeholder="8+ character, please"
                      />
                      <small
                        className="cursor-pointer absolute top-1/2  transform  -translate-y-1/2 right-[20px] font-semibold text-primary"
                        onClick={() => setTypePass1(!typePass1)}
                      >
                        {typePass1 ? <FaEye /> : <FaEyeSlash />}
                      </small>
                    </div>
                  </div>

                  <div className="mt-[15px]">
                    <div className="flex gap-[5px] items-center font-[500] mb-[5px]">
                      <h4 className="text-[12px] lg:text-[16px] text-gray-900 ">
                        Confirm Password
                      </h4>{" "}
                      <h4 className="text-[12px] text-primary">*</h4>
                    </div>
                    <div className="relative">
                      <input
                        type={typePass2 ? "text" : "password"}
                        className="placeholder:text-[12px] placeholder:lg:text-[16px] px-[14px] py-[10px] border-[1px] border-gray-300 w-full rounded-[8px] focus:outline-none  focus:border-orange-300  focus:border-[1px] text-black text-[12px] lg:text-[16px]"
                        placeholder="Re-enter password"
                      />
                      <small
                        className="cursor-pointer absolute top-1/2  transform  -translate-y-1/2 right-[20px] font-semibold text-primary"
                        onClick={() => setTypePass2(!typePass2)}
                      >
                        {typePass2 ? <FaEye /> : <FaEyeSlash />}
                      </small>
                    </div>
                  </div>

                  <button className="text-white font-[500] px-[16px] py-[12px] bg-primary w-full rounded-[8px] mt-[30px] hover:bg-orange-600 relative">
                    Register
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* rider sign up*/}
      <div
        className={`fixed w-full h-full block ${
          riderModal ? "translate-y-0 z-40" : "translate-y-full z-40"
        } ease-in-out duration-500`}
        style={{
          minWidth: riderModal ? "200px" : "",
          zIndex: riderModal ? 50 : "",
          background: riderModal ? "#0007" : "",
          color: riderModal ? "white" : "",
          top: riderModal ? 0 : 0,
        }}
      >
        <div
          className={`bottom-0 left-1/2 transform -translate-x-1/2 z-40 absolute overflow-y-auto  bg-white sm:w-[500px] w-full rounded-t-[30px] pt-[18px]  h-[90%] ${
            riderModal ? "translate-y-0" : "translate-y-full"
          } ease-in-out duration-500`}
        >
          <div className="">
            <div className="flex items-center justify-between gap-[30px] px-[3%] md:px-[5%]">
              <div>
                {riderPage !== 0 ? (
                  <FaArrowLeftLong
                    onClick={() => setRiderPage(riderPage - 1)}
                    className="text-primary text-[30px] cursor-pointer w-[25px]"
                  />
                ) : (
                  <></>
                )}
                {riderPage === 0 ? (
                  <FaArrowLeftLong
                    onClick={() => {
                      setRiderModal(!riderModal);
                      setSignup(!signup);
                    }}
                    className="text-primary text-[30px] cursor-pointer w-[25px]"
                  />
                ) : (
                  <></>
                )}
              </div>
              <MdOutlineClose
                onClick={() => setRiderModal(!riderModal)}
                className="text-black text-[30px] cursor-pointer"
              />
            </div>

            <div className="text-gray-900 text-[22px] font-[500] flex justify-center border-b-[1px] border-gray-300 pb-[10px]">
              Rider Sign Up
            </div>
            <div className="px-[3%] md:px-[5%] mt-[15px] pb-[30px] shadow-lg ">
              {riderPage !== riderFormTiles.length - 0 && (
                <div className="rounded-[50px] w-[80%] h-[5px] bg-orange-100  mx-auto">
                  <div
                    className="w-[33.3%] h-[100%] bg-primary rounded-[50px] ease-in-out duration-700"
                    style={{ width: `${(riderPage + 1) * 33.3}%` }}
                  ></div>
                </div>
              )}
            </div>
            <div className="mt-[15px]">
              <div className="px-[3%] md:px-[5%] h-[calc(80vh-120px)] overflow-y-auto ">
                <h4 className="text-gray-900 text-[18px] font-[500] ">
                  {riderFormTiles[riderPage]}
                </h4>
                <div className="pb-[20px]">
                  {riderPage === 0 && (
                    <div className=" mt-[30px]">
                      <div>
                        <div className="flex gap-[5px] items-center font-[500] mb-[5px]">
                          <h4 className="text-[12px] lg:text-[16px] text-gray-900 ">
                            First Name
                          </h4>{" "}
                          <h4 className="text-[12px] text-primary">*</h4>
                        </div>
                        <input
                          maxLength={15}
                          type="text"
                          name="riderFirstName"
                          value={
                            riderFormData.riderFirstName
                              ?.charAt(0)
                              .toUpperCase() +
                            riderFormData.riderFirstName.slice(1)
                          }
                          onChange={(e) =>
                            handleRiderChange(e.target.value, "riderFirstName")
                          }
                          className={
                            riderErrors.riderFirstName
                              ? "placeholder:text-[12px] placeholder:lg:text-[16px] px-[14px] py-[10px] border-[1px] border-red-500 w-full rounded-[8px] focus:outline-none  focus:border-orange-300  focus:border-[1px] text-black text-[12px] lg:text-[16px]"
                              : "placeholder:text-[12px] placeholder:lg:text-[16px] px-[14px] py-[10px] border-[1px] border-gray-300 w-full rounded-[8px] focus:outline-none  focus:border-orange-300  focus:border-[1px] text-black text-[12px] lg:text-[16px]"
                          }
                          placeholder="Enter first name"
                        />
                        {riderErrors.riderFirstName && (
                          <h4 className="text-[12px] text-red-500 mt-[2px]">
                            {riderErrors.riderFirstName}
                          </h4>
                        )}
                      </div>
                      <div className="mt-[15px]">
                        <div className="flex gap-[5px] items-center font-[500] mb-[5px]">
                          <h4 className="text-[12px] lg:text-[16px] text-gray-900 ">
                            Last Name
                          </h4>{" "}
                          <h4 className="text-[12px] text-primary">*</h4>
                        </div>
                        <input
                          maxLength={15}
                          type="text"
                          name="riderLastName"
                          value={
                            riderFormData.riderLastName
                              ?.charAt(0)
                              .toUpperCase() +
                            riderFormData.riderLastName.slice(1)
                          }
                          onChange={(e) =>
                            handleRiderChange(e.target.value, "riderLastName")
                          }
                          className={
                            riderErrors.riderLastName
                              ? "placeholder:text-[12px] placeholder:lg:text-[16px] px-[14px] py-[10px] border-[1px] border-red-500 w-full rounded-[8px] focus:outline-none  focus:border-orange-300  focus:border-[1px] text-black text-[12px] lg:text-[16px]"
                              : "placeholder:text-[12px] placeholder:lg:text-[16px] px-[14px] py-[10px] border-[1px] border-gray-300 w-full rounded-[8px] focus:outline-none  focus:border-orange-300  focus:border-[1px] text-black text-[12px] lg:text-[16px]"
                          }
                          placeholder="Enter last name"
                        />
                        {riderErrors.riderLastName && (
                          <h4 className="text-[12px] text-red-500 mt-[2px]">
                            {riderErrors.riderLastName}
                          </h4>
                        )}
                      </div>
                      <div className="mt-[15px]">
                        <div className="flex gap-[5px] items-center font-[500] mb-[5px]">
                          <h4 className="text-[12px] lg:text-[16px] text-gray-900 ">
                            Email
                          </h4>{" "}
                          <h4 className="text-[12px] text-primary">*</h4>
                        </div>
                        <input
                          type="email"
                          name="riderEmail"
                          value={riderFormData.riderEmail}
                          onChange={(e) =>
                            handleRiderChange(e.target.value, "riderEmail")
                          }
                          className={
                            riderErrors.riderEmail
                              ? "placeholder:text-[12px] placeholder:lg:text-[16px] px-[14px] py-[10px] border-[1px] border-red-500 w-full rounded-[8px] focus:outline-none  focus:border-orange-300  focus:border-[1px] text-black text-[12px] lg:text-[16px]"
                              : "placeholder:text-[12px] placeholder:lg:text-[16px] px-[14px] py-[10px] border-[1px] border-gray-300 w-full rounded-[8px] focus:outline-none  focus:border-orange-300  focus:border-[1px] text-black text-[12px] lg:text-[16px]"
                          }
                          placeholder="example@abc.com"
                        />
                        {riderErrors.riderEmail && (
                          <h4 className="text-[12px] text-red-500 mt-[2px]">
                            {riderErrors.riderEmail}
                          </h4>
                        )}
                      </div>

                      <div className="mt-[15px]">
                        <div className="flex gap-[5px] items-center font-[500] mb-[5px]">
                          <h4 className="text-[12px] lg:text-[16px] text-gray-900 ">
                            Phone Number
                          </h4>{" "}
                          <h4 className="text-[12px] text-primary">*</h4>
                        </div>
                        <input
                          maxLength={11}
                          type="tel"
                          value={riderFormData.riderPhoneNumber
                            .slice(0, 11)
                            .replace(/\D/g, "")}
                          onChange={(e) =>
                            handleRiderChange(
                              e.target.value,
                              "riderPhoneNumber"
                            )
                          }
                          name="riderPhoneNumber"
                          className={
                            riderErrors.riderPhoneNumber
                              ? "placeholder:text-[12px] placeholder:lg:text-[16px] px-[14px] py-[10px] border-[1px] border-red-500 w-full rounded-[8px] focus:outline-none  focus:border-orange-300  focus:border-[1px] text-black text-[12px] lg:text-[16px]"
                              : "placeholder:text-[12px] placeholder:lg:text-[16px] px-[14px] py-[10px] border-[1px] border-gray-300 w-full rounded-[8px] focus:outline-none  focus:border-orange-300  focus:border-[1px] text-black text-[12px] lg:text-[16px]"
                          }
                          placeholder="Enter phone number"
                        />
                        {riderErrors.riderPhoneNumber && (
                          <h4 className="text-[12px] text-red-500 mt-[2px]">
                            {riderErrors.riderPhoneNumber}
                          </h4>
                        )}
                      </div>

                      <div className="mt-[15px]">
                        <div className="flex gap-[5px] items-center font-[500] mb-[5px]">
                          <h4 className="text-[12px] lg:text-[16px] text-gray-900 ">
                            Next of Kin Name
                          </h4>{" "}
                          <h4 className="text-[12px] text-primary">*</h4>
                        </div>
                        <input
                          maxLength={25}
                          type="text"
                          name="riderNextOfKinName"
                          value={riderFormData.riderNextOfKinName
                            ?.split(" ")
                            .map(
                              (word) =>
                                word.charAt(0).toUpperCase() + word.slice(1)
                            )
                            .join(" ")}
                          onChange={(e) =>
                            handleRiderChange(
                              e.target.value,
                              "riderNextOfKinName"
                            )
                          }
                          className={
                            riderErrors.riderNextOfKinName
                              ? "placeholder:text-[12px] placeholder:lg:text-[16px] px-[14px] py-[10px] border-[1px] border-red-500 w-full rounded-[8px] focus:outline-none  focus:border-orange-300  focus:border-[1px] text-black text-[12px] lg:text-[16px]"
                              : "placeholder:text-[12px] placeholder:lg:text-[16px] px-[14px] py-[10px] border-[1px] border-gray-300 w-full rounded-[8px] focus:outline-none  focus:border-orange-300  focus:border-[1px] text-black text-[12px] lg:text-[16px]"
                          }
                          placeholder="Enter next of kin name"
                        />
                        {riderErrors.riderNextOfKinName && (
                          <h4 className="text-[12px] text-red-500 mt-[2px]">
                            {riderErrors.riderNextOfKinName}
                          </h4>
                        )}
                      </div>
                      <div className="mt-[15px]">
                        <div className="flex gap-[5px] items-center font-[500] mb-[5px]">
                          <h4 className="text-[12px] lg:text-[16px] text-gray-900 ">
                            Next of Kin Phone Number
                          </h4>{" "}
                          <h4 className="text-[12px] text-primary">*</h4>
                        </div>
                        <input
                          maxLength={11}
                          type="tel"
                          name="riderNextOfKinPhoneNumber"
                          value={riderFormData.riderNextOfKinPhoneNumber
                            .slice(0, 11)
                            .replace(/\D/g, "")}
                          onChange={(e) =>
                            handleRiderChange(
                              e.target.value,
                              "riderNextOfKinPhoneNumber"
                            )
                          }
                          className={
                            riderErrors.riderNextOfKinPhoneNumber
                              ? "placeholder:text-[12px] placeholder:lg:text-[16px] px-[14px] py-[10px] border-[1px] border-red-500 w-full rounded-[8px] focus:outline-none  focus:border-orange-300  focus:border-[1px] text-black text-[12px] lg:text-[16px]"
                              : "placeholder:text-[12px] placeholder:lg:text-[16px] px-[14px] py-[10px] border-[1px] border-gray-300 w-full rounded-[8px] focus:outline-none  focus:border-orange-300  focus:border-[1px] text-black text-[12px] lg:text-[16px]"
                          }
                          placeholder="Enter last name"
                        />
                        {riderErrors.riderNextOfKinPhoneNumber && (
                          <h4 className="text-[12px] text-red-500 mt-[2px]">
                            {riderErrors.riderNextOfKinPhoneNumber}
                          </h4>
                        )}
                      </div>

                      <div className="mt-[15px]">
                        <div className="flex gap-[5px] items-center font-[500] mb-[5px]">
                          <h4 className="text-[12px] lg:text-[16px] text-gray-900 ">
                            Create Password
                          </h4>{" "}
                          <h4 className="text-[12px] text-primary">*</h4>
                        </div>
                        <div className="relative">
                          <input
                            type={typePass3 ? "text" : "password"}
                            name="riderPassword"
                            value={riderFormData.riderPassword}
                            onChange={(e) =>
                              handleRiderChange(e.target.value, "riderPassword")
                            }
                            className={
                              riderErrors.riderPassword
                                ? "placeholder:text-[12px] placeholder:lg:text-[16px] px-[14px] py-[10px] border-[1px] border-red-500 w-full rounded-[8px] focus:outline-none  focus:border-orange-300  focus:border-[1px] text-black text-[12px] lg:text-[16px]"
                                : "placeholder:text-[12px] placeholder:lg:text-[16px] px-[14px] py-[10px] border-[1px] border-gray-300 w-full rounded-[8px] focus:outline-none  focus:border-orange-300  focus:border-[1px] text-black text-[12px] lg:text-[16px]"
                            }
                            placeholder="8+ character, please"
                          />{" "}
                          <small
                            className="cursor-pointer absolute top-1/2  transform  -translate-y-1/2 right-[20px] font-semibold text-primary"
                            onClick={() => setTypePass3(!typePass3)}
                          >
                            {typePass3 ? <FaEye /> : <FaEyeSlash />}
                          </small>
                        </div>
                        {riderErrors.riderPassword && (
                          <h4 className="text-[12px] text-red-500 mt-[2px]">
                            {riderErrors.riderPassword}
                          </h4>
                        )}
                      </div>
                      <div className="mt-[15px]">
                        <div className="flex gap-[5px] items-center font-[500] mb-[5px]">
                          <h4 className="text-[12px] lg:text-[16px] text-gray-900 ">
                            Confirm Password
                          </h4>{" "}
                          <h4 className="text-[12px] text-primary">*</h4>
                        </div>
                        <div className="relative">
                          <input
                            type={typePass4 ? "text" : "password"}
                            value={riderFormData.riderConfirmPassword}
                            onChange={(e) =>
                              handleRiderChange(
                                e.target.value,
                                "riderConfirmPassword"
                              )
                            }
                            className={
                              riderErrors.riderConfirmPassword
                                ? "placeholder:text-[12px] placeholder:lg:text-[16px] px-[14px] py-[10px] border-[1px] border-red-500 w-full rounded-[8px] focus:outline-none  focus:border-orange-300  focus:border-[1px] text-black text-[12px] lg:text-[16px]"
                                : "placeholder:text-[12px] placeholder:lg:text-[16px] px-[14px] py-[10px] border-[1px] border-gray-300 w-full rounded-[8px] focus:outline-none  focus:border-orange-300  focus:border-[1px] text-black text-[12px] lg:text-[16px]"
                            }
                            placeholder="Re-enter password"
                          />

                          <small
                            className="cursor-pointer absolute top-1/2  transform  -translate-y-1/2 right-[20px] font-semibold text-primary"
                            onClick={() => setTypePass4(!typePass4)}
                          >
                            {typePass4 ? <FaEye /> : <FaEyeSlash />}
                          </small>
                        </div>
                        {riderErrors.riderConfirmPassword && (
                          <h4 className="text-[12px] text-red-500 mt-[2px]">
                            {riderErrors.riderConfirmPassword}
                          </h4>
                        )}
                      </div>
                    </div>
                  )}

                  {riderPage === 1 && (
                    <div className=" mt-[30px]">
                      <div className="mt-[15px]">
                        {" "}
                        <div className="flex gap-[5px] items-center font-[500] mb-[5px]">
                          <h4 className="text-[12px] lg:text-[16px] text-gray-900 ">
                            Vehicle Type
                          </h4>{" "}
                          <h4 className="text-[12px] text-primary">*</h4>
                        </div>
                        <Select
                          options={vehicleTypeOptions}
                          styles={customStyles}
                          onChange={(selectedOption) =>
                            handleRiderChange(
                              selectedOption.value,
                              "riderVehicleType"
                            )
                          }
                          name="riderVehicleType"
                        />
                        {riderErrors.riderVehicleType && (
                          <h4 className="text-[12px] text-red-500 mt-[2px]">
                            {riderErrors.riderVehicleType}
                          </h4>
                        )}
                      </div>
                      <div className="mt-[15px]">
                        <div className="flex gap-[5px] items-center font-[500] mb-[5px]">
                          <h4 className="text-[12px] lg:text-[16px] text-gray-900 ">
                            Plate Number
                          </h4>{" "}
                        </div>
                        <input
                          maxLength={10}
                          type="text"
                          name="riderPlateNumber"
                          value={riderFormData.riderPlateNumber}
                          onChange={(e) =>
                            handleRiderChange(
                              e.target.value,
                              "riderPlateNumber"
                            )
                          }
                          className={
                            riderErrors.riderPlateNumber
                              ? "placeholder:text-[12px] placeholder:lg:text-[16px] px-[14px] py-[10px] border-[1px] border-red-500 w-full rounded-[8px] focus:outline-none  focus:border-orange-300  focus:border-[1px] text-black text-[12px] lg:text-[16px]"
                              : "placeholder:text-[12px] placeholder:lg:text-[16px] px-[14px] py-[10px] border-[1px] border-gray-300 w-full rounded-[8px] focus:outline-none  focus:border-orange-300  focus:border-[1px] text-black text-[12px] lg:text-[16px]"
                          }
                          placeholder="Vehicle plate number"
                        />
                        {riderErrors.riderPlateNumber && (
                          <h4 className="text-[12px] text-red-500 mt-[2px]">
                            {riderErrors.riderPlateNumber}
                          </h4>
                        )}
                      </div>

                      <div className="mt-[15px]">
                        <div className="flex gap-[5px] items-center font-[500] mb-[5px]">
                          <h4 className="text-[12px] lg:text-[16px] text-gray-900 ">
                            Guarantor Name
                          </h4>{" "}
                          <h4 className="text-[12px] text-primary">*</h4>
                        </div>
                        <input
                          maxLength={25}
                          type="text"
                          name="riderGuarantorName"
                          value={riderFormData.riderGuarantorName
                            ?.split(" ")
                            .map(
                              (word) =>
                                word.charAt(0).toUpperCase() + word.slice(1)
                            )
                            .join(" ")}
                          onChange={(e) =>
                            handleRiderChange(
                              e.target.value,
                              "riderGuarantorName"
                            )
                          }
                          className={
                            riderErrors.riderGuarantorName
                              ? "placeholder:text-[12px] placeholder:lg:text-[16px] px-[14px] py-[10px] border-[1px] border-red-500 w-full rounded-[8px] focus:outline-none  focus:border-orange-300  focus:border-[1px] text-black text-[12px] lg:text-[16px]"
                              : "placeholder:text-[12px] placeholder:lg:text-[16px] px-[14px] py-[10px] border-[1px] border-gray-300 w-full rounded-[8px] focus:outline-none  focus:border-orange-300  focus:border-[1px] text-black text-[12px] lg:text-[16px]"
                          }
                          placeholder="Enter guarantor name"
                        />
                        {riderErrors.riderGuarantorName && (
                          <h4 className="text-[12px] text-red-500 mt-[2px]">
                            {riderErrors.riderGuarantorName}
                          </h4>
                        )}
                      </div>

                      <div className="mt-[15px]">
                        <div className="flex gap-[5px] items-center font-[500] mb-[5px]">
                          <h4 className="text-[12px] lg:text-[16px] text-gray-900 ">
                            Guarantor Phone
                          </h4>{" "}
                          <h4 className="text-[12px] text-primary">*</h4>
                        </div>
                        <div className="flex gap-[20px]">
                          <div className="w-[60%]">
                            <input
                              maxLength={11}
                              type="tel"
                              value={riderFormData.riderGuarantorPhoneNumber
                                .slice(0, 11)
                                .replace(/\D/g, "")}
                              onChange={(e) =>
                                handleRiderChange(
                                  e.target.value,
                                  "riderGuarantorPhoneNumber"
                                )
                              }
                              name="riderGuarantorPhoneNumber"
                              className={
                                riderErrors.riderGuarantorPhoneNumber
                                  ? "placeholder:text-[12px] placeholder:lg:text-[16px] px-[14px] py-[10px] border-[1px] border-red-500 w-full rounded-[8px] focus:outline-none  focus:border-orange-300  focus:border-[1px] text-black text-[12px] lg:text-[16px]"
                                  : "placeholder:text-[12px] placeholder:lg:text-[16px] px-[14px] py-[10px] border-[1px] border-gray-300 w-full rounded-[8px] focus:outline-none  focus:border-orange-300  focus:border-[1px] text-black text-[12px] lg:text-[16px]"
                              }
                              placeholder="Enter guarantor phone number"
                            />
                            {riderErrors.riderGuarantorPhoneNumber && (
                              <h4 className="text-[12px] text-red-500 mt-[2px]">
                                {riderErrors.riderGuarantorPhoneNumber}
                              </h4>
                            )}
                          </div>
                          <div className="w-[40%]">
                            <Select
                              options={riderGuarantorRelationshipOptions}
                              styles={customStyles}
                              onChange={(selectedOption) =>
                                handleRiderChange(
                                  selectedOption.value,
                                  "riderGuarantorRelationship"
                                )
                              }
                            />
                            {riderErrors.riderGuarantorRelationship && (
                              <h4 className="text-[12px] text-red-500 mt-[2px]">
                                {riderErrors.riderGuarantorRelationship}
                              </h4>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {riderPage === 2 && (
                    <div className=" mt-[30px]">
                      <div className="mt-[15px]">
                        <div className="flex gap-[5px] items-center font-[500] mb-[5px]">
                          <h4 className="text-[12px] lg:text-[16px] text-gray-900 ">
                            What Bank?
                          </h4>{" "}
                          <h4 className="text-[12px] text-primary">*</h4>
                        </div>
                        <input
                          maxLength={25}
                          type="text"
                          name="riderBankName"
                          value={riderFormData.riderBankName
                            ?.split(" ")
                            .map(
                              (word) =>
                                word.charAt(0).toUpperCase() + word.slice(1)
                            )
                            .join(" ")}
                          onChange={(e) =>
                            handleRiderChange(e.target.value, "riderBankName")
                          }
                          className={
                            riderErrors.riderBankName
                              ? "placeholder:text-[12px] placeholder:lg:text-[16px] px-[14px] py-[10px] border-[1px] border-red-500 w-full rounded-[8px] focus:outline-none  focus:border-orange-300  focus:border-[1px] text-black text-[12px] lg:text-[16px]"
                              : "placeholder:text-[12px] placeholder:lg:text-[16px] px-[14px] py-[10px] border-[1px] border-gray-300 w-full rounded-[8px] focus:outline-none  focus:border-orange-300  focus:border-[1px] text-black text-[12px] lg:text-[16px]"
                          }
                          placeholder="Enter bank name"
                        />
                        {riderErrors.riderBankName && (
                          <h4 className="text-[12px] text-red-500 mt-[2px]">
                            {riderErrors.riderBankName}
                          </h4>
                        )}
                      </div>
                      <div className="mt-[15px]">
                        <div className="flex gap-[5px] items-center font-[500] mb-[5px]">
                          <h4 className="text-[12px] lg:text-[16px] text-gray-900 ">
                            Account Number
                          </h4>{" "}
                          <h4 className="text-[12px] text-primary">*</h4>
                        </div>
                        <input
                          maxLength={10}
                          type="text"
                          name="riderAccountNumber"
                          value={riderFormData.riderAccountNumber}
                          onChange={(e) =>
                            handleRiderChange(
                              e.target.value,
                              "riderAccountNumber"
                            )
                          }
                          className={
                            riderErrors.riderAccountNumber
                              ? "placeholder:text-[12px] placeholder:lg:text-[16px] px-[14px] py-[10px] border-[1px] border-red-500 w-full rounded-[8px] focus:outline-none  focus:border-orange-300  focus:border-[1px] text-black text-[12px] lg:text-[16px]"
                              : "placeholder:text-[12px] placeholder:lg:text-[16px] px-[14px] py-[10px] border-[1px] border-gray-300 w-full rounded-[8px] focus:outline-none  focus:border-orange-300  focus:border-[1px] text-black text-[12px] lg:text-[16px]"
                          }
                          placeholder="Enter account number"
                        />
                        {riderErrors.riderAccountNumber && (
                          <h4 className="text-[12px] text-red-500 mt-[2px]">
                            {riderErrors.riderAccountNumber}
                          </h4>
                        )}
                      </div>

                      <div className="mt-[15px]">
                        <div className="flex gap-[5px] items-center font-[500] mb-[5px]">
                          <h4 className="text-[12px] lg:text-[16px] text-gray-900 ">
                            Name on Account
                          </h4>{" "}
                          <h4 className="text-[12px] text-primary">*</h4>
                        </div>
                        <input
                          maxLength={25}
                          type="text"
                          name="riderAccountName"
                          value={riderFormData.riderAccountName
                            ?.split(" ")
                            .map(
                              (word) =>
                                word.charAt(0).toUpperCase() + word.slice(1)
                            )
                            .join(" ")}
                          onChange={(e) =>
                            handleRiderChange(
                              e.target.value,
                              "riderAccountName"
                            )
                          }
                          className={
                            riderErrors.riderAccountName
                              ? "placeholder:text-[12px] placeholder:lg:text-[16px] px-[14px] py-[10px] border-[1px] border-red-500 w-full rounded-[8px] focus:outline-none  focus:border-orange-300  focus:border-[1px] text-black text-[12px] lg:text-[16px]"
                              : "placeholder:text-[12px] placeholder:lg:text-[16px] px-[14px] py-[10px] border-[1px] border-gray-300 w-full rounded-[8px] focus:outline-none  focus:border-orange-300  focus:border-[1px] text-black text-[12px] lg:text-[16px]"
                          }
                          placeholder="Enter account name"
                        />
                        {riderErrors.riderAccountName && (
                          <h4 className="text-[12px] text-red-500 mt-[2px]">
                            {riderErrors.riderAccountName}
                          </h4>
                        )}
                      </div>
                    </div>
                  )}

                  {riderPage !== riderFormData.length - 0 && (
                    <div>
                      {riderPage === riderFormTiles.length - 1 && (
                        <button
                          className="text-white font-[500] px-[16px] py-[12px] bg-primary w-full rounded-[8px] mt-[30px] hover:bg-orange-600 relative"
                          onClick={handleRiderSubmit}
                        >
                          Register
                        </button>
                      )}{" "}
                      {riderPage !== riderFormTiles.length - 1 && (
                        <button
                          className="text-white font-[500] px-[16px] py-[12px] bg-primary w-full rounded-[8px] mt-[30px] hover:bg-orange-600 relative"
                          onClick={handleRiderNext}
                        >
                          Next
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* vendor sign up */}
      <div
        className={`fixed w-full h-full block ${
          vendorModal ? "translate-y-0 z-40" : "translate-y-full z-40"
        } ease-in-out duration-500`}
        style={{
          minWidth: vendorModal ? "200px" : "",
          zIndex: vendorModal ? 50 : "",
          background: vendorModal ? "#0007" : "",
          color: vendorModal ? "white" : "",
          top: vendorModal ? 0 : 0,
        }}
      >
        <div
          className={`bottom-0 left-1/2 transform -translate-x-1/2 z-40 absolute overflow-y-auto  bg-white sm:w-[500px] w-full rounded-t-[30px] pt-[18px] h-[90%] ${
            vendorModal ? "translate-y-0" : "translate-y-full"
          } ease-in-out duration-500`}
        >
          <div className="">
            <div className="flex items-center justify-between gap-[30px] px-[3%] md:px-[5%]">
              <div>
                {vendorPage !== 0 ? (
                  <FaArrowLeftLong
                    onClick={() => setVendorPage(vendorPage - 1)}
                    className="text-primary text-[30px] cursor-pointer w-[25px]"
                  />
                ) : (
                  <></>
                )}
                {vendorPage === 0 ? (
                  <FaArrowLeftLong
                    onClick={() => {
                      setVendorModal(!vendorModal);
                      setSignup(!signup);
                    }}
                    className="text-primary text-[30px] cursor-pointer w-[25px]"
                  />
                ) : (
                  <></>
                )}
              </div>
              <MdOutlineClose
                onClick={() => setVendorModal(!vendorModal)}
                className="text-black text-[30px] cursor-pointer"
              />
            </div>
            <div className="text-gray-900 text-[22px] font-[500] flex justify-center border-b-[1px] border-gray-300 pb-[10px]">
              Vendor Sign Up
            </div>
            <div className="px-[3%] md:px-[5%] mt-[15px] pb-[30px] shadow-lg ">
              {vendorPage !== vendorFormTiles.length - 0 && (
                <div className="rounded-[50px] w-[80%] h-[5px] bg-orange-100  mx-auto">
                  <div
                    className="w-[50%] h-[100%] bg-primary rounded-[50px] ease-in-out duration-700"
                    style={{ width: `${(vendorPage + 1) * 50}%` }}
                  ></div>
                </div>
              )}
            </div>
            <div className="mt-[15px]">
              <div className="px-[3%] md:px-[5%] h-[calc(80vh-110px)] overflow-y-auto ">
                <h4 className="text-gray-900 text-[18px] font-[500] ">
                  {vendorFormTiles[vendorPage]}
                </h4>
                <div className="pb-[60px]">
                  {vendorPage === 0 && (
                    <div className=" mt-[30px]">
                      <div className="grid grid-cols-2 gap-[20px]">
                        <div>
                          <div className="flex gap-[5px] items-center font-[500] mb-[5px]">
                            <h4 className="text-[12px] lg:text-[16px] text-gray-900 ">
                              First Name
                            </h4>{" "}
                            <h4 className="text-[12px] text-primary">*</h4>
                          </div>
                          <input
                            maxLength={15}
                            type="text"
                            name="vendorFirstName"
                            value={
                              vendorFormData.vendorFirstName
                                ?.charAt(0)
                                .toUpperCase() +
                              vendorFormData.vendorFirstName.slice(1)
                            }
                            onChange={(e) =>
                              handleVendorChange(
                                e.target.value,
                                "vendorFirstName"
                              )
                            }
                            className={
                              vendorErrors.vendorFirstName
                                ? "placeholder:text-[12px] placeholder:lg:text-[16px] px-[14px] py-[10px] border-[1px] border-red-500 w-full rounded-[8px] focus:outline-none  focus:border-orange-300  focus:border-[1px] text-black text-[12px] lg:text-[16px]"
                                : "placeholder:text-[12px] placeholder:lg:text-[16px] px-[14px] py-[10px] border-[1px] border-gray-300 w-full rounded-[8px] focus:outline-none  focus:border-orange-300  focus:border-[1px] text-black text-[12px] lg:text-[16px]"
                            }
                            placeholder="Enter first name"
                          />
                          {vendorErrors.vendorFirstName && (
                            <h4 className="text-[12px] text-red-500 mt-[2px]">
                              {vendorErrors.vendorFirstName}
                            </h4>
                          )}
                        </div>
                        <div className="">
                          <div className="flex gap-[5px] items-center font-[500] mb-[5px]">
                            <h4 className="text-[12px] lg:text-[16px] text-gray-900 ">
                              Last Name
                            </h4>{" "}
                            <h4 className="text-[12px] text-primary">*</h4>
                          </div>
                          <input
                            maxLength={15}
                            type="text"
                            name="vendorLastName"
                            value={
                              vendorFormData.vendorLastName
                                ?.charAt(0)
                                .toUpperCase() +
                              vendorFormData.vendorLastName.slice(1)
                            }
                            onChange={(e) =>
                              handleVendorChange(
                                e.target.value,
                                "vendorLastName"
                              )
                            }
                            className={
                              vendorErrors.vendorLastName
                                ? "placeholder:text-[12px] placeholder:lg:text-[16px] px-[14px] py-[10px] border-[1px] border-red-500 w-full rounded-[8px] focus:outline-none  focus:border-orange-300  focus:border-[1px] text-black text-[12px] lg:text-[16px]"
                                : "placeholder:text-[12px] placeholder:lg:text-[16px] px-[14px] py-[10px] border-[1px] border-gray-300 w-full rounded-[8px] focus:outline-none  focus:border-orange-300  focus:border-[1px] text-black text-[12px] lg:text-[16px]"
                            }
                            placeholder="Enter last name"
                          />
                          {vendorErrors.vendorLastName && (
                            <h4 className="text-[12px] text-red-500 mt-[2px]">
                              {vendorErrors.vendorLastName}
                            </h4>
                          )}
                        </div>
                      </div>
                      <div className="mt-[15px]">
                        <div className="flex gap-[5px] items-center font-[500] mb-[5px]">
                          <h4 className="text-[12px] lg:text-[16px] text-gray-900 ">
                            Email
                          </h4>{" "}
                          <h4 className="text-[12px] text-primary">*</h4>
                        </div>
                        <input
                          type="email"
                          name="vendorEmail"
                          value={vendorFormData.vendorEmail}
                          onChange={(e) =>
                            handleVendorChange(e.target.value, "vendorEmail")
                          }
                          className={
                            vendorErrors.vendorEmail
                              ? "placeholder:text-[12px] placeholder:lg:text-[16px] px-[14px] py-[10px] border-[1px] border-red-500 w-full rounded-[8px] focus:outline-none  focus:border-orange-300  focus:border-[1px] text-black text-[12px] lg:text-[16px]"
                              : "placeholder:text-[12px] placeholder:lg:text-[16px] px-[14px] py-[10px] border-[1px] border-gray-300 w-full rounded-[8px] focus:outline-none  focus:border-orange-300  focus:border-[1px] text-black text-[12px] lg:text-[16px]"
                          }
                          placeholder="example@abc.com"
                        />
                        {vendorErrors.vendorEmail && (
                          <h4 className="text-[12px] text-red-500 mt-[2px]">
                            {vendorErrors.vendorEmail}
                          </h4>
                        )}
                      </div>

                      <div className="mt-[15px]">
                        <div className="flex gap-[5px] items-center font-[500] mb-[5px]">
                          <h4 className="text-[12px] lg:text-[16px] text-gray-900 ">
                            Phone Number
                          </h4>{" "}
                          <h4 className="text-[12px] text-primary">*</h4>
                        </div>
                        <input
                          maxLength={11}
                          type="tel"
                          value={vendorFormData.vendorPhoneNumber
                            .slice(0, 11)
                            .replace(/\D/g, "")}
                          onChange={(e) =>
                            handleVendorChange(
                              e.target.value,
                              "vendorPhoneNumber"
                            )
                          }
                          name="vendorPhoneNumber"
                          className={
                            vendorErrors.vendorPhoneNumber
                              ? "placeholder:text-[12px] placeholder:lg:text-[16px] px-[14px] py-[10px] border-[1px] border-red-500 w-full rounded-[8px] focus:outline-none  focus:border-orange-300  focus:border-[1px] text-black text-[12px] lg:text-[16px]"
                              : "placeholder:text-[12px] placeholder:lg:text-[16px] px-[14px] py-[10px] border-[1px] border-gray-300 w-full rounded-[8px] focus:outline-none  focus:border-orange-300  focus:border-[1px] text-black text-[12px] lg:text-[16px]"
                          }
                          placeholder="Enter phone number"
                        />
                        {vendorErrors.vendorPhoneNumber && (
                          <h4 className="text-[12px] text-red-500 mt-[2px]">
                            {vendorErrors.vendorPhoneNumber}
                          </h4>
                        )}
                      </div>

                      <div className="mt-[15px]">
                        <div className="flex gap-[5px] items-center font-[500] mb-[5px]">
                          <h4 className="text-[12px] lg:text-[16px] text-gray-900 ">
                            Create Password
                          </h4>{" "}
                          <h4 className="text-[12px] text-primary">*</h4>
                        </div>
                        <div className="relative">
                          <input
                            type={typePass5 ? "text" : "password"}
                            name="vendorPassword"
                            value={vendorFormData.vendorPassword}
                            onChange={(e) =>
                              handleVendorChange(
                                e.target.value,
                                "vendorPassword"
                              )
                            }
                            className={
                              vendorErrors.vendorPassword
                                ? "placeholder:text-[12px] placeholder:lg:text-[16px] px-[14px] py-[10px] border-[1px] border-red-500 w-full rounded-[8px] focus:outline-none  focus:border-orange-300  focus:border-[1px] text-black text-[12px] lg:text-[16px]"
                                : "placeholder:text-[12px] placeholder:lg:text-[16px] px-[14px] py-[10px] border-[1px] border-gray-300 w-full rounded-[8px] focus:outline-none  focus:border-orange-300  focus:border-[1px] text-black text-[12px] lg:text-[16px]"
                            }
                            placeholder="8+ character, please"
                          />{" "}
                          <small
                            className="cursor-pointer absolute top-1/2  transform  -translate-y-1/2 right-[20px] font-semibold text-primary"
                            onClick={() => setTypePass5(!typePass5)}
                          >
                            {typePass5 ? <FaEye /> : <FaEyeSlash />}
                          </small>
                        </div>
                        {vendorErrors.vendorPassword && (
                          <h4 className="text-[12px] text-red-500 mt-[2px]">
                            {vendorErrors.vendorPassword}
                          </h4>
                        )}
                      </div>
                      <div className="mt-[15px]">
                        <div className="flex gap-[5px] items-center font-[500] mb-[5px]">
                          <h4 className="text-[12px] lg:text-[16px] text-gray-900 ">
                            Confirm Password
                          </h4>{" "}
                          <h4 className="text-[12px] text-primary">*</h4>
                        </div>
                        <div className="relative">
                          <input
                            type={typePass6 ? "text" : "password"}
                            value={vendorFormData.vendorConfirmPassword}
                            onChange={(e) =>
                              handleVendorChange(
                                e.target.value,
                                "vendorConfirmPassword"
                              )
                            }
                            className={
                              vendorErrors.vendorConfirmPassword
                                ? "placeholder:text-[12px] placeholder:lg:text-[16px] px-[14px] py-[10px] border-[1px] border-red-500 w-full rounded-[8px] focus:outline-none  focus:border-orange-300  focus:border-[1px] text-black text-[12px] lg:text-[16px]"
                                : "placeholder:text-[12px] placeholder:lg:text-[16px] px-[14px] py-[10px] border-[1px] border-gray-300 w-full rounded-[8px] focus:outline-none  focus:border-orange-300  focus:border-[1px] text-black text-[12px] lg:text-[16px]"
                            }
                            placeholder="Re-enter password"
                          />

                          <small
                            className="cursor-pointer absolute top-1/2  transform  -translate-y-1/2 right-[20px] font-semibold text-primary"
                            onClick={() => setTypePass6(!typePass6)}
                          >
                            {typePass6 ? <FaEye /> : <FaEyeSlash />}
                          </small>
                        </div>
                        {vendorErrors.vendorConfirmPassword && (
                          <h4 className="text-[12px] text-red-500 mt-[2px]">
                            {vendorErrors.vendorConfirmPassword}
                          </h4>
                        )}
                      </div>
                    </div>
                  )}

                  {riderPage === 1 && (
                    <div className=" mt-[30px]">
                      <div className="mt-[15px]">
                        {" "}
                        <div className="flex gap-[5px] items-center font-[500] mb-[5px]">
                          <h4 className="text-[12px] lg:text-[16px] text-gray-900 ">
                            Vehicle Type
                          </h4>{" "}
                          <h4 className="text-[12px] text-primary">*</h4>
                        </div>
                        <Select
                          options={vehicleTypeOptions}
                          styles={customStyles}
                          onChange={(selectedOption) =>
                            handleRiderChange(
                              selectedOption.value,
                              "riderVehicleType"
                            )
                          }
                          name="riderVehicleType"
                        />
                        {riderErrors.riderVehicleType && (
                          <h4 className="text-[12px] text-red-500 mt-[2px]">
                            {riderErrors.riderVehicleType}
                          </h4>
                        )}
                      </div>
                      <div className="mt-[15px]">
                        <div className="flex gap-[5px] items-center font-[500] mb-[5px]">
                          <h4 className="text-[12px] lg:text-[16px] text-gray-900 ">
                            Plate Number
                          </h4>{" "}
                        </div>
                        <input
                          maxLength={10}
                          type="text"
                          name="riderPlateNumber"
                          value={riderFormData.riderPlateNumber}
                          onChange={(e) =>
                            handleRiderChange(
                              e.target.value,
                              "riderPlateNumber"
                            )
                          }
                          className={
                            riderErrors.riderPlateNumber
                              ? "placeholder:text-[12px] placeholder:lg:text-[16px] px-[14px] py-[10px] border-[1px] border-red-500 w-full rounded-[8px] focus:outline-none  focus:border-orange-300  focus:border-[1px] text-black text-[12px] lg:text-[16px]"
                              : "placeholder:text-[12px] placeholder:lg:text-[16px] px-[14px] py-[10px] border-[1px] border-gray-300 w-full rounded-[8px] focus:outline-none  focus:border-orange-300  focus:border-[1px] text-black text-[12px] lg:text-[16px]"
                          }
                          placeholder="Vehicle plate number"
                        />
                        {riderErrors.riderPlateNumber && (
                          <h4 className="text-[12px] text-red-500 mt-[2px]">
                            {riderErrors.riderPlateNumber}
                          </h4>
                        )}
                      </div>

                      <div className="mt-[15px]">
                        <div className="flex gap-[5px] items-center font-[500] mb-[5px]">
                          <h4 className="text-[12px] lg:text-[16px] text-gray-900 ">
                            Guarantor Name
                          </h4>{" "}
                          <h4 className="text-[12px] text-primary">*</h4>
                        </div>
                        <input
                          maxLength={25}
                          type="text"
                          name="riderGuarantorName"
                          value={riderFormData.riderGuarantorName
                            ?.split(" ")
                            .map(
                              (word) =>
                                word.charAt(0).toUpperCase() + word.slice(1)
                            )
                            .join(" ")}
                          onChange={(e) =>
                            handleRiderChange(
                              e.target.value,
                              "riderGuarantorName"
                            )
                          }
                          className={
                            riderErrors.riderGuarantorName
                              ? "placeholder:text-[12px] placeholder:lg:text-[16px] px-[14px] py-[10px] border-[1px] border-red-500 w-full rounded-[8px] focus:outline-none  focus:border-orange-300  focus:border-[1px] text-black text-[12px] lg:text-[16px]"
                              : "placeholder:text-[12px] placeholder:lg:text-[16px] px-[14px] py-[10px] border-[1px] border-gray-300 w-full rounded-[8px] focus:outline-none  focus:border-orange-300  focus:border-[1px] text-black text-[12px] lg:text-[16px]"
                          }
                          placeholder="Enter guarantor name"
                        />
                        {riderErrors.riderGuarantorName && (
                          <h4 className="text-[12px] text-red-500 mt-[2px]">
                            {riderErrors.riderGuarantorName}
                          </h4>
                        )}
                      </div>

                      <div className="mt-[15px]">
                        <div className="flex gap-[5px] items-center font-[500] mb-[5px]">
                          <h4 className="text-[12px] lg:text-[16px] text-gray-900 ">
                            Guarantor Phone
                          </h4>{" "}
                          <h4 className="text-[12px] text-primary">*</h4>
                        </div>
                        <div className="flex gap-[20px]">
                          <div className="w-[60%]">
                            <input
                              maxLength={11}
                              type="tel"
                              value={riderFormData.riderGuarantorPhoneNumber
                                .slice(0, 11)
                                .replace(/\D/g, "")}
                              onChange={(e) =>
                                handleRiderChange(
                                  e.target.value,
                                  "riderGuarantorPhoneNumber"
                                )
                              }
                              name="riderGuarantorPhoneNumber"
                              className={
                                riderErrors.riderGuarantorPhoneNumber
                                  ? "placeholder:text-[12px] placeholder:lg:text-[16px] px-[14px] py-[10px] border-[1px] border-red-500 w-full rounded-[8px] focus:outline-none  focus:border-orange-300  focus:border-[1px] text-black text-[12px] lg:text-[16px]"
                                  : "placeholder:text-[12px] placeholder:lg:text-[16px] px-[14px] py-[10px] border-[1px] border-gray-300 w-full rounded-[8px] focus:outline-none  focus:border-orange-300  focus:border-[1px] text-black text-[12px] lg:text-[16px]"
                              }
                              placeholder="Enter guarantor phone number"
                            />
                            {riderErrors.riderGuarantorPhoneNumber && (
                              <h4 className="text-[12px] text-red-500 mt-[2px]">
                                {riderErrors.riderGuarantorPhoneNumber}
                              </h4>
                            )}
                          </div>
                          <div className="w-[40%]">
                            <Select
                              options={riderGuarantorRelationshipOptions}
                              styles={customStyles}
                              onChange={(selectedOption) =>
                                handleRiderChange(
                                  selectedOption.value,
                                  "riderGuarantorRelationship"
                                )
                              }
                            />
                            {riderErrors.riderGuarantorRelationship && (
                              <h4 className="text-[12px] text-red-500 mt-[2px]">
                                {riderErrors.riderGuarantorRelationship}
                              </h4>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {vendorPage !== vendorFormData.length - 0 && (
                    <div>
                      {vendorPage === vendorFormTiles.length - 1 && (
                        <button
                          className="text-white font-[500] px-[16px] py-[12px] bg-primary w-full rounded-[8px] mt-[30px] hover:bg-orange-600 relative"
                          onClick={handleVendorSubmit}
                        >
                          Register
                        </button>
                      )}{" "}
                      {vendorPage !== vendorFormTiles.length - 1 && (
                        <button
                          className="text-white font-[500] px-[16px] py-[12px] bg-primary w-full rounded-[8px] mt-[30px] hover:bg-orange-600 relative"
                          onClick={handleVendorNext}
                        >
                          Next
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
