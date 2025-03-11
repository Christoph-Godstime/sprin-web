import React, { useEffect, useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import pointdown from "../assets/pointdown.gif";
import { RiArrowRightLine } from "react-icons/ri";
import chef from "../assets/chef.png";
import playstore from "../assets/playstore.webp";
import applestore from "../assets/applestore.png";
import { HiArrowNarrowRight } from "react-icons/hi";
import ScrollToTopOnMount from "../components/ScrollToTopOnMount";
import hero from "../assets/hero.png";
import rider from "../assets/rider.webp";
import Slides from "../components/Slides";
import { NavLink } from "react-router-dom";

const Home = () => {
  const [currentImage, setCurrentImage] = useState(1);
  const [backgroundColor, setBackgroundColor] = useState("#f97316");
  const [accountType, setAccountType] = useState("Customer");
  const [headline, setHeadline] = useState("Explore the App");
  const [headline2, setHeadline2] = useState(
    "Get your favorite meals delivered to your doorstep in minutes from an extensive selection of restaurants, featuring everything from African to Continental cuisines to fulfill your culinary desires."
  );

  useEffect(() => {
    let headlineIndex = 0;
    let headline2Index = 0;
    let backgroundIndex = 0;
    let accountTypeIndex = 0;
    const headlines = [
      "Explore the App",
      "All in One Solution",
      "Be a Champion",
    ];
    const headlines2 = [
      "Get your favorite meals delivered to your doorstep in minutes from an extensive selection of restaurants, featuring everything from African to Continental cuisines to fulfill your culinary desires.",
      "Experience new heights of growth with effortless management of menus and orders, coordination across multiple branches and teams, simple payout withdrawals, and much more.",
      "Set your own schedule, select your preferred bike, monitor your performance metrics, secure bonuses, and enjoy straightforward withdrawals to your account. Achieve more with our app.",
    ];
    const backgrounds = ["#f97316", "#1e1b4b", "#E5E5E5"];
    const accountTypes = ["Customer", "Vendors", "Riders"];

    const interval = setInterval(() => {
      headlineIndex = (headlineIndex + 1) % headlines.length;
      headline2Index = (headline2Index + 1) % headlines2.length;
      backgroundIndex = (backgroundIndex + 1) % backgrounds.length;
      accountTypeIndex = (accountTypeIndex + 1) % accountTypes.length;

      setHeadline(headlines[headlineIndex]);
      setHeadline2(headlines2[headline2Index]);
      setBackgroundColor(backgrounds[backgroundIndex]);
      setAccountType(accountTypes[accountTypeIndex]);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage >= 5 ? 1 : prevImage + 1));
    }, 3000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const getImageUrl = () => {
    switch (currentImage) {
      case 1:
        return "https://cdn.pixabay.com/photo/2016/12/26/17/28/spaghetti-1932466_1280.jpg";
      case 2:
        return "https://cdn.pixabay.com/photo/2017/07/16/11/57/fried-2509089_1280.jpg";
      case 3:
        return "https://cdn.pixabay.com/photo/2019/10/10/07/16/pizza-4538925_1280.jpg";
      case 4:
        return "https://cdn.pixabay.com/photo/2020/02/19/05/10/doodle-4861309_1280.jpg";
      case 5:
        return "https://cdn.pixabay.com/photo/2016/02/16/07/39/pizza-1202775_1280.jpg";
      default:
        return "";
    }
  };

  return (
    <div className="  ">
      <ScrollToTopOnMount />
      {/* <div
        className={`bg-no-repeat z-10 w-full bg-cover bg-center h-full pt-[100px] pb-[200px] md:py-[150px] lg:py-[180px] 2xl:py-[300px] px-[3%] lg:px-[5%] xl:px-[15%] 2xl:px-[20%] relative `}
        style={{
          backgroundImage: `url(${getImageUrl()})`,
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="">
          <div className="flex justify-center">
            <h4 className="text-white  text-[22px]  lg:text-[40px] font-[600]  text-center md:w-[60%] bg-secondary p-[20px] rounded-full px-[15px]">
              Discover restaurants and more near you.
            </h4>
          </div>
          <div className="mx-auto mt-[30px] relative w-full sm:w-[400px]">
            <IoLocationOutline className="absolute top-1/2 transform -translate-y-1/2 left-[14px]  text-[18px]" />
            <input
              className="bg-white rounded-full w-full sm:w-[400px] py-[14px] px-[40px] focus:outline-none  focus:border-orange-500  focus:border-2 placeholder:text-gray-800 placeholder: text-[10px]  text-[10px]"
              placeholder="Enter delivery address"
            />
            <button className="flex justify-center items-center absolute bg-primary hover:bg-orange-600 w-[35px] h-[35px] rounded-full right-[8px] top-1/2 transform -translate-y-1/2">
              <RiArrowRightLine className="text-white  text-[18px]" />
            </button>
          </div>
          <div className="flex justify-center">
            <h4 className="text-white font-[500]  mt-[40px]  text-[14px] text-semibold lg:text-[22px] text-center tracking-[1px] md:w-[70%] bg-primary p-[20px] rounded-full ">
              At Sprin, our passion lies in crafting inventive solutions for
              food delivery that have the potential to influence the future of
              our world.
            </h4>
          </div>
        </div>

        <div className="absolute xl:bottom-[10px] md:-bottom-[15px] bottom-[20px]  left-1/2 transform -translate-x-1/2 ">
          <div className="text-white  text-[10px] lg:text-[14px]  text-center bg-secondary w-[100px] lg:w-[120px] h-[40px] flex justify-center items-center mx-auto">
            Keep scrolling
          </div>
          <img className="w-[250px]" src={pointdown} />
        </div>
      </div> */}

      <div
        className={`bg-no-repeat z-10 -mt-[70px] w-full bg-cover bg-center h-screen  relative flex justify-center items-center`}
        style={{
          backgroundImage: `url(${hero})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
          backdropFilter: "",
        }}
      >
        <div className="px-[3%] lg:px-[0px]">
          <div className="flex justify-center">
            <h4 className="text-white  text-[22px]  lg:text-[40px] font-[600]  text-center md:w-[60%] bg-secondary p-[20px] rounded-full px-[15px]">
              Discover restaurants and more near you.
            </h4>
          </div>

          <div className="flex justify-center">
            <h4 className="text-white font-[500]  mt-[40px]  text-[14px] text-semibold lg:text-[22px] text-center tracking-[1px] md:w-[70%] bg-primary p-[20px] rounded-full ">
              At Sprin, our passion lies in crafting inventive solutions for
              food delivery that have the potential to influence the future of
              our world.
            </h4>
          </div>
        </div>
        <div className="absolute xl:bottom-[10px] md:-bottom-[15px] bottom-[20px]  left-1/2 transform -translate-x-1/2 ">
          <div className="text-white  text-[10px] lg:text-[14px]  text-center bg-secondary w-[100px] lg:w-[120px] h-[40px] flex justify-center items-center mx-auto">
            Keep scrolling
          </div>
          <img className="w-[250px]" src={pointdown} />
        </div>
      </div>

      <div className="px-[3%] lg:px-[5%] xl:px-[15%] 2xl:px-[20%] xl:py-[88px] py-[24px] md:py-[70px] ">
        {/* <h4 className=" text-[20px] lg:text-[30px] font-normal  text-gray-900 leading-[35px] lg:leading-[50px] transform -skew-y-12 text-shadow-lg">
          Food serves as our shared foundation, a universal encounter.
        </h4> */}

        <div className="">
          <div className="">
            <div
              className={`w-[115px] h-[40px] flex justify-center items-center rounded-full mx-auto ${
                backgroundColor === "#f97316"
                  ? "bg-[#f97316] text-white "
                  : backgroundColor === "#1e1b4b"
                  ? "bg-[#1e1b4b] text-white "
                  : "bg-orange-100 text-black "
              }  text-[14px] font-[500] lg:text-[16px] transition-all duration-700 ease-in-out`}
            >
              {accountType}
            </div>
          </div>
          <div className="text-center md:w-[70%] lg:w-[800px] mx-auto mt-[16px] lg:mt-14">
            <h4 className="font-bold text-[32px] md:text-4xl lg:text-6xl tracking-tighter ">
              {headline}
            </h4>
            <h4 className="text-[12px] mt-[10px] lg:text-xl lg:w-[60%] lg:mx-auto">
              {headline2}
            </h4>
          </div>
          <div className="flex items-center w-fit mx-auto text-center mt-[15px] space-x-[10px]">
            <button className="bg-secondary flex justify-center items-center w-[48px] h-[48px] rounded-full">
              <img className="w-[15px]" src={playstore} />
            </button>
            {/* <button className="bg-secondary flex justify-center items-center w-[48px] h-[48px] rounded-full">
              <img className="w-[15px]" src={applestore} />
            </button> */}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 grid-cols-1 lg:gap-[50px] xl:gap-[70px] gap-[33px] py-[12px] md:pb-[20px] xl:pb-[40px] items-center px-[3%] lg:px-[5%] xl:px-[15%] 2xl:px-[20%]">
        <div className="">
          {" "}
          <img src={rider} />
        </div>
        <div className="">
          <h4 className=" text-[16px] lg:text-[28px] font-semibold mb-[15px]">
            Experience the freedom of flexible earning as a rider! Deliver meals
            from popular local spots straight to customers' doors.
          </h4>
          <h4 className=" text-[16px] lg:text-[28px] font-semibold mb-[10px]">
            Looking for flexibility? Become a rider, set your own schedule, and
            make deliveries that fit around your life.
          </h4>
          <h4 className="lg:text-[14px]  text-[10px]">
            Join us, hit the road, and earn while bringing delicious food to
            doorsteps with ease.
          </h4>
          <NavLink exact to="/riders" activeStyle={{ color: "#f97316" }}>
            <button className=" text-[10px] text-white bg-primary hover:bg-orange-600 px-[14px] py-[8px] rounded-full font-[500] md:mt-[30px] mt-[15px]">
              Become a Rider
            </button>
          </NavLink>
        </div>
      </div>

      <div className="px-[3%] lg:px-[5%] xl:px-[15%] 2xl:px-[20%] xl:pb-[40px] pb-[30px] md:pb-[20px] bg-orange-100  md:pt-[150px] md:-mt-[120px] pt-[330px] -mt-[300px] ">
        <div className="md:grid grid-cols-2 lg:gap-[50px] xl:gap-[70px] gap-[33px] items-center">
          <div className="order-2">
            {" "}
            <img src={chef} />
          </div>
          <div className="order-1 mt-[10px] md:mt-[0px]">
            <h4 className=" text-[16px] lg:text-[28px] font-semibold mb-[15px]">
              Join our platform and showcase your dishes to a wider audience.
              Whether it's breakfast, lunch, or dinner, connect with food lovers
              in your neighborhood and beyond.
            </h4>

            <h4 className="lg:text-[14px]  text-[10px]">
              Ready to expand your reach? Partner with us to streamline orders,
              boost visibility, and increase revenue—all while focusing on what
              you do best: creating amazing food.
            </h4>
            <NavLink exact to="/vendors" activeStyle={{ color: "#f97316" }}>
              <button className=" text-[10px] text-white bg-primary hover:bg-orange-600 px-[14px] py-[8px] rounded-full font-[500] md:mt-[30px] mt-[15px]">
                Partner with Us
              </button>
            </NavLink>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 mt-[35px] xl:mt-[60px] gap-[30px] lg:gap-[50px] xl:gap-[60px] items-start">
          <div>
            <h4 className=" text-[40px] font-medium lg:text-[60px] 2xl:text-[100px] md:border-r-[2px] md:border-gray-200 md:flex justify-center">
              99.9%
            </h4>
            <h4 className=" text-[10px] lg:text-[16px] 2xl:text-[20px]  font-medium md:flex justify-center  md:text-center">
              Punctuality Guarantee: No excuses, just on-time delivery. Speedy
              service is our forte.
            </h4>
          </div>
          <div>
            <h4 className=" text-[40px] font-medium lg:text-[60px] 2xl:text-[100px] md:border-r-[2px] md:border-gray-200 md:flex justify-center">
              100+
            </h4>
            <h4 className=" text-[10px] lg:text-[16px] 2xl:text-[20px]  font-medium md:flex justify-center  md:text-center">
              Over 100 delicious options to brighten your day.
            </h4>
          </div>
          <div>
            <h4 className=" text-[40px] font-medium lg:text-[60px] 2xl:text-[100px]  md:flex justify-center">
              #1
            </h4>
            <h4 className=" text-[10px] lg:text-[16px] 2xl:text-[20px]  font-medium md:flex justify-center md:text-center">
              Top-ranked: Consistently surpassing your expectations.
            </h4>
          </div>
        </div>
      </div>

      <div className=" py-[50px] md:py-[80px] px-[3%] lg:px-[5%] xl:px-[15%] 2xl:px-[20%]">
        <Slides />
      </div>
    </div>
  );
};

export default Home;
