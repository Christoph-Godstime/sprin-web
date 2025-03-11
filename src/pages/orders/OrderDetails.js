import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import moment from "moment";
import { useNavigate, useLocation } from "react-router-dom";
import useFetchOrderDetail from "../../hooks/useFetchOrderDetail";
import { useOrder } from "../../context/OrderContext";
import Loading from "../../components/Loading";
import Header from "../../components/Header";
import { toast } from "react-toastify";
import { FaChevronUp, FaChevronDown, FaCopy, FaPhone } from "react-icons/fa";
import { useSpring, animated } from "@react-spring/web";
import { useGesture } from "@use-gesture/react";
import { PiStarFourFill } from "react-icons/pi";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import ScrollToTopOnMount from "../../components/ScrollToTopOnMount";
import { BsArrowLeft, BsShareFill } from "react-icons/bs";
import html2canvas from "html2canvas";

const OrderDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { coordinates, storeId, orderItems, data, storeType } =
    location.state || {};

  const { orderDetails } = useOrder();
  const [updatedData, setUpdatedData] = useState(data);

  const { loading, distanceTime } = useFetchOrderDetail(
    coordinates[0],
    coordinates[1]
  );

  const pageRef = useRef(null);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(
      updatedData?.assignedRider?.riderProfile.phone
    );
    toast.success(
      `Rider phone number copied successfully: ${updatedData?.assignedRider?.riderProfile.phone}`,
      {
        position: "top-center",
      }
    );
  };

  const handlePhone = () => {
    window.location.href = `tel:${updatedData?.assignedRider?.riderProfile.phone}`;
  };

  useEffect(() => {
    const currentOrderDetail = orderDetails.find(
      (order) => order._id === data._id
    );
    if (currentOrderDetail) {
      setUpdatedData(currentOrderDetail);
    }
  }, [orderDetails]);

  const extractNumbers = (inputStr) => {
    if (typeof inputStr !== "string") {
      return [];
    }
    const matched = inputStr.match(/\d+/g);
    return matched ? matched.map((num) => parseInt(num, 10)) : [];
  };

  const formatTime = (time) => {
    return time ? moment(time).format("hh:mm A") : "Pending";
  };

  const progressSteps = [
    { title: "Preparing your order", time: updatedData.preparingTime, step: 1 },
    {
      title: "Your order is ready for pickup",
      time: updatedData.readyTime,
      step: 2,
    },
    {
      title: "Rider accepted order",
      time: updatedData.riderAcceptedTime,
      step: 3,
    },
    { title: "Order in transit", time: updatedData.inTransitTime, step: 4 },
    { title: "Order has arrived", time: updatedData.arrivalTime, step: 5 },
    {
      title: "Order has been delivered",
      time: updatedData.deliveryTime,
      step: 6,
    },
  ];

  const getStepColor = (step) => {
    if (updatedData.progressSteps === 6) return "text-[#f97316]";
    if (step < updatedData.progressSteps) return "text-[#f97316]";
    if (step === updatedData.progressSteps) return "text-[#f97316]";
    return "text-[#fed7aa]";
  };

  const getLineColor = (step) => {
    if (updatedData.progressSteps === 6) return "bg-[#f97316]";
    if (step < updatedData.progressSteps) return "bg-[#f97316]";
    if (step === updatedData.progressSteps) return "bg-[#fed7aa]";
    return "bg-[#fed7aa]";
  };

  const [expanded, setExpanded] = useState(false);

  // Animation for the popup
  const [{ height }, api] = useSpring(() => ({
    height: 150, // Initial collapsed height
    config: { tension: 370, friction: 30 },
  }));

  // Toggle between expanded (300px) and collapsed (150px)
  const togglePopup = () => {
    api.start({ height: expanded ? 150 : 370 });
    setExpanded(!expanded);
  };

  // Gesture handling for dragging
  const bind = useGesture(
    {
      onDrag: ({ movement: [, my], direction: [, dy], velocity }) => {
        if (dy < 0 || (velocity > 0.2 && my < -50)) {
          // Dragging up: expand
          api.start({ height: 370 });
          setExpanded(true);
        } else {
          // Dragging down: collapse
          api.start({ height: 150 });
          setExpanded(false);
        }
      },
    },
    { eventOptions: { passive: false } }
  );

  const handleShare = async () => {
    try {
      const canvas = await html2canvas(pageRef.current, { useCORS: true });
      canvas.toBlob(async (blob) => {
        const file = new File([blob], "order-details.png", {
          type: "image/png",
        });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: "Order Details",
            text: "Check out this order!",
          });
        } else {
          toast.info("Sharing is not supported on this device.", {
            position: "top-center",
          });
        }
      }, "image/png");
    } catch (error) {
      console.error("Error sharing the page:", error);
      toast.error("Failed to share the page.", {
        position: "top-center",
      });
    }
  };

  return (
    <div
      ref={pageRef}
      className="flex flex-col min-h-screen bg-gray-100 items-center pb-[200px]"
    >
      <ScrollToTopOnMount />
      <div className="w-full max-w-2xl flex justify-between items-center h-[60px] sticky top-0  z-40 px-[12px] bg-white shadow-lg">
        <div className="flex justify-start items-center">
          <button onClick={() => navigate(-1)} className="text-black text-xl  ">
            <BsArrowLeft />
          </button>
          <h2 className="text-black  text-[12px] md: text-[14px] font-[500] ml-[30px]">
            Order Details
          </h2>
        </div>
        <button onClick={handleShare} className="text-black text-xl  w-[24px]">
          <BsShareFill />
        </button>
      </div>
      <div className="w-full max-w-2xl pt-[20px] px-[12px]">
        <div className="flex items-center">
          <img
            src={storeId.logoUrl}
            alt="Store Logo"
            className="w-[40px] h-[40px] rounded-full object-cover"
          />
          <div className="ml-4">
            <h2 className=" text-[12px] md: text-[14px] font-semibold">
              {storeId.title}
            </h2>
            <p className="text-gray-600  text-[10px] md: text-[12px]">
              {orderItems.length} Items • ₦{data.orderTotal.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Order Items */}
        <div className="space-y-[24px]">
          {data.orderItems.map((item, index) => (
            <div className="bg-white p-4 rounded-lg shadow-md mt-4">
              <div className="flex justify-between items-baseline">
                <h2 className="text-base font-[500] text-gray-900">
                  Pack {index + 1}
                </h2>
              </div>
              <div className="flex justify-between items-center mt-[8px]">
                <div>
                  <div className="flex items-baseline">
                    <div className="w-fit ">
                      <PiStarFourFill className="text-primary" />
                    </div>
                    <div className="mx-[10px]">
                      <h3 className=" text-[12px] font-[400] text-gray-900">
                        {item.title}
                      </h3>
                      <p className=" text-[10px] md: text-[12px] text-gray-500 mt-1">
                        {item.price.toLocaleString("en-NG", {
                          style: "currency",
                          currency: "NGN",
                          minimumFractionDigits: 0,
                        })}
                      </p>
                    </div>
                  </div>
                  <p className=" text-[10px] md: text-[12px] text-gray-700 mt-1">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-[80px] h-[80px] rounded-lg object-cover"
                />
              </div>
              {item.additives.length > 0 && (
                <div className="bg-gray-100 p-3 rounded-lg mt-3">
                  <h4 className="font-medium  text-[10px] md: text-[12px]">
                    Additives and Toppings
                  </h4>
                  <div className="mt-2">
                    {item.additives.map((additive) => (
                      <div
                        key={additive.id}
                        className="flex justify-between  text-[10px] md: text-[12px]"
                      >
                        <span className="text-gray-700">{additive.title}</span>
                        <span className="text-gray-700">
                          {Number(additive.price).toLocaleString("en-NG", {
                            style: "currency",
                            currency: "NGN",
                            minimumFractionDigits: 0,
                          })}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {item.instructions && (
                <div className="bg-gray-100 p-3 rounded-lg mt-3">
                  <h4 className="font-medium  text-[10px] md: text-[12px] mb-1">
                    Instructions
                  </h4>
                  <p className=" text-[10px] md: text-[12px] text-gray-700">
                    {item.instructions}
                  </p>
                </div>
              )}
              {updatedData.orderStatus === "Delivered" &&
              item.rated === false &&
              storeType === "Restaurant" ? (
                <div className="flex justify-center mx-3 mt-4">
                  <button
                    className="bg-primary  text-[12px] md: text-[14px] text-white px-4 py-2 rounded-lg"
                    onClick={() =>
                      navigate("/order-rating", {
                        state: {
                          foodId: item.productId,
                          orderId: data._id,
                          orderItemId: item._id,
                          imageUrl: item.imageUrl,
                        },
                      })
                    }
                  >
                    Rate This Pack
                  </button>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          ))}
        </div>

        <div>
          {updatedData.orderStatus !== "Delivered" && (
            <div className="mt-[30px] px-[12px] flex flex-col items-center bg-white rounded-lg py-3">
              <h3 className=" text-[14px] font-bold">
                Delivery Confirmation Code
              </h3>
              <p className=" text-[18px] font-bold text-primary">
                {updatedData.riderSecretCode || "Not Available"}
              </p>
              <p className=" text-[12px] text-gray-500 mt-1">
                Show this code to your rider
              </p>
            </div>
          )}

          <div className="my-[30px] bg-white px-[12px] rounded-lg ">
            {progressSteps.map((step, index) => (
              <div key={index} className="relative flex items-center h-[80px]">
                {/* Parent container for checkmark & progress line */}
                <div className="relative w-8 flex justify-center items-center">
                  {/* Progress line (behind the checkmark) */}
                  {index < progressSteps.length - 1 && (
                    <div
                      className={`absolute left-1/2 top-0 w-px h-[80px] ${getLineColor(
                        step.step
                      )} z-0`}
                    ></div>
                  )}
                  {/* Checkmark (above the progress line) */}
                  <IoCheckmarkCircleSharp
                    size={20}
                    className={`relative z-10 bg-white ${getStepColor(
                      step.step
                    )}`}
                  />
                </div>
                <div className="flex-1 pl-3">
                  <p className={`text-sm ${getStepColor(step.step)}`}>
                    {step.title}
                  </p>
                </div>
                <div className="w-20 text-right">
                  <p className={`text-xs ${getStepColor(step.step)}`}>
                    {formatTime(step.time)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {[
        "Rider Accepted Order",
        "Out for Delivery",
        "Arrived",
        "Delivered",
      ].includes(updatedData.orderStatus) && (
        <animated.div
          {...bind()}
          style={{ height }}
          className="fixed bottom-0 bg-white w-full max-w-2xl flex flex-col justify-around pt-[6px] pb-[4px] rounded-t-[20px] shadow-md shadow-gray-400 z-40"
        >
          <button
            onClick={togglePopup}
            className="w-full flex justify-center items-center text-gray-600 mb-2"
          >
            {expanded ? <FaChevronDown size={20} /> : <FaChevronUp size={20} />}
          </button>
          <div className="flex flex-col flex-1 pb-5 bg-gray-100">
            <div className="bg-white p-4 rounded-lg mx-3 my-3">
              {updatedData?.orderStatus === "Delivered" &&
              updatedData?.riderRated === false ? (
                <div className="flex justify-center my-3 mx-3">
                  <button
                    className="bg-primary  text-[12px] md: text-[14px] text-white px-4 py-2 rounded-lg"
                    onClick={() =>
                      navigate("/rider-rating", {
                        state: {
                          riderId: updatedData?.assignedRider?._id,
                          orderId: updatedData?._id,
                          riderFirstName:
                            updatedData?.assignedRider?.riderProfile?.firstName,
                          riderLastName:
                            updatedData?.assignedRider?.riderProfile?.lastName,
                          imageUrl: updatedData?.assignedRider?.imageUrl,
                        },
                      })
                    }
                  >
                    Rate This Rider
                  </button>
                </div>
              ) : null}

              <h2 className=" text-[12px] md: text-[14px] font-semibold mb-4">
                Delivery Rider Details
              </h2>

              <div className="flex justify-between items-center mb-4">
                <p className=" text-[10px] md: text-[12px] font-medium">
                  {updatedData?.assignedRider?.vehicleType}, {"  "}
                  {updatedData?.assignedRider?.vehicleBrand}
                </p>
                {updatedData?.assignedRider?.plateNumber && (
                  <span className=" text-[10px] md: text-[12px] bg-gray-200 px-2 py-1 uppercase tracking-wide rounded">
                    {updatedData?.assignedRider?.plateNumber}
                  </span>
                )}
              </div>

              <div className="border-t border-gray-300 opacity-70 w-full mb-4"></div>

              <div className="flex justify-between items-center mb-4">
                <img
                  src={updatedData?.assignedRider?.imageUrl}
                  alt="Rider"
                  className="w-12 h-12 rounded-full"
                />
                <p className=" text-[10px] md: text-[12px] text-blue-500 w-1/2 text-right truncate">
                  {updatedData?.assignedRider?.riderProfile?.firstName} {"   "}
                  {updatedData?.assignedRider?.riderProfile?.lastName}
                </p>
              </div>

              <div className="flex justify-between items-center mb-4">
                <p className=" text-[10px] md: text-[12px] font-medium">
                  Mobile Number
                </p>
                <div className="flex items-center space-x-[20px] w-1/2 justify-end">
                  <span className="text-primary truncate">
                    {updatedData?.assignedRider?.riderProfile?.phone}
                  </span>
                  <button onClick={handlePhone} className="text-black text-lg">
                    <FaPhone />
                  </button>
                  <button
                    onClick={copyToClipboard}
                    className="text-black text-lg"
                  >
                    <FaCopy />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </animated.div>
      )}
    </div>
  );
};

export default OrderDetails;
