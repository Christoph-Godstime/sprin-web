import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  useEffect,
  useContext,
  useReducer,
  createContext,
  useMemo,
  useState,
} from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import "react-datepicker/dist/react-datepicker.css";
import { UserLocationContext } from "./context/UserLocationContext";
import { LoginProvider } from "./context/LoginContext";
import { RestaurantContext } from "./context/RestaurantContext";
import { CheckUserAddressType } from "./context/CheckUserAddressType";
import { ProfileTabContext } from "./context/ProfileTabContext";
import { CartCountContext } from "./context/CartCountContext";
import { UserReversedGeoCode } from "./context/UserReversedGeoCode";
import { CheckLoadRestaurantData } from "./context/CheckRestaurantData";
import { UserProfileProvider } from "./context/UserProfileContext";
import { CartCountProvider } from "./context/CartCountContext";
import { SocketContextProvider } from "./context/SocketContext";
import { DefaultAddressProvider } from "./context/DefaultAddressContext";
import { NearByRestaurantsProvider } from "./context/NearByRestaurants";
import { TrySomethingNewProvider } from "./context/TrySomethingNewContext";
import { FastestNearYouProvider } from "./context/FastestNearYou";
import { OrderProvider } from "./context/OrderContext";
import { GroceryStoreCategoryProvider } from "./context/GroceryStoreCategory";
import { FetchCartDetailsProvider } from "./context/FetchCartDetailsContext";

import PublicLayout from "./layouts/PublicLayout";
import LandingPage from "./pages/LandingPage";
import Faqs from "./pages/Faqs";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import DeleteAccount from "./pages/DeleteAccount";
import Contact from "./pages/Contact";
import Rider from "./pages/Rider";
import Vendor from "./pages/Vendor";
import { toast } from "react-toastify";
import LoadingScreen from "./components/LoadingScreen";
import NotFound from "./components/NotFound";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import { BaseUrl } from "./constants/theme";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerificationPage from "./pages/VerificationPage";
import ContactUs from "./pages/ContactUs";
import ChangePassword from "./pages/ChangePassword";
import ProfileDetials from "./pages/ProfileDetials";
import Referral from "./pages/Referral";
import Wallet from "./pages/Wallet";
import AddAddresses from "./pages/addresses/AddAddresses";
import ShippingAddress from "./pages/ShippingAddress";
import DefaultAddress from "./pages/addresses/DefaultAddress";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/orders/OrderDetails";
import Supermarket from "./pages/Supermarket";
import SubCategory from "./pages/grocery/SubCategory";
import Grocery from "./pages/grocery/Grocery";
import SearchGrocery from "./pages/grocery/SearchGrocery";
import InstallBanner from "./components/InstallBanner";
import MoreFoods from "./pages/food/MoreFoods";
import AllCategories from "./pages/AllCategories";
import FastestFoods from "./pages/food/FastestFoods";
import NewFoods from "./pages/food/NewFoods";
import AllRestaurants from "./pages/food/AllRestaurants";
import FoodPage from "./pages/restaurant/FoodPage";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import GroceryCheckout from "./pages/grocery/GroceryCheckout";
import Payment from "./pages/Payment";
import PaymentSuccess from "./pages/PaymentSuccess";
import RestaurantPage from "./pages/restaurant/RestaurantPage";
import AddRating from "./pages/AddRating";
import RiderRating from "./pages/RiderRating";
import FoodRating from "./pages/FoodRating";
import FoodFeedbacks from "./pages/FoodFeedbacks";

export const AuthContext = createContext();

