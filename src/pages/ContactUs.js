import React from "react";
import ContactTile from "../components/ContactTile";
import Header from "../components/Header";

const ContactUs = () => {
  return (
    <div className="flex flex-col h-dvh bg-gray-100 items-center pb-[50px]">
      <Header text="Contact Us" />
      <div className="w-full max-w-2xl pt-[10px] px-[12px]">
        <ContactTile title="Call" icon="phone" font={3} />
        <ContactTile title="WhatsApp" icon="whatsapp" font={3} />
        <ContactTile title="Feedback" icon="message-alert" font={4} />
        {/* <ContactTile title="Direct Chat" icon="customerservice" /> */}
      </div>
    </div>
  );
};

export default ContactUs;
