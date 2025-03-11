import React from "react";

const AssetImage = ({ data, width, height, radius, mode }) => {
  return (
    <img
      src={data}
      alt="Asset"
      className="object-cover"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        borderRadius: `${radius}px`,
        objectFit: mode,
      }}
    />
  );
};

export default AssetImage;
