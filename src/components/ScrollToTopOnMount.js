import React, { useEffect } from "react";

const ScrollToTopOnMount = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <div></div>;
};

export default ScrollToTopOnMount;
