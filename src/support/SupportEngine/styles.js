export const styles = {
  chatWithMeButton: {
    cursor: "pointer",
    boxShadow: "0px 0px 16px 6px rgba(0, 0, 0, 0.33)",
  },
  avatarHello: {
    // Position
    position: "absolute",
    left: "calc(-100% - 44px - 65px)",
    top: "calc(50% - 24px)",
    // Layering
    zIndex: "10000",
    boxShadow: "0px 0px 16px 6px rgba(0, 0, 0, 0.33)",
    // Border
    padding: "12px 12px 12px 16px",
    borderRadius: "24px",
    // Color
    backgroundColor: "#ffedd5",
    color: "black",
  },
  supportWindow: {
    backgroundColor: "white",
    // Border
    borderRadius: "12px",
    // border: `2px solid #1e1b4b`,
    overflow: "hidden",
    // Shadow
    boxShadow: "0px 0px 16px 6px rgba(0, 0, 0, 0.33)",
  },
  emailFormWindow: {
    width: "100%",
    overflow: "hidden",
    transition: "all 0.5s ease",
    WebkitTransition: "all 0.5s ease",
    MozTransition: "all 0.5s ease",
  },
  stripe: {
    position: "relative",
    top: "0px",
    width: "100%",
    height: "308px",
    // backgroundColor: "#1e1b4b",
    // transform: "skewY(-12deg)",
  },
  topText: {
    position: "relative",
    width: "100%",
    top: "15%",

    fontSize: "24px",
    fontWeight: "600",
  },
  emailInput: {
    width: "90%",
    textAlign: "center",
    outline: "none",

    borderRadius: "12px",
    border: "2px solid #1e1b4b",
  },
  bottomText: {
    position: "absolute",
    width: "100%",
    top: "60px",
    color: "#1e1b4b",
    fontSize: "24px",
    fontWeight: "600",
  },
  loadingDiv: {
    position: "absolute",
    height: "100%",
    width: "100%",
    textAlign: "center",
    backgroundColor: "white",
  },
  loadingIcon: {
    color: "#1e1b4b",
    position: "absolute",
    top: "calc(50% - 51px)",
    left: "calc(50% - 51px)",
    fontWeight: "600",
  },
  chatEngineWindow: {
    width: "100%",
  },
};
