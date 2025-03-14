import React, { useRef, useState, useEffect } from "react";
import { BaseUrl, PlaceholderImage } from "../constants/theme";
import Lottie from "lottie-react";
import axios from "axios";
import debounce from "lodash.debounce";
import { toast } from "react-toastify";
import { IoSearchOutline } from "react-icons/io5";
import { LiaTimesSolid } from "react-icons/lia";
import cookAnimation from "../assets/anime/cook.json";
import BottomNavBar from "../components/BottomNavBar";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const [searchKey, setSearchKey] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const textInputRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      textInputRef.current?.focus();
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  console.log("searchResults: ", searchResults);

  const handleSearch = async (query) => {
    if (!query) {
      setSearchResults([]);
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(`${BaseUrl}/api/foods/search/${query}`);
      setSearchResults(response.data.results);
      setSearchQuery(response.data.query);
    } catch (error) {
      toast.error("Internal server error", {
        position: "top-center",
        autoClose: 3000,
      });

      // onAddressAdded(response.data);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = useRef(debounce(handleSearch, 500)).current;

  useEffect(() => {
    debouncedSearch(searchKey);
  }, [searchKey]);

  const clearSearch = async () => {
    setSearchKey("");
    setSearchResults([]);
  };

  const SearchResultItem = ({ item }) => {
    return (
      <div
        className="flex items-center p-[10px] bg-white shadow-md rounded-lg cursor-pointer hover:shadow-lg transition"
        key={item._id}
        onClick={() => navigate("/food-nav", { state: { data: item } })}
      >
        <img
          src={item.imageUrl[0]}
          alt={item.title}
          className="w-24 h-24 rounded-lg object-cover"
        />
        <div className="mx-4 flex-1 overflow-hidden w-full">
          <h2 className=" text-[12px] md:text-[14px] font-semibold text-gray-900 truncate">
            {item.title}
          </h2>
          <p className="text-gray-600  text-[10px] md:text-[12px] truncate">
            {item.description}
          </p>
          <p className="text-gray-500  text-[10px] md:text-[12px] truncate">
            Preparation time - {item.time} mins
          </p>
          <div className="flex items-center text-gray-800 text-[12px]">
            <span className="text-yellow-500 text-lg">★</span>
            <span className="ml-1">{item.rating?.toFixed(1) || "5.0"}</span>
            <span className="ml-2">({item.ratingCount || 0})</span>
          </div>
        </div>
        <div className="text-right w-[30%]">
          <p className=" text-[12px] md:text-[14px] font-bold text-gray-900">
            {item.price.toLocaleString("en-NG", {
              style: "currency",
              currency: "NGN",
              minimumFractionDigits: 0,
            })}
          </p>
          <p className="text-[12px] text-gray-500 ">{item.restaurantName}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-white items-center pb-[100px]">
      <div className="w-full max-w-2xl">
        <div className="flex items-center mx-[12px] my-4 border border-gray-200 rounded-full bg-gray-200 h-10 sticky top-[20px]  z-40 focus-within:ring-1 focus-within:ring-primary">
          <div className="w-12 h-full flex justify-center items-center bg-lightBlue rounded-l-full">
            <IoSearchOutline className="text-gray-500" size={20} />
          </div>
          <input
            ref={textInputRef}
            className="flex-1 h-full px-[8px] bg-transparent outline-none  md:text-[12px] placeholder:text-[12px]"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            placeholder="What would you like to eat?"
          />
          {searchKey && (
            <button
              className="w-[28px] h-[28px] flex justify-center items-center bg-red-500 rounded-full mr-[10px]"
              onClick={clearSearch}
            >
              <LiaTimesSolid className="text-gray-200" size={18} />
            </button>
          )}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-primary"></div>
          </div>
        ) : searchResults.length === 0 && !searchKey ? (
          <div className="flex flex-col items-center pt-4 px-[12px]">
            <p className="  text-[12px] md:text-[12px] font-medium text-start w-full">
              Popular searches
            </p>
            <div className="flex flex-wrap mt-2 ">
              {[
                "Rice",
                "Spaghetti",
                "Pizza",
                "Burger",
                "Chicken",
                "Ice cream",
                "Shawarma",
                "Pancake",
                "Waffles",
                "Milkshake",
                "Salad",
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => setSearchKey(item)}
                  className="bg-gray-200 px-4 py-1 rounded-full m-[6px] text-black font-light  text-[10px] md:text-[12px]"
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="flex justify-center items-center">
              <Lottie
                animationData={cookAnimation}
                className="w-80 h-80"
                autoPlay
                loop
              />
            </div>
          </div>
        ) : searchResults.length === 0 && searchKey ? (
          <div className="flex flex-col items-center pt-20 px-4">
            <img
              src={PlaceholderImage}
              alt="No results"
              className="w-48 h-48 object-contain"
            />
            <div className="mt-5 text-center">
              <p className=" text-[14px] font-light text-black">
                No results found for
              </p>
              <p className=" text-[12px] font-bold text-black">
                "{searchQuery}"
              </p>
              <p className="text-[12px] text-gray-500 mt-3">
                Check the spelling or try using a different word.
              </p>
            </div>
          </div>
        ) : (
          <div className="px-4">
            {searchResults.length > 0 && (
              <p className="text-[12px] text-gray-500 sticky top-[80px]  z-40">
                {searchResults.length} results for{" "}
                <span className="font-bold text-black">"{searchQuery}"</span>
              </p>
            )}
            <div className="mt-[30px] space-y-4">
              {searchResults.map((item) => (
                <SearchResultItem item={item} />
              ))}
            </div>
          </div>
        )}
      </div>
      <BottomNavBar />
    </div>
  );
};

export default Search;
