import { create } from "zustand";

const LoginStore = create((set) => ({
  isLoggedIn: "LOGGED_OUT",
  statusEnum: {
    LOGGED_IN: "LOGGED_IN",
    LOGGED_OUT: "LOGGED_OUT",
    NOT_VERIFIED: "NOT_VERIFIED",
    VERIFIED: "VERIFIED",
    NOT_REGISTERED: "NOT_REGISTERED",
  },
  isLoading: false,
  isObscure: false, // Fixed typo (was "Obsecure")
  userToken: null,

  // Actions
  setUserToken: (token) => set({ userToken: token }),
  setLoggedIn: (status) => set({ isLoggedIn: status }),
  toggleObscure: () => set((state) => ({ isObscure: !state.isObscure })),
  startLoader: () => set({ isLoading: true }),
  stopLoader: () => set({ isLoading: false }),
  toggleLoader: (newState) => set({ isLoading: newState }),
}));

const SignupStore = create((set) => ({
  isLoading: false,
  isObsecure: false,
  toggleObsecure: (newState) => set((state) => ({ isObsecure: newState })),
  toggleLoader: (newState) => set((state) => ({ isLoading: newState })),
}));

const RestaurantRegistrationStore = create((set) => ({
  isLoading: false,
  location: null,
  address: "",
  posstalCode: "",
  region: {
    latitude: 5.788121544177521,
    longitude: 6.108269691467286,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  },
  pin: {
    latitude: 5.788121544177521,
    longitude: 6.108269691467286,
  },
  setPin: (pin) => set((state) => ({ pin: pin })),
  setRegion: (region) => set((state) => ({ region: region })),
  setLocation: (location) => set((state) => ({ location: location })),
  setPostalCode: (postalCode) => set((state) => ({ postalCode: postalCode })),
  setAddress: (address) => set((state) => ({ address: address })),
  toggleLoader: () => set((state) => ({ isLoading: !state.isLoading })),
}));

const VerificationStore = create((set) => ({
  code: "",
  error: null,
  isLoading: false,
  email: "",
  setEmail: (newState) => set(() => ({ email: newState })),
  setError: (newState) => set(() => ({ error: newState })),
  setCode: (newState) => set((state) => ({ CODE: newState })),
  toggleLoader: () => set((state) => ({ isLoading: !state.isLoading })),
}));

const Restaurant = create((set) => ({
  restaurant: "",
  token: null,
  setToken: (token) => set((state) => ({ token: token })),
  setRestaurant: (newState) => set((state) => ({ restaurant: newState })),
}));

const AddFoodStore = create((set) => ({
  imageOne: null,
  imageTwo: null,
  imageThree: null,
  imageFour: null,
  imageList: [],
  setImageOne: (newState) => set((state) => ({ imageOne: newState })),
  setImageTwo: (newState) => set((state) => ({ imageTwo: newState })),
  setImageThree: (newState) => set((state) => ({ imageThree: newState })),
  setImageFour: (newState) => set((state) => ({ imageFour: newState })),
  addToList: (newState) =>
    set((state) => ({ imageList: [...state.imageList, newState] })),
  resetImageStore: () =>
    set(() => ({
      imageOne: null,
      imageTwo: null,
      imageThree: null,
      imageFour: null,
      imageList: [],
    })),
}));

const FoodsDataStore = create((set) => ({
  categories: null,
  foodValue: "",
  foodDescription: "",
  foodPrice: "",
  preparationTime: "",
  foodTags: "",
  additiveTitle: "",
  additivePrice: "",
  additiveList: [],
  setAdditiveList: (newState) => set((state) => ({ additiveList: newState })),
  setAdditivePrice: (newState) => set((state) => ({ additivePrice: newState })),
  setAdditiveTitle: (newState) => set((state) => ({ additiveTitle: newState })),
  setFoodTags: (newState) => set(() => ({ foodTags: newState })),

  setFoodValue: (newState) => set((state) => ({ foodValue: newState })),
  setCategories: (newState) => set((state) => ({ categories: newState })),
  setFoodPrice: (newState) => set((state) => ({ foodPrice: newState })),
  setFoodDescription: (newState) =>
    set((state) => ({ foodDescription: newState })),
  setPreparationTime: (newState) =>
    set((state) => ({ preparationTime: newState })),
  resetState: () =>
    set(() => ({
      categories: null,
      foodValue: "",
      foodDescription: "",
      foodPrice: "",
      preparationTime: "",
      foodTags: "",
      additiveTitle: "",
      additivePrice: "",
      additiveList: [],
    })),
}));
// const [additiveList, setAdditiveList] = useState([]);

const WithdrawalStore = create((set) => ({
  cardHolder: "",
  bank: "",
  account: "",
  branch: "",
  amount: "",
  setCardHolder: (newState) => set((state) => ({ cardHolder: newState })),
  setBank: (newState) => set((state) => ({ bank: newState })),
  setAccount: (newState) => set((state) => ({ account: newState })),
  setBranch: (newState) => set((state) => ({ branch: newState })),
  setAmount: (newState) => set((state) => ({ amount: newState })),
}));

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

export {
  LoginStore,
  RestaurantRegistrationStore,
  SignupStore,
  VerificationStore,
  WithdrawalStore,
  AddFoodStore,
  FoodsDataStore,
  AddImage,
};
