import { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import feature1 from "../assets/feature1.png";
import feature2 from "../assets/feature2.png";
import feature3 from "../assets/feature3.png";
import feature5 from "../assets/feature5.png";
import feature7 from "../assets/feature7.png";

const Slides = () => {
  const slides = [
    <div key={1} className="md:flex md:gap-[25px] md:mr-[24px]">
      <div className="md:w-[33%] ">
        <img src={feature1} />
      </div>
      <div className="bg-secondary md:w-[66%] w-[100%] flex flex-col p-[24px] rounded-[16px] md:h-auto">
        <h4 className="text-[#F2F2F2] font-[700]  text-[22px] leading-[32px]">
          Download the App
        </h4>
        <h4 className=" text-[14px] font-[500] leading-[24px] text-[#F2F2F2] mt-[24px] md:mt-auto">
          Start by downloading our app from Google Play. It's quick, free, and
          the first step to unlocking delicious meals at your fingertips.
        </h4>
      </div>
    </div>,
    <div key={2} className="md:flex md:gap-[25px] md:mr-[24px]">
      <div className="md:w-[33%] ">
        <img src={feature5} />
      </div>
      <div className="bg-orange-100 md:w-[66%] w-[100%] flex flex-col p-[24px] rounded-[16px] md:h-auto">
        <h4 className="text-text font-[700]  text-[22px] leading-[32px]">
          Browse Your Favorites
        </h4>
        <h4 className=" text-[14px] font-[500] leading-[24px] text-text mt-[24px] md:mt-auto">
          Discover a wide range of dishes from your favorite local eateries.
          Whether you're in the mood for something new or craving a classic, the
          choice is yours.
        </h4>
      </div>
    </div>,
    <div key={3} className="md:flex md:gap-[25px] md:mr-[24px]">
      <div className="md:w-[33%] ">
        <img src={feature2} />
      </div>
      <div className="bg-[#6EC1FC] md:w-[66%] w-[100%] flex flex-col p-[24px] rounded-[16px] md:h-auto">
        <h4 className="text-text font-[700]  text-[22px] leading-[32px]">
          Add to Cart
        </h4>
        <h4 className=" text-[14px] font-[500] leading-[24px] text-text mt-[24px] md:mt-auto">
          Select your preferred dishes and customize your order to suit your
          taste. Add everything you want to the cart with just a few taps.
        </h4>
      </div>
    </div>,
    <div key={4} className="md:flex md:gap-[25px] md:mr-[24px]">
      <div className="md:w-[33%] ">
        <img src={feature7} />
      </div>
      <div className="bg-[#bef264] md:w-[66%] w-[100%] flex flex-col p-[24px] rounded-[16px] md:h-auto">
        <h4 className="text-text font-[700]  text-[22px] leading-[32px]">
          Place Your Order
        </h4>
        <h4 className=" text-[14px] font-[500] leading-[24px] text-text mt-[24px] md:mt-auto">
          Proceed to checkout, confirm your delivery details, and place your
          order effortlessly.
        </h4>
      </div>
    </div>,
    <div key={5} className="md:flex md:gap-[25px] md:mr-[24px]">
      <div className="md:w-[33%] ">
        <img src={feature3} />
      </div>
      <div className="bg-[#e879f9] md:w-[66%] w-[100%] flex flex-col p-[24px] rounded-[16px] md:h-auto">
        <h4 className="text-text font-[700]  text-[22px] leading-[32px]">
          Enjoy Fast Delivery
        </h4>
        <h4 className=" text-[14px] font-[500] leading-[24px] text-text mt-[24px] md:mt-auto">
          Relax and let us handle the rest. Your freshly prepared food will be
          delivered straight to your doorstep in no time!
        </h4>
      </div>
    </div>,
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const goToPreviousSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    );
  };

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === slides.length - 1 ? 0 : prevSlide + 1
    );
  };
  return (
    <div className="max-w-[1480px] mx-auto relative">
      <div className="md:flex justify-between items-end ">
        <div>
          <h4 className="text-text md:font-[700] font-[600] md:leading-[60px] tracking-tighter md:text-[48px] text-[38px]">
            Discover How Easy Food Delivery Can Be
          </h4>
          <h4 className="text-text font-[500] leading-[28px]   text-[16px] md:w-[600px] xl:w-[698px] mt-[10px]">
            From satisfying your cravings to delivering your favorite meals,
            we've made every step of the food ordering process simple, fast, and
            hassle-free. Enjoy delicious dishes brought straight to your door
            with just a few taps.
          </h4>
        </div>
        <div className="hidden lg:block">
          <div className="flex gap-[12px]">
            <button
              className="flex justify-center items-center rounded-full border-[1px] border-[#C0C2C4] w-[44px] h-[44px]"
              onClick={goToPreviousSlide}
            >
              <FiChevronLeft className="text-[30px] stroke-1 text-text" />
            </button>
            <button
              className="flex justify-center items-center rounded-full border-[1px] border-[#C0C2C4] w-[44px] h-[44px]"
              onClick={goToNextSlide}
            >
              <FiChevronRight className="text-[30px] stroke-1 text-text" />
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-hidden mt-[48px]">
        <div
          className="flex transition-transform duration-300 ease-in-out 2xl:w-[50.5%] xl:w-[70%] md:w-[90%] lg:w-[70%] sm:w-[100%] w-[100%] "
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={index} className=" min-w-[100%]">
              <div>{slide}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:hidden mt-[30px]">
        <div className="flex justify-between  ">
          <button
            className="flex justify-center items-center rounded-full border-[1px] border-[#C0C2C4] w-[44px] h-[44px]"
            onClick={goToPreviousSlide}
          >
            <FiChevronLeft className="text-[30px] stroke-1 text-text" />
          </button>
          <button
            className="flex justify-center items-center rounded-full border-[1px] border-[#C0C2C4] w-[44px] h-[44px]"
            onClick={goToNextSlide}
          >
            {" "}
            <FiChevronRight className="text-[30px] stroke-1 text-text" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default Slides;
