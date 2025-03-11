import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import deliveryAnimation from "../assets/anime/delivery.json";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-6 text-center">
      <div className="flex justify-center mb-6">
        <Lottie
          animationData={deliveryAnimation}
          autoPlay
          style={{ width: "100%", height: "30vh" }}
        />
      </div>
      <div className="relative flex flex-col items-center">
        <h1 className="text-9xl font-extrabold text-gray-900 tracking-widest">
          404
        </h1>
        <div className="bg-red-500 px-2  text-[10px] md: text-[12px] text-white font-semibold rounded rotate-12 absolute top-1/2 -translate-y-1/2">
          Page Not Found
        </div>
      </div>
      <p className="text-gray-500 mt-6 text-base">
        Oops! The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 text-white bg-primary rounded-md text-[16] font-medium shadow-md hover:bg-orange-600 transition"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
