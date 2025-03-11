import React, { useEffect, useState } from "react";
import { NavLink, Link, useHistory } from "react-router-dom";
import Logo from "./Logo";
import logo from "../assets/logo1.png";
import { FaLocationDot } from "react-icons/fa6";
import { FiMenu } from "react-icons/fi";
import { MdOutlineClose } from "react-icons/md";
import playstore from "../assets/playstore.webp";
import applestore from "../assets/applestore2.png";

const PublicNavbar = () => {
  const [fix, setFix] = useState(false);
  const [show, setShow] = useState(false);

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

    if (show) {
      document.body.classList.add("overflow-y-hidden");
    } else {
      document.body.classList.remove("overflow-y-hidden");
    }
  }, [show]);

  return (
    <div>
      <div
        className={
          fix
            ? "fixed w-full   z-40 mt-[70px] bg-orange-100 shadow-xl ease-in-out duration-500"
            : "sticky z-40 "
        }
      >
        <div className="px-[3%] lg:px-[5%] xl:px-[15%] 2xl:px-[20%]">
          <div className="flex justify-between items-center h-[70px]">
            <div className="cursor-pointer">
              <Link exact to="/">
                <div className="w-[90px] h-[48px] rounded-full flex justify-center items-center bg-secondary">
                  <Logo width="w-[50px]" text=" text-[16px]" />
                </div>
              </Link>
            </div>
            <div
              onClick={() => setShow(!show)}
              className="w-[48px] h-[48px] rounded-full flex justify-center items-center bg-secondary"
            >
              <FiMenu className=" text-[22px] cursor-pointer text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* nav bar */}
      <div
        className={`fixed w-full h-full block  ${
          show ? "translate-x-0 z-40" : "-translate-x-full z-40"
        } ease-in-out duration-500`}
        style={{
          minWidth: show ? "200px" : "",
          zIndex: show ? 50 : "",
          background: show ? "#0004" : "",
          color: show ? "white" : "",
          top: show ? 0 : 0,
        }}
      >
        <div
          className={`top-0 left-0 z-40 absolute overflow-y-auto h-[calc(100vh)] bg-secondary md:w-[400px] w-full pt-[18px] sm:scrollbar sm:scrollbar-w-[6px] sm:scrollbar-thumb-primary sm:scrollbar-track-transparent sm:scrollbar-thumb-rounded-full sm:scrollbar-track-rounded-full  ${
            show ? "translate-x-0" : "-translate-x-full"
          } ease-in-out duration-500`}
        >
          <div className="px-[4%] xl:px-[60px] 2xl:px-[15%] flex flex-col h-full">
            <div className="flex items-center justify-between">
              <div onClick={() => setShow(!show)} className="cursor-pointer">
                <div>
                  <Link exact to="/">
                    <Logo width="w-[50px]" text=" text-[16px]" />
                  </Link>
                </div>
              </div>
              <MdOutlineClose
                onClick={() => setShow(!show)}
                className="text-primary text-[30px] cursor-pointer w-[30px]"
              />
            </div>

            <div className=" mt-[70px] grid grid-cols-1 md:gap-[30px] gap-[40px]">
              <h4
                onClick={() => setShow(!show)}
                className=" text-[14px] font-[500] md:font-[400] text-white"
              >
                <NavLink exact to="/" activeStyle={{ color: "#f97316" }}>
                  Home
                </NavLink>
              </h4>
              {/* <h4
                onClick={() => setShow(!show)}
                className=" text-[14px] font-[500] md:font-[400] text-white"
              >
                <NavLink
                  exact
                  to="/customers"
                  activeStyle={{ color: "#f97316" }}
                >
                  Customers
                </NavLink>
              </h4> */}

              <h4
                onClick={() => setShow(!show)}
                className=" text-[14px] font-[500] md:font-[400] text-white"
              >
                <NavLink exact to="/vendors" activeStyle={{ color: "#f97316" }}>
                  Vendors
                </NavLink>
              </h4>
              <h4
                onClick={() => setShow(!show)}
                className=" text-[14px] font-[500] md:font-[400] text-white"
              >
                <NavLink exact to="/riders" activeStyle={{ color: "#f97316" }}>
                  Riders
                </NavLink>
              </h4>
              <h4
                onClick={() => setShow(!show)}
                className=" text-[14px] font-[500] md:font-[400] text-white"
              >
                <NavLink exact to="/privacy" activeStyle={{ color: "#f97316" }}>
                  Privacy Policy
                </NavLink>
              </h4>
              <h4
                onClick={() => setShow(!show)}
                className=" text-[14px] font-[500] md:font-[400] text-white"
              >
                <NavLink exact to="/terms" activeStyle={{ color: "#f97316" }}>
                  Terms of Use
                </NavLink>
              </h4>
              <h4
                onClick={() => setShow(!show)}
                className=" text-[14px] font-[500] md:font-[400] text-white"
              >
                <NavLink exact to="/faqs" activeStyle={{ color: "#f97316" }}>
                  FAQs
                </NavLink>
              </h4>
              <h4
                onClick={() => setShow(!show)}
                className=" text-[14px] font-[500] md:font-[400] text-white"
              >
                <NavLink exact to="/contact" activeStyle={{ color: "#f97316" }}>
                  Contact
                </NavLink>
              </h4>
            </div>
            <div className="mt-auto pt-[40px] pb-[60px] grid grid-cols-1 gap-[20px]">
              <button className="flex items-center justify-center space-x-[10px]  rounded-[8px] bg-orange-100 w-[250px] h-[40px]">
                <div>
                  <img className="w-[22px]" src={playstore} />
                </div>
                <h4 className=" text-[12px] md: text-[14px] text-black">
                  Download on Google Play
                </h4>
              </button>
              {/* <button className="flex items-center justify-center space-x-[10px] rounded-[8px] bg-orange-100 w-[250px] h-[40px]">
                <div>
                  <img className="w-[22px]" src={applestore} />
                </div>
                <h4 className=" text-[12px] md: text-[14px] text-black">
                  Download on App Store
                </h4>
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicNavbar;
