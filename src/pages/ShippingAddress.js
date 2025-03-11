import React, { useEffect, useState } from "react";
import axios from "axios";
import AddressTile from "../components/AddressTile";
import { useNavigate } from "react-router-dom";
import useFetchAddresses from "../hooks/useFetchAddresses";
import { BaseUrl } from "../constants/theme";
import Header from "../components/Header";
import Loading from "../components/Loading";
import { toast } from "react-toastify";

const ShippingAddress = () => {
  const navigate = useNavigate();
  const { addresses, isLoading, refetch } = useFetchAddresses();
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    refetch();
  }, []);

  const deleteAddress = async () => {
    if (!deleteId) return;
    const token = localStorage.getItem("token");
    const accessToken = JSON.parse(token);
    setLoading(true);
    try {
      await axios.delete(`${BaseUrl}/api/address/${deleteId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      toast.success("Address deleted successfully", {
        position: "top-center",
        autoClose: 3000,
      });

      setShowModal(false);
      refetch();
    } catch (error) {
      console.error("Error deleting address:", error);
      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white items-center pb-[50px]">
      <Header text="Addresses" />
      <div className="w-full max-w-2xl pt-[20px] px-[12px]">
        {isLoading ? (
          <Loading />
        ) : addresses && addresses.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-lg font-medium">No Address Available...</p>
          </div>
        ) : (
          <div className="overflow-auto max-h-[70vh] space-y-4">
            {addresses?.map((item) => (
              <AddressTile
                key={item._id}
                item={item}
                onClick={() =>
                  navigate("/default-address", { state: { data: item } })
                }
                onDelete={() => confirmDelete(item._id)}
              />
            ))}
          </div>
        )}
      </div>
      <div className="w-full px-[12px] fixed bottom-[40px] flex justify-center z-40">
        <button
          onClick={() => navigate("/add-address")}
          className="max-w-lg w-full py-3 text-white font-bold rounded-lg flex justify-center items-center bg-primary hover:bg-orange-600"
        >
          Add Address
        </button>
      </div>
      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
            <p className="text-[12px] md:text-[14px] font-semibold mb-4">
              Are you sure you want to delete this address?
            </p>
            <div className="flex justify-between">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-[14px]"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-[14px] w-[80px] flex justify-center items-center"
                onClick={deleteAddress}
              >
                {loading ? (
                  <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShippingAddress;
