import React from "react";

const DeleteAccount = () => {
  return (
    <div className="px-[3%] lg:px-[5%] xl:px-[15%] 2xl:px-[20%] pb-[100px] bg-orange-100  pt-[100px] ">
      <h4 className="lg:text-[18px] text-[12px] text-black md:w-[600px] mx-auto text-center">
        In accordance with our privacy policy, deleting your account and data
        can't be undone, so we need to check it's you before going ahead.
      </h4>

      <h4 className="lg:text-[18px] text-[12px] text-black md:w-[600px] mx-auto text-center mt-[20px]">
        Send us a request and we'll confirm via email after we've reviewed it.
      </h4>

      <div className="flex justify-center mt-[30px]">
        <input
          type="email"
          name="email"
          className="py-[10px] px-[14px] rounded-[8px] border-[1px] border-gray-200 mt-[8px] focus:outline-none  focus:border-orange-300  focus:border-[1px] w-full md:w-[400px] "
          placeholder="Enter email address"
        />
      </div>

      <div className="flex justify-center mt-[30px]">
        <textarea
          className="py-[10px] px-[14px] rounded-[8px] border-[1px] border-gray-200 mt-[8px] focus:outline-none  focus:border-orange-300  focus:border-[1px] w-full md:w-[400px] "
          placeholder="Your enquiry..."
          rows="4"
        />
      </div>

      <div className="flex justify-center">
        <button className="text-[12px] text-white bg-primary hover:bg-orange-600 px-[14px] py-[8px] rounded-full font-[500] md:mt-[30px] mt-[30px] md:w-[400px]">
          Send request
        </button>
      </div>
    </div>
  );
};

export default DeleteAccount;
