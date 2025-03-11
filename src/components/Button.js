import React from "react";
import { FaSpinner } from "react-icons/fa";

const Button = ({ title, onClick, isValid, isLoading }) => {
  return (
    <button
      type="submit"
      onClick={isValid && !isLoading ? onClick : null}
      className={`w-full py-3 text-white font-bold rounded-lg flex justify-center items-center ${
        isValid ? "bg-primary hover:bg-orange-600" : "bg-gray-400"
      }`}
      disabled={!isValid || isLoading}
    >
      {isLoading ? (
        <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      ) : (
        title
      )}
    </button>
  );
};

export default Button;
