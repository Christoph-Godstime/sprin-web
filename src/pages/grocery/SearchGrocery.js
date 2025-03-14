import React, { useRef, useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BaseUrl, PlaceholderImage } from "../../constants/theme";
import axios from "axios";
import debounce from "lodash.debounce";
import GroceryTile from "../../components/GroceryTile";
import { LoginContext } from "../../context/LoginContext";
import { FetchCartDetailsContext } from "../../context/FetchCartDetailsContext";
import CartButton from "../../components/CartButton";
import { toast } from "react-toastify";
import { IoSearchOutline } from "react-icons/io5";
import { LiaTimesSolid } from "react-icons/lia";

const SearchGrocery = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { storeId } = location.state || {};

  const { refetchCartDetails } = useContext(FetchCartDetailsContext);

  const { login, setLogin } = useContext(LoginContext);

  const [searchKey, setSearchKey] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const textInputRef = useRef(null);

  const handleSearch = async (query) => {
    if (!query) {
      setSearchResults([]);
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(
        `${BaseUrl}/api/grocery/user-search/${query}/${storeId}`
      );
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

  useEffect(() => {
    if (login) {
      refetchCartDetails();
    }
  }, []);

  const SearchResultItem = ({ item, index }) => {
    return <GroceryTile item={item} index={index} />;
  };

  return (
    <div className="flex flex-col h-dvh bg-white items-center pb-[200px]">
      <div className="w-full max-w-2xl">
        <div className="flex items-center mx-[12px] my-4 border border-gray-200 rounded-full bg-gray-200 h-10 sticky top-[20px]  z-40 focus-within:ring-1 focus-within:ring-primary">
          <div className="w-12 h-full flex justify-center items-center bg-lightBlue rounded-l-full">
            <IoSearchOutline className="text-gray-500" size={20} />
          </div>
          <input
            ref={textInputRef}
            className="flex-1 h-full px-[8px] bg-transparent outline-none  text-[12px] placeholder:text-[12px]"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            placeholder="What are you searching for?"
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
                "Ice cream",
                "Bread",
                "yoghurt",
                "Milk",
                "Water",
                "Indomie",
                "Vitamilk",
                "Toothpaste",
                "Golden morn",
                "Custard",
                "Malt",
                "Detergent",
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

            <div className="grid grid-cols-3 gap-[4px] place-items-center mt-[20px]">
              {searchResults.map((item) => (
                <SearchResultItem key={item._id} item={item} />
              ))}
            </div>
          </div>
        )}
        <CartButton />
      </div>
    </div>
  );
};

export default SearchGrocery;
