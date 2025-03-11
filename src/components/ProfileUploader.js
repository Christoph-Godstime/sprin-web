import React, { useState } from "react";
import ImageUploading from "react-images-uploading";
import { uploadToFirebase } from "../firebase-config";
import { AddImage } from "../store";
import { FaCamera } from "react-icons/fa";

const ProfileUploader = ({ selectedImage, setSelectedImage, currentImage }) => {
  const [loading, setLoading] = useState(false);

  const addToList = AddImage((state) => state.addToList);
  const resetImageStore = AddImage((state) => state.resetImageStore);

  function generateRandomTitle(length = 26) {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  }

  const onChange = async (imageList) => {
    if (imageList.length > 0) {
      setLoading(true);
      try {
        const file = imageList[0].file;
        const title = generateRandomTitle();

        if (!file) {
          console.error("No file selected for upload.");
          return;
        }

        const uploadResponse = await uploadToFirebase(file, title);

        // Avoid setting state if the value is already set
        if (selectedImage !== uploadResponse.downloadUrl) {
          setSelectedImage(uploadResponse.downloadUrl);
        }

        if (!imageList.includes(uploadResponse.downloadUrl)) {
          addToList(uploadResponse.downloadUrl);
        }
      } catch (error) {
        console.error("Image upload error:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <ImageUploading
      value={selectedImage ? [{ dataURL: selectedImage }] : []}
      onChange={onChange}
      dataURLKey="dataURL"
    >
      {({ imageList: uploadedImages, onImageUpload }) => (
        <div
          onClick={onImageUpload}
          className="bg-gray-100 w-[100px] h-[100px] flex justify-center items-center border border-gray-300 rounded-full cursor-pointer relative overflow-hidden"
        >
          {loading ? (
            <div className="w-[40px] h-[40px] border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              {selectedImage === currentImage ? (
                <img
                  src={currentImage}
                  alt="Selected"
                  className="w-full h-full rounded-[10px] object-contain"
                />
              ) : (
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="w-full h-full rounded-[10px] object-contain"
                />
              )}
            </>
          )}{" "}
          {selectedImage === currentImage && (
            <div className="w-[50px] h-[50px] rounded-full bg-[#FFA50040] flex justify-center items-center absolute">
              <FaCamera className="text-primary  text-[16px]" />
            </div>
          )}
        </div>
      )}
    </ImageUploading>
  );
};

export default ProfileUploader;
