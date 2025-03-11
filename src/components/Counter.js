import React from "react";
import { useState } from "react";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";

const Counter = ({ count, setCount }) => {
  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <AiOutlineMinusCircle
        className="text-primary text-[26px] cursor-pointer"
        onClick={decrement}
      />
      <span className="text-[19px] font-[400]">{count}</span>
      <AiOutlinePlusCircle
        className="text-primary text-[26px] cursor-pointer"
        onClick={increment}
      />
    </div>
  );
};

export default Counter;
