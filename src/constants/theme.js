const COLORS = {
  light: "#ffedd5",
  primary: "#f97316",
  primary1: "#ffedd5",
  secondary: "#1e1b4b",
  secondary1: "#ffe5db",
  tertiary: "#0078a6",
  transparent: "#FFA50040",
  gray: "#83829A",
  gray2: "#C1C0C8",
  lightgray: "#f3f4f6",
  offwhite: "#F3F4F8",
  white: "#FFFFFF",
  black: "#000000",
  red: "#e81e4d",
  lightred: "#fee2e2",
  green: "#00C135",
  lightgreen: "#dcfce7",
  lightWhite: "#FAFAFC",
  transparent1: "#FFA50040",
};

// const BaseUrl = "http://10.0.2.2:6003";
const BaseUrl = process.env.REACT_APP_BASE_URL;
const GoogleApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
const PlaceholderImage =
  "https://firebasestorage.googleapis.com/v0/b/sprinfare2024.appspot.com/o/images%2Fplaceholder.png?alt=media&token=5fe12d31-5a42-48f6-ae11-9f9f52458b10";

export { COLORS, BaseUrl, GoogleApiKey, PlaceholderImage };
