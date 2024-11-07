import React from "react";
import Logo from "./Logo";

const Footer = () => {
  return (
    <div>
      <footer className="py-[50px] px-[3%] lg:px-[5%] xl:px-[15%] 2xl:px-[20%] bg-secondary lg:flex gap-[100px] items-center">
        <div className="mb-[30px] lg:mb-[0px]">
          <Logo width="w-[70px]" text="text-[20px]" />
          <h4 className="mt-[30px] text-[12px] md:text-[14px] font-[300] text-gray-400 hidden lg:block whitespace-nowrap">
            © 2024 Sprin Technologies Limited. All rights reserved
          </h4>
        </div>
        <div className="grid grid-cols-1 gap-[40px] sm:grid-cols-3  w-full">
          <div>
            <h4 className="text-[18px] text-gray-400 mb-[25px]">Company</h4>
            <a href="about.html" className="nav-link">
              <h3 className="text-[12px] md:text-[14px] font-[300] text-white mb-[10px]">
                Customers
              </h3>
            </a>
            <a href="pricing.html" className="nav-link">
              <h3 className="text-[12px] md:text-[14px] font-[300] text-white mb-[10px]">
                Vendors
              </h3>
            </a>
            <a href="blog.html" className="nav-link">
              <h3 className="text-[12px] md:text-[14px] font-[300] text-white mb-[10px]">
                Riders
              </h3>
            </a>
            <a href="contact.html" className="nav-link">
              <h3 className="text-[12px] md:text-[14px] font-[300] text-white mb-[10px]">
                Contact
              </h3>
            </a>
            <a href="use-cases.html" className="nav-link">
              <h3 className="text-[12px] md:text-[14px] font-[300] text-white mb-[10px]">
                About
              </h3>
            </a>
          </div>

          <div>
            <h4 className="text-[18px] text-gray-400 mb-[25px]">Support</h4>
            <a href="faq.html" className="nav-link">
              <h3 className="text-[12px] md:text-[14px] font-[300] text-white mb-[10px]">
                FAQs
              </h3>
            </a>
            <a href="terms.html" className="nav-link">
              <h3 className="text-[12px] md:text-[14px] font-[300] text-white mb-[10px]">
                Terms of services
              </h3>
            </a>
            <a href="cookie-policy.html" className="nav-link">
              <h3 className="text-[12px] md:text-[14px] font-[300] text-white mb-[10px]">
                Cookies Policy
              </h3>
            </a>
            <a href="privacy-policy.html" className="nav-link">
              <h3 className="text-[12px] md:text-[14px] font-[300] text-white mb-[10px]">
                Privacy Policy
              </h3>
            </a>
          </div>

          <div>
            <h4 className="text-[18px] text-gray-400 mb-[25px]">Follow Us</h4>
            <h3 className="text-[12px] md:text-[14px] font-[300] text-white mb-[10px]">
              Facebook
            </h3>
            <h3 className="text-[12px] md:text-[14px] font-[300] text-white mb-[10px]">
              Twitter
            </h3>
            <h3 className="text-[12px] md:text-[14px] font-[300] text-white mb-[10px]">
              Instagram
            </h3>
            <h3 className="text-[12px] md:text-[14px] font-[300] text-white mb-[10px]">
              LinkedIn
            </h3>
          </div>
        </div>
        <h4 className="mt-[30px] text-[12px] md:text-[14px] font-[300] text-gray-400  lg:hidden">
          © 2024 Sprin Technologies Limited. All rights reserved
        </h4>
      </footer>
    </div>
  );
};

export default Footer;
