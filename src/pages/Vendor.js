import React, { useState } from "react";
import axios from "axios";
import chefpage1 from "../assets/chefpage1.png";
import chefpage2 from "../assets/chefpage2.png";
import chefpage3 from "../assets/chefpage3.png";
import chefpage4 from "../assets/chefpage4.png";
import chefpage5 from "../assets/chefpage5.png";
import chefpage6 from "../assets/chefpage6.png";
import chef from "../assets/chef1.jpg";
import chef2 from "../assets/chef2.jpg";
import chef3 from "../assets/chef3.jpg";
import chef4 from "../assets/chef4.jpg";
import chef5 from "../assets/chef5.jpg";
import hire1 from "../assets/hire1.png";
import hire2 from "../assets/hire2.png";
import hire3 from "../assets/hire3.png";
import hire4 from "../assets/hire4.png";
import { FiChevronDown } from "react-icons/fi";
import { MdAccessTimeFilled } from "react-icons/md";
import { BsPeopleFill } from "react-icons/bs";
import { IoBagCheck } from "react-icons/io5";
import ScrollToTopOnMount from "../components/ScrollToTopOnMount";

const Vendor = () => {
  const [activeSection, setActiveSection] = useState("request");

  const handleSectionClick = (id) => {
    setActiveSection(id);
  };

  const [clickedIndex, setClickedIndex] = useState({});

  const handleClick = (index) => () => {
    setClickedIndex((state) => ({
      ...state,
      [index]: !state[index],
    }));
  };

  const Dropdown = [
    {
      title: "How do I sign up as a vendor on Sprin?",
      content:
        "Fill the form above and the vendor app will be sent to you through email. Create an account in minutes by entering your personal and business details and set up your restaurant with menu items and prices, opening and closing times, average preparation time, tags and pictures. After the details you submitted has been reviewed and verified by our restaurant team, you will be notified through email.",
    },
    {
      title: "How do I navigate the vendor app?",
      content:
        "On the vendor app, vendors can make adjustments to the account. Home-page: You can also view the total orders and amount you have gathered. Click on Orders to see pending orders. Vendors can either accept or reject them. Click on Menu to add menu items, fill in necessary details and the menu items would be successfully created. Profile: You can make changes such as opening and closing time, logo, cover photo and more.",
    },
    {
      title: "Who handles each delivery?",
      content:
        "The Sprin platform can connect you with independent drivers, bike and scooter riders, and walkers who deliver to your customers. Because of the network of delivery people using the Sprin platform, restaurants don’t have to keep their own delivery staff. But if you do have your own staff, we’re flexible—you can use them too. Reach out to sprinapp@gmail.com or directly to your Sprin contact to see if this option is now available in your city.",
    },
    {
      title: "What is the delivery radius?",
      content:
        "This varies from city to city. We can assess delivery coverage and your location to help define the right area for your restaurant. But the average delivery radius is 10 kilometers within your restaurant",
    },
    {
      title: "What is the payout plan for vendors",
      content:
        "Payouts are made to vendors when they request for payout on the vendor app for completed orders excluding Sprin’s commission rate",
    },
  ];

  const [restaurantName, setRestaurantName] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [deviceType, setDeviceType] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async () => {
    if (
      !restaurantName ||
      !email ||
      !firstName ||
      !lastName ||
      !phoneNumber ||
      !deviceType
    ) {
      setErrorMessage("All fields are required.");
      return;
    }

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/restaurant/vendor_application`,
        {
          restaurantName,
          firstName,
          lastName,
          email,
          phoneNumber,
          deviceType,
        },
        { withCredentials: true }
      );
      setSuccessMessage(response.data.message || "Request sent successfully");
      setRestaurantName("");
      setEmail("");
      setFirstName("");
      setLastName("");
      setPhoneNumber("");
      setDeviceType("");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className=" -mt-[70px]">
      <ScrollToTopOnMount />
      <div className="px-[3%] lg:px-[5%] xl:px-[15%] 2xl:px-[20%] pb-[220px] pt-[100px] lg:pt-[150px] overflow-hidden bg-orange-100">
        <div className="max-w-[1480px] mx-auto">
          <h4 className=" md:text-[40px]  text-[22px] font-[600] md:font-[700] leading-[30px] md:leading-[45px]  text-[#101828]   text-center lg:w-[800px] mx-auto tracking-tight mb-[32px]">
            Join Our Growing Network of Restaurants and Reach More Customers!
          </h4>
          <h4 className="text-primary font-[400]  text-[18px] leading-[30px] text-center max-w-[650px] mx-auto">
            Partner with us and bring your delicious dishes to new customers in
            your area! With our platform, your restaurant can increase
            visibility, reach new audiences, and boost sales—all with the
            convenience of our easy-to-use vendor app. Start delivering quality
            food to eager customers who can’t wait to try what you’re serving
            up.
          </h4>
        </div>
      </div>

      <div className="px-[3%] md: lg:px-[5%] xl:px-[15%] 2xl:px-[20%] ">
        <div className="md:max-w-[700px] mx-auto rounded-[8px] bg-white -mt-[170px]  shadow-lg px-[16px] py-[20px]">
          <h4 className=" md:text-[22px]  text-[18px] font-[500]  leading-[24px] md:leading-[45px]  text-[#101828]   text-start lg:w-[800px] mx-auto tracking-tight mb-[25px]">
            Get Started
          </h4>

          <div className="grid grid-cols-1 gap-[20px]">
            <div className="w-full">
              <h4 className=" text-[12px] font-[500]">
                Restaurant Name<span className="text-red-500">*</span>
              </h4>
              <input
                className="placeholder:text-[12px] lg:placeholder: text-[14px] py-[10px] px-[14px] rounded-[8px] border-[1px] border-gray-200  focus:outline-none focus:border-orange-300 focus:border-[1px] w-full mt-[8px]"
                placeholder="Enter restaurant name"
                type="text"
                name="restaurantName"
                value={restaurantName}
                onChange={(e) => setRestaurantName(e.target.value)}
              />
            </div>
            <div className="w-full">
              <h4 className=" text-[12px] font-[500]">
                Email Address <span className="text-red-500">*</span>
              </h4>
              <input
                className="placeholder:text-[12px] lg:placeholder: text-[14px] py-[10px] px-[14px] rounded-[8px] border-[1px] border-gray-200  focus:outline-none focus:border-orange-300 focus:border-[1px] w-full mt-[8px]"
                placeholder="johndoe@gmail.com"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex  space-x-[20px]">
              <div className="w-full">
                <h4 className=" text-[12px] font-[500]">
                  First Name <span className="text-red-500">*</span>
                </h4>
                <input
                  className="placeholder:text-[12px] lg:placeholder: text-[14px] py-[10px] px-[14px] rounded-[8px] border-[1px] border-gray-200  focus:outline-none focus:border-orange-300 focus:border-[1px] w-full mt-[8px]"
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
                  className="placeholder:text-[12px] lg:placeholder: text-[14px] py-[10px] px-[14px] rounded-[8px] border-[1px] border-gray-200  focus:outline-none focus:border-orange-300 focus:border-[1px] w-full mt-[8px]"
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
                Phone Number<span className="text-red-500">*</span>
              </h4>
              <input
                className="placeholder:text-[12px] lg:placeholder: text-[14px] py-[10px] px-[14px] rounded-[8px] border-[1px] border-gray-200  focus:outline-none focus:border-orange-300 focus:border-[1px] w-full mt-[8px]"
                placeholder="08012345678"
                type="tel"
                name="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <div className="w-full">
              <h4 className=" text-[12px] font-[500]">
                Mobile Device Type <span className="text-red-500">*</span>
              </h4>
              <select
                className="placeholder:text-[12px] lg:placeholder: text-[14px] py-[10px] px-[14px] rounded-[8px] border-[1px] border-gray-200 focus:outline-none focus:border-orange-300 focus:border-[1px] w-full mt-[8px]"
                value={deviceType}
                onChange={(e) => setDeviceType(e.target.value)}
              >
                <option value="" disabled>
                  Select device type
                </option>
                <option value="iOS">iOS</option>
                <option value="Android">Android</option>
              </select>
            </div>
          </div>

          {errorMessage && (
            <p className="text-red-600 text-center my-2">{errorMessage}</p>
          )}
          {successMessage && (
            <p className="text-green-600 text-center my-2">{successMessage}</p>
          )}
          <button
            className={` text-[12px] text-white bg-primary hover:bg-orange-600 px-[14px] py-[12px] rounded-[8px] font-[500] md:mt-[30px] mt-[30px] w-full ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Sending..." : "Submit"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 xl:gap-[80px] md:gap-[50px] gap-[15px] py-[50px] md:py-[80px] px-[3%] lg:px-[5%] xl:px-[15%] 2xl:px-[20%]">
        <div className="flex flex-col">
          <BsPeopleFill className="mx-auto text-[30px] text-primary" />
          <h4 className="mt-[12px]  text-[18px] xl:text-[30px] lg:text-[22px] font-[600] text-center">
            Expand Your Customer Base
          </h4>
          <h4 className="mt-auto  text-[12px] lg:text-[16px] text-center md:leading-[25px] pt-[10px] font-[400]">
            Tap into a vast pool of potential customers who are actively
            searching for great food delivered to their doorsteps. By partnering
            with us, your restaurant will be visible to customers eager to
            order.
          </h4>
        </div>

        <div className="flex flex-col">
          <IoBagCheck className="mx-auto text-[30px] text-primary" />
          <h4 className="mt-[12px]  text-[18px] xl:text-[30px] lg:text-[22px] font-[600] text-center">
            Boost Sales & Increase Revenue
          </h4>
          <h4 className="mt-auto  text-[12px] lg:text-[16px] text-center md:leading-[25px] pt-[10px] font-[400]">
            Our platform is designed to increase your order volume and help grow
            your business. With access to new audiences and targeted promotions,
            you can maximize your revenue while providing customers with a
            convenient way to enjoy your dishes.
          </h4>
        </div>

        <div className="flex flex-col">
          <MdAccessTimeFilled className="mx-auto text-[30px] text-primary" />
          <h4 className="mt-[12px]  text-[18px] xl:text-[30px] lg:text-[22px] font-[600] text-center">
            Easy-to-Use Dashboard
          </h4>
          <h4 className="mt-auto  text-[12px] lg:text-[16px] text-center md:leading-[25px] pt-[10px] font-[400]">
            Manage your orders, update your menu, track sales, and monitor your
            business's performance all from one dashboard. Our user-friendly
            tools make it simple for you to stay on top of your restaurant’s
            operations, even on the busiest days.
          </h4>
        </div>
      </div>

      <div className="px-[3%] lg:px-[5%] xl:px-[7%]   overflow-hidden bg-[#F6F5F2]">
        <div className="max-w-[1480px] mx-auto h-[600px] flex items-center justify-center relative">
          <div className=" flex flex-col justify-center items-center space-y-[24px] lg:w-[625px] z-20">
            <h4 className="text-[36px] font-[700] leading-[44px] tracking-tight text-text text-center">
              How the Sprin Vendor app works
            </h4>
            <h4 className=" text-[16px] font-[500] leading-[28px] text-[#56575C] text-center">
              Joining our network is easy and straightforward. Here’s how it
              works.
            </h4>
          </div>
          <div className="absolute top-[80px] left-[30%] md:left-[10%]">
            <img
              className="md:w-[80px] md:h-[80px] w-[58px] h-[58px] rounded-full object-cover"
              src={chef}
            />
          </div>
          <div className="absolute top-[95px] right-[25%] ">
            <img
              className="md:w-[80px] md:h-[80px] w-[58px] h-[58px] rounded-full object-cover"
              src={chef2}
            />
          </div>
          <div className="absolute md:bottom-[120px] bottom-[50px] md:left-[25%] left-[0px]">
            <img
              className="md:w-[80px] md:h-[80px] w-[58px] h-[58px] rounded-full object-cover"
              src={chef3}
            />
          </div>
          <div className="absolute bottom-[70px] transform -translate-x-1/2 left-1/2 ">
            <img
              className="md:w-[80px] md:h-[80px] w-[58px] h-[58px] rounded-full object-cover"
              src={chef4}
            />
          </div>
          <div className="absolute bottom-[40px] md:bottom-[150px] md:right-[15%] right-[5%]">
            <img
              className="md:w-[80px] md:h-[80px] w-[58px] h-[58px] rounded-full object-cover"
              src={chef5}
            />
          </div>
          <div className="flex justify-center items-center w-[48px] h-[48px] rounded-full bg-white absolute top-[130px] left-[40%] ">
            <img className="w-[24px]" src={hire1} />
          </div>
          <div className="flex justify-center items-center w-[48px] h-[48px] rounded-full bg-white absolute top-[280px] left-[10%] ">
            <img className="w-[24px]" src={hire3} />
          </div>
          <div className="flex justify-center items-center w-[48px] h-[48px] rounded-full bg-white absolute top-[120px] right-[15%] ">
            <img className="w-[24px]" src={hire2} />
          </div>
          <div className="flex justify-center items-center w-[48px] h-[48px] rounded-full bg-white absolute bottom-[30px] right-[19%] ">
            <img className="w-[24px]" src={hire4} />
          </div>
        </div>
      </div>

      <div className="px-[3%] lg:px-[5%] xl:px-[15%] 2xl:px-[20%]  py-[16px] lg:py-[24px] overflow-hidden bg-secondary">
        <div className="max-w-[1480px] mx-auto">
          <ol className="list-decimal list-inside flex justify-between space-x-[40px] items-center px-[3%] lg:px-[0px] overflow-x-auto scrollbar-none">
            <li
              className={` text-[14px] xl:text-[22px] 2xl:text-[18px] font-[700] whitespace-nowrap hover:cursor-pointer ${
                activeSection === "request" ? "text-primary" : "text-[#F2F2F2]"
              }`}
              onClick={() => handleSectionClick("request")}
            >
              Easy Sign-Up and Verification
            </li>
            <li
              className={` text-[14px] xl:text-[22px] 2xl:text-[18px] font-[700] whitespace-nowrap hover:cursor-pointer ${
                activeSection === "shortlist"
                  ? "text-primary"
                  : "text-[#F2F2F2]"
              }`}
              onClick={() => handleSectionClick("shortlist")}
            >
              Build Your Menu
            </li>
            <li
              className={` text-[14px] xl:text-[22px] 2xl:text-[18px] font-[700] whitespace-nowrap hover:cursor-pointer ${
                activeSection === "interview"
                  ? "text-primary"
                  : "text-[#F2F2F2]"
              }`}
              onClick={() => handleSectionClick("interview")}
            >
              Receive and Manage Orders Instantly
            </li>
            <li
              className={` text-[14px] xl:text-[22px] 2xl:text-[18px] font-[700] whitespace-nowrap hover:cursor-pointer ${
                activeSection === "choose" ? "text-primary" : "text-[#F2F2F2]"
              }`}
              onClick={() => handleSectionClick("choose")}
            >
              Monitor Sales and Performance
            </li>
            <li
              className={` text-[14px] xl:text-[22px] 2xl:text-[18px] font-[700] whitespace-nowrap hover:cursor-pointer ${
                activeSection === "earnings" ? "text-primary" : "text-[#F2F2F2]"
              }`}
              onClick={() => handleSectionClick("earnings")}
            >
              View Earnings in Real-Time
            </li>
            <li
              className={` text-[14px] xl:text-[22px] 2xl:text-[18px] font-[700] whitespace-nowrap hover:cursor-pointer ${
                activeSection === "access" ? "text-primary" : "text-[#F2F2F2]"
              }`}
              onClick={() => handleSectionClick("access")}
            >
              Access Support Anytime
            </li>
          </ol>
        </div>
      </div>

      <div className="px-[3%] lg:px-[5%] xl:px-[15%] 2xl:px-[20%]  xl:py-[30px] py-[20px] overflow-hidden">
        <div className="max-w-[1480px] mx-auto grid grid-cols-1 md:gap-[80px] gap-[60px]">
          <div
            id="request"
            className={`section ${
              activeSection === "request" ? "block" : "hidden"
            }  overflow-hidden`}
          >
            <div className=" grid grid-cols-1 md:grid-cols-2 items-center gap-x-[20%] gap-y-[40px]">
              <div className="grid grid-cols-1 gap-[16px] md:gap-[24px] h-fit lg:w-[476px]">
                <h4 className="md:text-[16px]  text-[14px] font-[400] leading-[28px] text-[#9EA0A3]">
                  The registration process is quick and straightforward,
                  requiring basic business details and documentation for
                  verification. Once approved, you’re ready to set up your
                  restaurant profile.
                </h4>
              </div>
              <div>
                <img src={chefpage3} />
              </div>
            </div>
          </div>
          <div
            id="shortlist"
            className={`section ${
              activeSection === "shortlist" ? "block" : "hidden"
            }  overflow-hidden`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-x-[20%] gap-y-[40px]">
              <div className="grid grid-cols-1 gap-[16px] md:gap-[24px] h-fit lg:w-[476px] md:order-2">
                <h4 className="md:text-[16px]  text-[14px] font-[400] leading-[28px] text-[#9EA0A3]">
                  Use the intuitive menu setup to add all your restaurant’s
                  offerings with item descriptions, prices, and attractive
                  photos. Organize items into categories, highlight popular
                  dishes, and make changes instantly as you introduce new
                  specials or seasonal items.
                </h4>
              </div>
              <div className="md:order-1">
                <img src={chefpage2} />
              </div>
            </div>
          </div>
          <div
            id="interview"
            className={`section ${
              activeSection === "interview" ? "block" : "hidden"
            }  overflow-hidden`}
          >
            <div className=" grid grid-cols-1 md:grid-cols-2 items-center gap-x-[20%] gap-y-[40px]">
              <div className="grid grid-cols-1 gap-[16px] md:gap-[24px] h-fit lg:w-[476px]">
                <h4 className="md:text-[16px]  text-[14px] font-[400] leading-[28px] text-[#9EA0A3]">
                  When an order comes in, you’ll receive a notification with all
                  the details, including any special instructions. The app lets
                  you view orders in real-time, mark them as “In Progress,” and
                  update customers when their order is ready for pickup or
                  delivery.
                </h4>
              </div>
              <div>
                <img src={chefpage4} />
              </div>
            </div>
          </div>
          <div
            id="choose"
            className={`section ${
              activeSection === "choose" ? "block" : "hidden"
            }  overflow-hidden`}
          >
            <div className=" grid grid-cols-1 md:grid-cols-2 items-center gap-x-[20%] gap-y-[40px]">
              <div className="grid grid-cols-1 gap-[16px] md:gap-[24px] h-fit lg:w-[476px] md:order-2">
                <h4 className="md:text-[16px]  text-[14px] font-[400] leading-[28px] text-[#9EA0A3]">
                  Access valuable insights on your sales performance and
                  customer feedback. The app provides analytics to help you
                  understand order trends, peak hours, and customer preferences,
                  so you can make data-driven improvements.
                </h4>
              </div>
              <div className="md:order-1">
                <img src={chefpage1} />
              </div>
            </div>
          </div>

          <div
            id="earnings"
            className={`section ${
              activeSection === "earnings" ? "block" : "hidden"
            }  overflow-hidden`}
          >
            <div className=" grid grid-cols-1 md:grid-cols-2 items-center gap-x-[20%] gap-y-[40px]">
              <div className="grid grid-cols-1 gap-[16px] md:gap-[24px] h-fit lg:w-[476px]">
                <h4 className="md:text-[16px]  text-[14px] font-[400] leading-[28px] text-[#9EA0A3]">
                  Stay up-to-date on your earnings as each order is completed.
                  The app shows a detailed earnings breakdown, allowing you to
                  track income by day, week, or month, and stay on top of your
                  financials with ease.
                </h4>
              </div>
              <div>
                <img src={chefpage6} />
              </div>
            </div>
          </div>

          <div
            id="access"
            className={`section ${
              activeSection === "access" ? "block" : "hidden"
            }  overflow-hidden`}
          >
            <div className=" grid grid-cols-1 md:grid-cols-2 items-center gap-x-[20%] gap-y-[40px]">
              <div className="grid grid-cols-1 gap-[16px] md:gap-[24px] h-fit lg:w-[476px] md:order-2">
                <h4 className="md:text-[16px]  text-[14px] font-[400] leading-[28px] text-[#9EA0A3]">
                  Need help? The vendor app has a support chefpage that connects
                  you with assistance for technical issues, order inquiries, or
                  general questions. Our support team is dedicated to helping
                  your business run smoothly.
                </h4>
              </div>
              <div className="md:order-1">
                <img src={chefpage5} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-[50px] md:py-[80px] px-[3%] lg:px-[5%] xl:px-[15%] 2xl:px-[20%] bg-orange-100">
        <h4 className=" md:text-[40px] text-[30px] font-[600] md:font-[700] leading-[24px] md:leading-[45px]  text-[#101828]   text-center lg:w-[800px] mx-auto tracking-tight mb-[32px]">
          Requirements
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 xl:gap-[80px] md:gap-[50px] gap-[15px] ">
          <div className="flex flex-col">
            <div className="w-[40px] h-[40px] rounded-full flex justify-center items-center  text-[16px] text-white font-[500] bg-primary mx-auto">
              1
            </div>
            <h4 className="mt-[12px]  text-[18px] xl:text-[30px] lg:text-[22px] font-[600] text-center">
              Smart Device
            </h4>
            <h4 className="  text-[12px] lg:text-[16px] text-center md:leading-[25px] pt-[10px] font-[400]">
              A smartphone compatible with the vendor app to manage orders and
              notifications.
            </h4>
          </div>

          <div className="flex flex-col">
            <div className="w-[40px] h-[40px] rounded-full flex justify-center items-center  text-[16px] text-white font-[500] bg-primary mx-auto">
              2
            </div>
            <h4 className="mt-[12px]  text-[18px] xl:text-[30px] lg:text-[22px] font-[600] text-center">
              Business Registration Document
            </h4>
            <h4 className="  text-[12px] lg:text-[16px] text-center md:leading-[25px] pt-[10px] font-[400]">
              Proof of official business registration (such as a business
              license or certificate of incorporation).
            </h4>
          </div>

          <div className="flex flex-col">
            <div className="w-[40px] h-[40px] rounded-full flex justify-center items-center  text-[16px] text-white font-[500] bg-primary mx-auto">
              3
            </div>
            <h4 className="mt-[12px]  text-[18px] xl:text-[30px] lg:text-[22px] font-[600] text-center">
              Food Packaging Supplies
            </h4>
            <h4 className="  text-[12px] lg:text-[16px] text-center md:leading-[25px] pt-[10px] font-[400]">
              Food-safe packaging, containers, and utensils that maintain food
              quality during transit.
            </h4>
          </div>
        </div>
      </div>

      <div className="px-[3%] lg:px-[5%] xl:px-[15%] 2xl:px-[20%] xl:py-[120px] py-[80px] ">
        <div className="max-w-[1480px] mx-auto ">
          <h4 className="text-[30px] leading-[34px] md:text-[40px] font-[600] md:leading-[50px] text-center ">
            Frequently Asked Questions
          </h4>
          <div className=" mt-[24px] xl:w-[1000px] mx-auto">
            {Dropdown.map((drop, i) => (
              <div key={i} className="border-b-[1px] border-[#E6E7E8]">
                <div
                  onClick={handleClick(i)}
                  className="py-[16px] flex justify-between items-center "
                >
                  <h4 className=" text-[14px] lg:text-[22px] cursor-pointer font-[600]">
                    {drop.title}
                  </h4>
                  <div
                    onClick={handleClick(i)}
                    className={`text-[12px] duration-300 cursor-pointer ${
                      clickedIndex[i] ? "rotate-180" : "rotate-0"
                    } `}
                  >
                    <FiChevronDown className="text-[28px]" />
                  </div>
                </div>
                {clickedIndex[i] ? (
                  <h4 className=" text-[12px] lg:text-[14px] py-[20px] pr-[38px] font-light -mt-[20px] mb-[28px]">
                    {drop.content}
                  </h4>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vendor;
