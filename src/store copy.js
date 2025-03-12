import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

const AddImage = create((set) => ({
  imageOne: null,
  imageList: [],
  setImageOne: (newState) => set((state) => ({ imageOne: newState })),
  addToList: (newState) =>
    set((state) => ({ imageList: [...state.imageList, newState] })),
  resetImageStore: () =>
    set(() => ({
      imageOne: null,
      imageList: [],
    })),
}));

export { AddImage };
