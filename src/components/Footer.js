import React from "react";
import Logo from "./Logo";
import { NavLink, Link, useHistory } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <footer className="py-[50px] px-[3%] lg:px-[5%] xl:px-[15%] 2xl:px-[20%] bg-secondary lg:flex gap-[100px] items-center">
        <div className="mb-[30px] lg:mb-[0px]">
          <Logo width="w-[70px]" text=" text-[18px]" />
          <h4 className="mt-[30px]  text-[10px] md:text-[12px] font-[300] text-gray-400 hidden lg:block whitespace-nowrap">
            © 2025 Sprin Technologies Limited. All rights reserved
          </h4>
        </div>
        <div className="grid grid-cols-1 gap-[40px] sm:grid-cols-3  w-full">
          <div>
            <h4 className=" text-[16px] text-gray-400 mb-[25px]">Company</h4>
            {/* <h3 className=" text-[10px] md:text-[12px] font-[300] text-white mb-[10px]">
              <NavLink exact to="/customers" activeStyle={{ color: "#f97316" }}>
                Customers
              </NavLink>
            </h3> */}

            <h3 className=" text-[10px] md:text-[12px] font-[300] text-white mb-[10px]">
              <NavLink exact to="/vendors" activeStyle={{ color: "#f97316" }}>
                Vendors
              </NavLink>
            </h3>

            <h3 className=" text-[10px] md:text-[12px] font-[300] text-white mb-[10px]">
              <NavLink exact to="/riders" activeStyle={{ color: "#f97316" }}>
                Riders
              </NavLink>
            </h3>

            <h3 className=" text-[10px] md:text-[12px] font-[300] text-white mb-[10px]">
              <NavLink exact to="/contact" activeStyle={{ color: "#f97316" }}>
                Contact
              </NavLink>
            </h3>

            {/* <h3 className=" text-[10px] md:text-[12px] font-[300] text-white mb-[10px]">
                About
              </h3> */}
          </div>

          <div>
            <h4 className=" text-[16px] text-gray-400 mb-[25px]">Support</h4>

            <h3 className=" text-[10px] md:text-[12px] font-[300] text-white mb-[10px]">
              <NavLink exact to="/faqs" activeStyle={{ color: "#f97316" }}>
                FAQs
              </NavLink>
            </h3>

            <h3 className=" text-[10px] md:text-[12px] font-[300] text-white mb-[10px]">
              <NavLink exact to="/terms" activeStyle={{ color: "#f97316" }}>
                Terms of services
              </NavLink>
            </h3>

            {/* <h3 className=" text-[10px] md:text-[12px] font-[300] text-white mb-[10px]">
                Cookies Policy
              </h3> */}

            <h3 className=" text-[10px] md:text-[12px] font-[300] text-white mb-[10px]">
              <NavLink exact to="/privacy" activeStyle={{ color: "#f97316" }}>
                Privacy Policy
              </NavLink>
            </h3>
          </div>

          <div>
            <h4 className=" text-[16px] text-gray-400 mb-[25px]">Follow Us</h4>
            <h3 className=" text-[10px] md:text-[12px] font-[300] text-white mb-[10px]">
              Instagram
            </h3>

            <h3 className=" text-[10px] md:text-[12px] font-[300] text-white mb-[10px]">
              Twitter
            </h3>
          </div>
        </div>
        <h4 className="mt-[30px]  text-[10px] md:text-[12px] font-[300] text-gray-400  lg:hidden">
          © 2025 Sprin Technologies Limited. All rights reserved
        </h4>
      </footer>
    </div>
  );
};

export default Footer;
