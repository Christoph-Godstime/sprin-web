import React from "react";
import Skeleton from "react-loading-skeleton";

const ReusableShimmer = ({
  height,
  radius,
  marginRight,
  marginTop,
  marginBottom,
  marginLeft,
}) => {
  return (
    <div
      style={{
        width: "100%",
        marginRight,
        marginTop,
        marginBottom,
        marginLeft,
      }}
    >
      <Skeleton
        width="100%"
        height={height}
        borderRadius={radius}
        baseColor="#e5e7eb"
        highlightColor="#ffedd5"
      />
    </div>
  );
};

export default ReusableShimmer;
