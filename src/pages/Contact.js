import React, { useState } from "react";
import axios from "axios";
import vendor1 from "../assets/vendor1.png";
import vendor2 from "../assets/vendor2.png";
import vendor3 from "../assets/vendor3.png";
import vendor4 from "../assets/vendor4.png";
import ScrollToTopOnMount from "../components/ScrollToTopOnMount";

const Contact = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async () => {
    if (!email || !firstName || !lastName || !phoneNumber || !message) {
      setErrorMessage("All fields are required.");
      return;
    }

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/users/contact_us`,
        {
          firstName,
          lastName,
          email,
          phoneNumber,
          message,
        },
        { withCredentials: true }
      );
      setSuccessMessage(response.data.message || "Request sent successfully");
      setEmail("");
      setFirstName("");
      setLastName("");
      setPhoneNumber("");
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
    <div className="-mt-[70px]">
      <ScrollToTopOnMount />
      {/* <div className="bg-secondary w-[1100px] h-[550px] flex justify-center items-center mt-[50px]">
        <img className="h-[460px]" src={vendor1} />
        <img className="h-[460px]" src={vendor2} />
        <img className="h-[460px]" src={vendor3} />
        <img className="h-[460px]" src={vendor4} />
      </div> */}
      <div className="bg-gray-200 px-[3%] lg:px-[5%] xl:px-[15%] 2xl:px-[20%] pt-[90px] pb-[50px]">
        <div className="border-[#F2F2F2] border-[1px] rounded-[20px] p-[24px] bg-white max-w-[800px] mx-auto">
          <h4 className="md:text-[28px]  text-[18px] xl:text-[36px] font-[600] text-text text-center">
            Contact Us
          </h4>
          <div className="mt-[16px] text-center">
            <p className=" text-[14px] text-gray-600">
              Phone:{" "}
              <span className="font-bold text-black">+234 813 528 9984</span>
            </p>
            <p className=" text-[14px] text-gray-600">
              Email:{" "}
              <a
                href="mailto:sprinapp@gmail.com"
                className="font-bold text-primary hover:underline"
              >
                sprinapp@gmail.com
              </a>
            </p>
          </div>
          <h4 className="mt-[40px] md:text-[28px]  text-[18px] xl:text-[36px] font-[600] text-text text-center">
            Tell Us How We Can Help
          </h4>
          <div className="mt-[24px] lg:mt-[48px] grid grid-cols-1 gap-[24px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px] md:gap-[17px]">
              <div className="w-full">
                <h4 className=" text-[12px] font-[500]">
                  First Name <span className="text-red-500">*</span>
                </h4>
                <input
                  className="placeholder:text-[12px] lg:placeholder: text-[14px] py-[10px] px-[14px] rounded-[8px] border-[1px] border-gray-200 focus:outline-none focus:border-orange-300 focus:border-[1px] w-full mt-[8px]"
                  placeholder="Enter first name"
                  type="text"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="w-full">
                <h4 className=" text-[12px] font-[500]">
                  Last Name <span className="text-red-500">*</span>
                </h4>
                <input
                  className="placeholder:text-[12px] lg:placeholder: text-[14px] py-[10px] px-[14px] rounded-[8px] border-[1px] border-gray-200 focus:outline-none focus:border-orange-300 focus:border-[1px] w-full mt-[8px]"
                  placeholder="Enter last name"
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full">
              <h4 className=" text-[12px] font-[500]">
                Email address <span className="text-red-500">*</span>
              </h4>
              <input
                className="placeholder:text-[12px] lg:placeholder: text-[14px] py-[10px] px-[14px] rounded-[8px] border-[1px] border-gray-200 focus:outline-none focus:border-orange-300 focus:border-[1px] w-full mt-[8px]"
                placeholder="Enter email address"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="w-full">
              <h4 className=" text-[12px] font-[500]">
                Phone Number <span className="text-red-500">*</span>
              </h4>
              <input
                className="placeholder:text-[12px] lg:placeholder: text-[14px] py-[10px] px-[14px] rounded-[8px] border-[1px] border-gray-200 focus:outline-none focus:border-orange-300 focus:border-[1px] w-full mt-[8px]"
                placeholder="08012345678"
                type="tel"
                name="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="w-full">
              <h4 className=" text-[12px] font-[500]">Message</h4>
              <textarea
                className="placeholder:text-[12px] lg:placeholder: text-[14px] py-[10px] px-[14px] rounded-[8px] border-[1px] border-gray-200 focus:outline-none focus:border-orange-300 focus:border-[1px] w-full mt-[8px]"
                placeholder="Type a message..."
                rows="5"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            {errorMessage && (
              <p className="text-red-600 text-center my-2">{errorMessage}</p>
            )}
            {successMessage && (
              <p className="text-green-600 text-center my-2">
                {successMessage}
              </p>
            )}
            <button
              className={`w-full px-[20px] py-[12px] 
             text-[12px] text-white bg-primary hover:bg-orange-600 rounded-[8px] ${
               loading ? "opacity-50 cursor-not-allowed" : ""
             }`}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Sending..." : "Submit Message"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
