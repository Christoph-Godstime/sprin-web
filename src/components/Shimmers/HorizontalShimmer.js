import React from "react";
import ReusableShimmer from "./ReusableShimmer";

const HorizontalShimmer = ({
  width,
  height,
  radius,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
}) => {
  const shimmerList = [1, 2, 3, 4, 5, 6];

  return (
    <div
      className="flex overflow-x-hidden
          flex-col space-y-[20px]"
    >
      {shimmerList.map((item) => (
        <ReusableShimmer
          key={item}
          width={width}
          height={height}
          radius={radius}
          marginTop={marginTop}
          marginBottom={marginBottom}
          marginLeft={marginLeft}
          marginRight={marginRight}
        />
      ))}
    </div>
  );
};

export default HorizontalShimmer;
