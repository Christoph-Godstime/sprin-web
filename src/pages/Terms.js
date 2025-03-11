import React, { useState } from "react";
import { terms } from "../utils/data";
import leftnav from "../assets/leftnav.png";
import rightnav from "../assets/rightnav.png";
import ScrollToTopOnMount from "../components/ScrollToTopOnMount";

const Terms = () => {
  const [activeHeadingIndex, setActiveHeadingIndex] = useState(0);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const handleNextSlide = () => {
    setActiveSlideIndex((prevIndex) => {
      if (prevIndex === terms[activeHeadingIndex].slides.length - 1) {
        if (activeHeadingIndex === terms.length - 1) {
          return prevIndex;
        } else {
          setActiveHeadingIndex((prevIndex) => prevIndex + 1);
          return 0;
        }
      } else {
        return prevIndex + 1;
      }
    });

    console.log("next");
  };

  const handlePrevSlide = () => {
    setActiveSlideIndex((prevIndex) => {
      if (prevIndex === 0 && activeHeadingIndex === 0) {
        return prevIndex;
      } else if (prevIndex === 0) {
        setActiveHeadingIndex((prevIndex) => prevIndex - 1);
        // Fixed potential issue with accessing activeHeadingIndex immediately after setting it
        return terms[activeHeadingIndex - 1].slides.length - 1;
      } else {
        return prevIndex - 1;
      }
    });
    console.log("prev");
  };

  const handleHeadingClick = (index) => {
    setActiveHeadingIndex(index);
    setActiveSlideIndex(0); // Resets slide index to show the first slide of the new heading
  };

  const isPreviousButtonVisible =
    activeHeadingIndex !== 0 || activeSlideIndex !== 0;
  const isNextButtonVisible =
    activeHeadingIndex !== terms.length - 1 ||
    activeSlideIndex !== terms[activeHeadingIndex].slides.length - 1;
  return (
    <div className=" -mt-[70px] ">
      <ScrollToTopOnMount />
      <div className="bg-secondary pt-[90px] lg:pt-[150px]  pb-[50px] 2xl:pb-[80px] px-[3%]">
        <h4 className="text-center text-6xl leading-relaxed lg:text-[112px] font-bold text-white">
          TERMS OF USE
        </h4>
      </div>
      <div className="bg-orange-100 px-[3%] lg:px-[5%] xl:px-[15%] 2xl:px-[20%] pt-[90px]  pb-[50px] ">
        <div className="h-full ">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-y-[25px]">
            <div className="lg:pr-[20px]">
              <div className="border-b-[1px] lg:border-b-[0px] border-black pb-[10px] ">
                {terms.map((heading, index) => (
                  <div key={index}>
                    <ul
                      className={`tex-[16px] font-[700] ml-[20px] w-fit mb-[16px] md:mb-[24px] ${
                        activeHeadingIndex === index
                          ? "text-primary border-b-[1px] border-primary"
                          : "text-black"
                      } cursor-pointer list-disc`}
                      onClick={() => handleHeadingClick(index)}
                    >
                      <li>{heading.title}</li>
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-rgba-6ab5d2-16 px-[24px] py-[36px] rounded-[24px]  flex flex-col">
              {terms.map((terms, index) => (
                <div key={index}>
                  <div>
                    <div
                      className={
                        activeHeadingIndex === index
                          ? `border-b-[1px] border-gray-600 pb-[17px] mb-[17px]`
                          : "hidden"
                      }
                    >
                      <h4 className="text-black  text-[20px] md:text-[22px] font-[700] leading-[28px] md:leading-[30.6px]">
                        {terms.title}
                      </h4>
                      <h4 className="text-black  text-[14px] md:text-[16px] md:leading-[27px] font-[400] mt-[16px]">
                        {terms.description}
                      </h4>
                    </div>

                    <div className="max-h-[300px] overflow-y-auto sm:scrollbar sm:scrollbar-w-[6px] sm:scrollbar-thumb-primary sm:scrollbar-track-transparent sm:scrollbar-thumb-rounded-full sm:scrollbar-track-rounded-full">
                      {activeHeadingIndex === index &&
                        terms.slides.map((slide, slideIndex) => (
                          <div key={slideIndex}>
                            {activeSlideIndex === slideIndex &&
                              slide.sections.map((section, sectionIndex) => (
                                <div className="pb-[12px] " key={sectionIndex}>
                                  <div className="flex">
                                    <div className="w-[15px] flex justify-end mr-[10px]">
                                      <h4 className="  text-[12px] font-[400] text-black leading-[21px]">
                                        {section.number}.
                                      </h4>
                                    </div>
                                    <div className="w-full">
                                      <h3 className=" text-[12px] font-[400] text-black leading-[21px]">
                                        {section.title}
                                      </h3>
                                      {section.texts.map((text, textIndex) => (
                                        <ul
                                          className="list-disc mt-[10px] text-black font-[400]  text-[12px] leading-[21px] -ml-[10px] md:ml-[20px]"
                                          key={textIndex}
                                        >
                                          <li>{text}</li>
                                        </ul>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              ))}
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              ))}
              <div className="mt-auto md:flex flex-row items-center  justify-between pt-[17px] border-t-[1px] border-gray-600">
                <div className="order-2 flex justify-center items-center space-x-[40px]">
                  <button
                    className=" flex justify-center items-center bg-buttonbg"
                    onClick={handlePrevSlide}
                    style={{
                      visibility: isPreviousButtonVisible
                        ? "visible"
                        : "hidden",
                    }}
                  >
                    <img className="w-[13px]" src={leftnav} />
                  </button>
                  <button
                    className=" flex justify-center items-center bg-buttonbg"
                    onClick={handleNextSlide}
                    style={{
                      visibility: isNextButtonVisible ? "visible" : "hidden",
                    }}
                  >
                    <img className="w-[13px]" src={rightnav} />
                  </button>
                </div>
                <div className="order-1 mt-[20px] md:mt-[0px]">
                  <h4 className="text-black font-[400]  text-[10px] text-center">
                    Last updated: November 2024
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
