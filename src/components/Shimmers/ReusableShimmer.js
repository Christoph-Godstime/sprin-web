import React from "react";
import Skeleton from "react-loading-skeleton";

const ReusableShimmer = ({
  height,
  radius,
  marginRight,
  marginTop,
  marginBottom,
  marginLeft,
  width,
}) => {
  return (
    <div
      style={{
        width,
        marginRight,
        marginTop,
        marginBottom,
        marginLeft,
      }}
    >
      <Skeleton
        width={width}
        height={height}
        borderRadius={radius}
        baseColor="#e5e7eb"
        highlightColor="#ffedd5"
      />
    </div>
  );
};

export default ReusableShimmer;
