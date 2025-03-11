import React, { useState } from "react";
import axios from "axios";
import riderpage1 from "../assets/riderpage1.png";
import riderpage2 from "../assets/riderpage2.png";
import riderpage3 from "../assets/riderpage3.png";
import riderpage4 from "../assets/riderpage4.png";
import rider from "../assets/rider1.jpg";
import rider2 from "../assets/rider2.jpg";
import rider8 from "../assets/rider8.jpg";
import rider4 from "../assets/rider4.jpg";
import rider5 from "../assets/rider5.jpg";
import hire1 from "../assets/hire1.png";
import hire2 from "../assets/hire2.png";
import hire3 from "../assets/hire3.png";
import hire4 from "../assets/hire4.png";
import { FiChevronDown } from "react-icons/fi";
import { MdAccessTimeFilled } from "react-icons/md";
import { BsPeopleFill } from "react-icons/bs";
import { IoBagCheck } from "react-icons/io5";
import ScrollToTopOnMount from "../components/ScrollToTopOnMount";

const Rider = () => {
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
      title: "How does delivering with Sprin app work?",
      content:
        "People order food and other goods through Sprin. When customers place an order, we offer the deliveries or tasks to riders, who earn money by picking up and delivering them.",
    },
    {
      title: "How long does it take to start working with Sprin?",
      content:
        "Our signup process takes just a few minutes, and most riders can start earning within days.",
    },
    {
      title: "What materials do I need to be a Sprin rider?",
      content:
        "To earn money, all you need is a smartphone and a mode of transportation, such as a car, bike, scooter, or motorcycle. We'll take care of everything else!",
    },
    {
      title: "How do I check the status of my Sprin signup?",
      content:
        "After a successful signup on the Sprin rider app, try to login after 24 hours and you will be able to see your verification status (accepted, pending or rejected), You will receive an email from us within 24 hours of being accepted",
    },
    {
      title: "What is the benefit of being a Sprin rider?",
      content:
        "You're the boss. As an independent contractor, you have the freedom to deliver when it works for your schedule. You are in control of how many hours you want to deliver per day or per week. It's a great alternative to seasonal, temporary, and part-time work.",
    },
    {
      title: "Do I need any experience to be a Sprin rider?",
      content:
        "Nope! You don't need any prior work experience. But if you do have previous experience in the rideshare, food, or courier service industries, delivering with Sprin is a great way to earn money. We welcome bikers from other gig economy or commercial services such as UberEats, Chowdeck, Glovo, Uber, and Bolt. Riders come from all backgrounds and industries, and include catering drivers, truck drivers, and taxi drivers.",
    },
    {
      title: "What's a delivery like?",
      content: `
    Once you receive a delivery or task opportunity, you'll see where it is and what you'll make, and can choose to accept or reject it. Once you accept, there are generally three steps, all of which are clearly outlined in the Driver app:
    
    1. Drive to the restaurant
    2. Pick up the food
    3. Drive to the customer to drop off the food
    `,
    },
    {
      title: "How do I get paid?",
      content: `
    Our payment cycle runs from Monday 00:00 to the following Sunday at 23:59. You can request for payout anytime if you’re due, we'll send it to you — no need to wait until the end of the month.
    `,
    },
    {
      title: "How much does a delivery rider earn with Sprin?",
      content: `
   Your income depends on your performance and the number of deliveries you make. You can also earn more during busy hours, with tips, and by taking part in campaigns.
    `,
    },
    {
      title: "How can I find out how much I earned?",
      content: `
   You can keep track of your earnings inside the Sprin rider app. Just go to the Main menu and tap the ‘Wallet’ tab. You’ll find all the details about how much you made.
    `,
    },
  ];

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [deviceType, setDeviceType] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async () => {
    if (!email || !firstName || !lastName || !phoneNumber || !deviceType) {
      setErrorMessage("All fields are required.");
      return;
    }

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/rider/rider_application`,
        {
          firstName,
          lastName,
          email,
          phoneNumber,
          deviceType,
        },
        { withCredentials: true }
      );
      setSuccessMessage(response.data.message || "Request sent successfully");
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
    <div className=" -mt-[70px] ">
      <ScrollToTopOnMount />
      <div className="px-[3%] lg:px-[5%] xl:px-[15%] 2xl:px-[20%] pb-[220px] pt-[100px] lg:pt-[150px] overflow-hidden bg-orange-100">
        <div className="max-w-[1480px] mx-auto">
          <h4 className=" md:text-[40px] text-[30px] font-[600] md:font-[700] leading-[24px] md:leading-[45px]  text-[#101828]   text-center lg:w-[800px] mx-auto tracking-tight mb-[32px]">
            Make money delivering orders
          </h4>
          <h4 className="text-primary font-[400]  text-[18px] leading-[30px] text-center ">
            Deliver with Sprin and get more opportunities to earn.
          </h4>
        </div>
      </div>

      <div className="px-[3%] lg:px-[5%] xl:px-[15%] 2xl:px-[20%] ">
        <div className="md:max-w-[700px] mx-auto rounded-[8px] bg-white -mt-[170px]  shadow-lg px-[16px] py-[20px]">
          <h4 className=" md: text-[22px]  text-[18px] font-[500]  leading-[24px] md:leading-[45px]  text-[#101828]   text-start lg:w-[800px] mx-auto tracking-tight mb-[25px]">
            Get Started
          </h4>

          <div className="grid grid-cols-1 gap-[20px]">
            <div className="w-full">
              <h4 className=" text-[12px] font-[500]">
                Email Address <span className="text-red-500">*</span>
              </h4>
              <input
                className="placeholder: text-[12px] lg:placeholder: text-[14px] py-[10px] px-[14px] rounded-[8px] border-[1px] border-gray-200  focus:outline-none focus:border-orange-300 focus:border-[1px] w-full mt-[8px]"
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
                  className="placeholder: text-[12px] lg:placeholder: text-[14px] py-[10px] px-[14px] rounded-[8px] border-[1px] border-gray-200  focus:outline-none focus:border-orange-300 focus:border-[1px] w-full mt-[8px]"
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
                  className="placeholder: text-[12px] lg:placeholder: text-[14px] py-[10px] px-[14px] rounded-[8px] border-[1px] border-gray-200  focus:outline-none focus:border-orange-300 focus:border-[1px] w-full mt-[8px]"
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
                className="placeholder: text-[12px] lg:placeholder: text-[14px] py-[10px] px-[14px] rounded-[8px] border-[1px] border-gray-200  focus:outline-none focus:border-orange-300 focus:border-[1px] w-full mt-[8px]"
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
                className="placeholder: text-[12px] lg:placeholder: text-[14px] py-[10px] px-[14px] rounded-[8px] border-[1px] border-gray-200 focus:outline-none focus:border-orange-300 focus:border-[1px] w-full mt-[8px]"
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
          <h4 className="mt-[12px]  text-[18px] xl:text-[30px] lg: text-[22px] font-[600] text-center">
            Work when you want
          </h4>
          <h4 className="mt-auto  text-[12px] lg: text-[16px] text-center md:leading-[25px] pt-[10px] font-[400]">
            You decide when, where, and how much you work. Work on your schedule
            and forget about reporting to an office — or a boss.
          </h4>
        </div>

        <div className="flex flex-col">
          <IoBagCheck className="mx-auto text-[30px] text-primary" />
          <h4 className="mt-[12px]  text-[18px] xl:text-[30px] lg: text-[22px] font-[600] text-center">
            Set your own course
          </h4>
          <h4 className="mt-auto  text-[12px] lg: text-[16px] text-center md:leading-[25px] pt-[10px] font-[400]">
            Choose whether or not to accept offers, find demand near you, and
            earn more instantly with promotions like Challenges and Peak Pay in
            the Sprin app.
          </h4>
        </div>

        <div className="flex flex-col">
          <MdAccessTimeFilled className="mx-auto text-[30px] text-primary" />
          <h4 className="mt-[12px]  text-[18px] xl:text-[30px] lg: text-[22px] font-[600] text-center">
            Start earning quickly
          </h4>
          <h4 className="mt-auto  text-[12px] lg: text-[16px] text-center md:leading-[25px] pt-[10px] font-[400]">
            Sign up in minutes and start earning within days. Once your
            application is approved, you can start delivering right away and
            cash out instantly*.
          </h4>
        </div>
      </div>

      <div className="px-[3%] lg:px-[5%] xl:px-[7%]   overflow-hidden bg-[#F6F5F2]">
        <div className="max-w-[1480px] mx-auto h-[600px] flex items-center justify-center relative">
          <div className=" flex flex-col justify-center items-center space-y-[24px] lg:w-[625px] z-20">
            <h4 className="text-[36px] font-[700] leading-[44px] tracking-tight text-text text-center">
              How the Sprin Rider app works
            </h4>
            <h4 className=" text-[16px] font-[500] leading-[28px] text-[#56575C] text-center">
              Our app is designed to help riders receive, deliver and manage
              orders easily and effectively.
            </h4>
          </div>
          <div className="absolute top-[80px] left-[30%] md:left-[10%]">
            <img
              className="md:w-[80px] md:h-[80px] w-[58px] h-[58px] rounded-full object-cover"
              src={rider}
            />
          </div>
          <div className="absolute top-[95px] right-[25%]">
            <img
              className="md:w-[80px] md:h-[80px] w-[58px] h-[58px] rounded-full object-cover"
              src={rider2}
            />
          </div>
          <div className="absolute md:bottom-[120px] bottom-[50px] md:left-[25%] left-[0px]">
            <img
              className="md:w-[80px] md:h-[80px] w-[58px] h-[58px] rounded-full object-cover"
              src={rider8}
            />
          </div>
          <div className="absolute bottom-[70px] transform -translate-x-1/2 left-1/2">
            <img
              className="md:w-[80px] md:h-[80px] w-[58px] h-[58px] rounded-full object-cover"
              src={rider4}
            />
          </div>
          <div className="absolute bottom-[40px] md:bottom-[150px] md:right-[15%] right-[5%]">
            <img
              className="md:w-[80px] md:h-[80px] w-[58px] h-[58px] rounded-full object-cover"
              src={rider5}
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
              className={` text-[14px] xl: text-[22px] 2xl: text-[18px] font-[700] whitespace-nowrap hover:cursor-pointer ${
                activeSection === "request" ? "text-primary" : "text-[#F2F2F2]"
              }`}
              onClick={() => handleSectionClick("request")}
            >
              Receive orders
            </li>
            <li
              className={` text-[14px] xl: text-[22px] 2xl: text-[18px] font-[700] whitespace-nowrap hover:cursor-pointer ${
                activeSection === "shortlist"
                  ? "text-primary"
                  : "text-[#F2F2F2]"
              }`}
              onClick={() => handleSectionClick("shortlist")}
            >
              Pick up the order
            </li>
            <li
              className={` text-[14px] xl: text-[22px] 2xl: text-[18px] font-[700] whitespace-nowrap hover:cursor-pointer ${
                activeSection === "interview"
                  ? "text-primary"
                  : "text-[#F2F2F2]"
              }`}
              onClick={() => handleSectionClick("interview")}
            >
              Deliver
            </li>
            <li
              className={` text-[14px] xl: text-[22px] 2xl: text-[18px] font-[700] whitespace-nowrap hover:cursor-pointer ${
                activeSection === "choose" ? "text-primary" : "text-[#F2F2F2]"
              }`}
              onClick={() => handleSectionClick("choose")}
            >
              Track your earnings
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
                <h4 className="text-[30px] font-[700] leading-[44px] tracking-tight text-text">
                  Manage Incoming Orders
                </h4>
                <h4 className="md: text-[16px]  text-[14px] font-[400] leading-[28px] text-[#9EA0A3]">
                  Stay alerted to new orders as they come in. Review each
                  order’s details carefully, including items and specific
                  customer instructions, so you’re ready to start your delivery
                  with all the necessary information.
                </h4>
              </div>
              <div>
                <img src={riderpage3} />
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
                <h4 className="text-[30px] font-[700] leading-[44px] tracking-tight text-text">
                  Collect the Order
                </h4>
                <h4 className="md: text-[16px]  text-[14px] font-[400] leading-[28px] text-[#9EA0A3]">
                  Once assigned an order, head to the restaurant or store to
                  pick it up. You’ll have clear pickup details and directions,
                  ensuring a smooth handoff to keep the process quick and
                  efficient.
                </h4>
              </div>
              <div className="md:order-1">
                <img src={riderpage2} />
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
                <h4 className="text-[30px] font-[700] leading-[44px] tracking-tight text-text">
                  Complete the Delivery
                </h4>
                <h4 className="md: text-[16px]  text-[14px] font-[400] leading-[28px] text-[#9EA0A3]">
                  After collecting the order, proceed to the delivery location
                  promptly and safely. With navigation support and accurate
                  customer information, you’ll be equipped to complete
                  deliveries seamlessly, meeting customer expectations every
                  time.
                </h4>
              </div>
              <div>
                <img src={riderpage1} />
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
                <h4 className="text-[30px] font-[700] leading-[44px] tracking-tight text-text">
                  Monitor Your Earnings
                </h4>
                <h4 className="md: text-[16px]  text-[14px] font-[400] leading-[28px] text-[#9EA0A3]">
                  Track your earnings and delivery progress in real-time. The
                  earnings dashboard lets you easily review completed orders and
                  income, keeping you informed about your accomplishments as you
                  work.
                </h4>
              </div>
              <div className="md:order-1">
                <img src={riderpage4} />
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
            <h4 className="mt-[12px]  text-[18px] xl:text-[30px] lg: text-[22px] font-[600] text-center">
              Age Requirement
            </h4>
            <h4 className="  text-[12px] lg: text-[16px] text-center md:leading-[25px] pt-[10px] font-[400]">
              To become a Sprin rider, applicants must be at least 18 years old.
              This age threshold ensures that riders are mature enough to handle
              the responsibilities of delivery work.
            </h4>
          </div>

          <div className="flex flex-col">
            <div className="w-[40px] h-[40px] rounded-full flex justify-center items-center  text-[16px] text-white font-[500] bg-primary mx-auto">
              2
            </div>
            <h4 className="mt-[12px]  text-[18px] xl:text-[30px] lg: text-[22px] font-[600] text-center">
              Vehicle Options
            </h4>
            <h4 className="  text-[12px] lg: text-[16px] text-center md:leading-[25px] pt-[10px] font-[400]">
              Sprin riders have flexible transportation options based on the
              city in which they operate. You can deliver using any car,
              scooter, motorcycle or, in certain cities, a bicycle. This range
              of vehicle choices allows riders to select the most convenient and
              cost-effective mode of transportation suited to their location and
              personal preferences, making it easier to start delivering.
            </h4>
          </div>

          <div className="flex flex-col">
            <div className="w-[40px] h-[40px] rounded-full flex justify-center items-center  text-[16px] text-white font-[500] bg-primary mx-auto">
              3
            </div>
            <h4 className="mt-[12px]  text-[18px] xl:text-[30px] lg: text-[22px] font-[600] text-center">
              Required Documentation
            </h4>
            <h4 className="  text-[12px] lg: text-[16px] text-center md:leading-[25px] pt-[10px] font-[400]">
              To complete the application, riders must provide a valid form of
              identification (national ID, voters card or driver’s license).
              This documentation helps ensure that all riders meet safety and
              eligibility standards for the role.
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
                  <h4 className=" text-[14px] lg: text-[22px] cursor-pointer font-[600]">
                    {drop.title}
                  </h4>
                  <div
                    onClick={handleClick(i)}
                    className={`text-sm duration-300 cursor-pointer ${
                      clickedIndex[i] ? "rotate-180" : "rotate-0"
                    } `}
                  >
                    <FiChevronDown className="text-[28px]" />
                  </div>
                </div>
                {clickedIndex[i] ? (
                  <h4 className=" text-[12px] lg: text-[14px] py-[20px] pr-[38px] font-light -mt-[20px] mb-[28px]">
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

export default Rider;