const App = () => {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [restaurantObj, setRestaurant] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [login, setLogin] = useState(null);
  const [checkUserAddressType, setCheckUserAddressType] = useState(false);
  const [loadRestaurantData, setLoadRestaurantData] = useState(false);
  const [profileTab, setProfileTab] = useState(false);

  useEffect(() => {
    const setAppHeight = () => {
      document.documentElement.style.setProperty(
        "--app-height",
        `${window.innerHeight}px`
      );
    };

    setAppHeight(); // Set on mount
    window.addEventListener("resize", setAppHeight); // Update on resize

    return () => {
      window.removeEventListener("resize", setAppHeight);
    };
  }, []);

  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.userToken,
            isLoading: false,
          };

        case "RESTORE_VERIFIED":
          return {
            ...prevState,
            userVerified: action.userVerified,
            isLoading: false,
          };

        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.userToken,
            userVerified: action.userVerified,
          };
        case "SIGN_OUT_START":
          return { ...prevState, isSigningOut: true };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            userVerified: null,
            isSigningOut: false,
          };
        default:
          return prevState;
      }
    },
    {
      isLoading: true,
      isSignout: false,
      isSigningOut: false,
      userToken: null,
      userVerified: null,
    }
  );

  useEffect(() => {
    const bootstrapAsync = () => {
      try {
        const userToken = localStorage.getItem("token") || null;

        const userVerified = localStorage.getItem("verification") === "true";

        dispatch({ type: "RESTORE_TOKEN", userToken });
        dispatch({ type: "RESTORE_VERIFIED", userVerified });
      } catch (e) {
        console.log("Restoring token failed", e);
      }
    };

    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: (data) => {
        localStorage.setItem("token", JSON.stringify(data.userToken));
        localStorage.setItem("verification", JSON.stringify(data.verified));
        dispatch({
          type: "SIGN_IN",
          userToken: data.userToken,
          userVerified: data.verified,
        });
      },
      signOut: () => {
        dispatch({ type: "SIGN_OUT_START" }); // Start sign-out process

        setTimeout(() => {
          localStorage.clear();
          dispatch({ type: "SIGN_OUT" });
        }, 2000); // Simulate loading delay
      },
      isSigningOut: state.isSigningOut,
    }),
    [state.isSigningOut]
  );

  useEffect(() => {
    const checkTokenValidity = async () => {
      const token = localStorage.getItem("token");

      const accessToken = JSON.parse(token);

      if (!accessToken) {
        dispatch({ type: "SIGN_OUT" }); // Ensure user stays logged out
        return;
      }

      try {
        const response = await fetch(`${BaseUrl}/check-token`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        if (data.status === 200) {
          loginStatus();
        }

        if (!data.status) {
          toast.error("Your session has expired. Please log in again.", {
            position: "top-center",
            autoClose: 3000,
          });
          localStorage.clear();
          dispatch({ type: "SIGN_OUT" });
        }
      } catch (error) {
        console.error("Error checking token:", error);
        toast.error("An error occurred. Please try logging in again.", {
          position: "top-center",
          autoClose: 3000,
        });
        localStorage.clear();
        dispatch({ type: "SIGN_OUT" });
      }
    };

    checkTokenValidity();
  }, []);

  const loginStatus = async () => {
    const userToken = localStorage.getItem("token");

    if (userToken !== null) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  };

  if (state.isLoading) {
    return <LoadingScreen />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <CheckLoadRestaurantData.Provider
        value={{ loadRestaurantData, setLoadRestaurantData }}
      >
        <CheckUserAddressType.Provider
          value={{ checkUserAddressType, setCheckUserAddressType }}
        >
          <UserReversedGeoCode.Provider value={{ address, setAddress }}>
            <RestaurantContext.Provider
              value={{ restaurantObj, setRestaurant }}
            >
              <CartCountContext.Provider value={{ cartCount, setCartCount }}>
                <SocketContextProvider>
                  <CartCountProvider>
                    <FetchCartDetailsProvider>
                      <UserProfileProvider>
                        <LoginProvider value={{ login, setLogin }}>
                          <DefaultAddressProvider>
                            <GroceryStoreCategoryProvider>
                              <NearByRestaurantsProvider>
                                <TrySomethingNewProvider>
                                  <FastestNearYouProvider>
                                    <OrderProvider>
                                      <Router>
                                        <InstallBanner />
                                        <div className="font-sans app-container">
                                          <Routes>
                                            <Route
                                              path="/"
                                              element={<Home />}
                                            />
                                            <Route
                                              path="/search"
                                              element={<Search />}
                                            />
                                            <Route
                                              path="/add-address"
                                              element={<AddAddresses />}
                                            />
                                            <Route
                                              path="/orders"
                                              element={<Orders />}
                                            />
                                            <Route
                                              path="/supermarket"
                                              element={<Supermarket />}
                                            />
                                            <Route
                                              path="/sub-categories"
                                              element={<SubCategory />}
                                            />
                                            <Route
                                              path="/grocery-item"
                                              element={<Grocery />}
                                            />
                                            <Route
                                              path="/search-grocery"
                                              element={<SearchGrocery />}
                                            />

                                            <Route
                                              path="/more-categories"
                                              element={<MoreFoods />}
                                            />

                                            <Route
                                              path="/all-categories"
                                              element={<AllCategories />}
                                            />

                                            <Route
                                              path="/fastest"
                                              element={<FastestFoods />}
                                            />

                                            <Route
                                              path="/new-foods"
                                              element={<NewFoods />}
                                            />

                                            <Route
                                              path="/nearby-restaurants"
                                              element={<AllRestaurants />}
                                            />

                                            <Route
                                              path="/food-nav"
                                              element={<FoodPage />}
                                            />

                                            <Route
                                              path="/food-feedbacks"
                                              element={<FoodFeedbacks />}
                                            />

                                            <Route
                                              path="/cart"
                                              element={<Cart />}
                                            />

                                            <Route
                                              path="/checkout"
                                              element={<Checkout />}
                                            />

                                            <Route
                                              path="/grocery-checkout"
                                              element={<GroceryCheckout />}
                                            />

                                            <Route
                                              path="/restaurant"
                                              element={<RestaurantPage />}
                                            />

                                            {/* Public Pages (With Navbar/Footer) */}
                                            <Route element={<PublicLayout />}>
                                              {/* <Route path="/" element={<LandingPage />} /> */}
                                              <Route
                                                path="/faqs"
                                                element={<Faqs />}
                                              />
                                              <Route
                                                path="/privacy"
                                                element={<Privacy />}
                                              />
                                              <Route
                                                path="/terms"
                                                element={<Terms />}
                                              />
                                              <Route
                                                path="/delete-account"
                                                element={<DeleteAccount />}
                                              />
                                              <Route
                                                path="/riders"
                                                element={<Rider />}
                                              />
                                              <Route
                                                path="/vendors"
                                                element={<Vendor />}
                                              />
                                              <Route
                                                path="/contact"
                                                element={<Contact />}
                                              />
                                            </Route>

                                            <Route
                                              element={
                                                <PublicRoute
                                                  userToken={state.userToken}
                                                  verified={state.userVerified}
                                                />
                                              }
                                            >
                                              <Route
                                                index
                                                path="/login"
                                                element={<Login />}
                                              />
                                              <Route
                                                path="/verification-page"
                                                element={<VerificationPage />}
                                              />
                                              <Route
                                                path="/signup"
                                                element={<SignUp />}
                                              />

                                              <Route
                                                path="/forgot-password"
                                                element={<ForgotPassword />}
                                              />
                                              <Route
                                                path="/reset-password"
                                                element={<ResetPassword />}
                                              />
                                            </Route>

                                            <Route
                                              element={
                                                <PrivateRoute
                                                  userToken={state.userToken}
                                                  verified={state.userVerified}
                                                />
                                              }
                                            >
                                              <Route
                                                path="/profile"
                                                element={<Profile />}
                                              />
                                              <Route
                                                path="/contact-us"
                                                element={<ContactUs />}
                                              />
                                              <Route
                                                path="/change-password"
                                                element={<ChangePassword />}
                                              />
                                              <Route
                                                path="/profile-details"
                                                element={<ProfileDetials />}
                                              />
                                              <Route
                                                path="/referral"
                                                element={<Referral />}
                                              />
                                              <Route
                                                path="/wallet"
                                                element={<Wallet />}
                                              />

                                              <Route
                                                path="/shipping-address"
                                                element={<ShippingAddress />}
                                              />
                                              <Route
                                                path="/default-address"
                                                element={<DefaultAddress />}
                                              />
                                              <Route
                                                path="/order-details"
                                                element={<OrderDetails />}
                                              />

                                              <Route
                                                path="/payment"
                                                element={<Payment />}
                                              />

                                              <Route
                                                path="/payment-success"
                                                element={<PaymentSuccess />}
                                              />

                                              <Route
                                                path="/rating-page"
                                                element={<AddRating />}
                                              />

                                              <Route
                                                path="/rider-rating"
                                                element={<RiderRating />}
                                              />

                                              <Route
                                                path="/food-rating"
                                                element={<FoodRating />}
                                              />
                                            </Route>

                                            <Route
                                              path="*"
                                              element={<NotFound />}
                                            />
                                          </Routes>
                                        </div>
                                        <ToastContainer />
                                      </Router>
                                    </OrderProvider>
                                  </FastestNearYouProvider>
                                </TrySomethingNewProvider>
                              </NearByRestaurantsProvider>
                            </GroceryStoreCategoryProvider>
                          </DefaultAddressProvider>
                        </LoginProvider>
                      </UserProfileProvider>
                    </FetchCartDetailsProvider>
                  </CartCountProvider>
                </SocketContextProvider>
              </CartCountContext.Provider>
            </RestaurantContext.Provider>
          </UserReversedGeoCode.Provider>
        </CheckUserAddressType.Provider>
      </CheckLoadRestaurantData.Provider>
    </AuthContext.Provider>
  );
};

export default App;
