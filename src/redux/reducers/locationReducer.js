const initialState = {
  rider: {
    id: null,
    latitude: null,
    longitude: null,
  },
};

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_RIDER_LOCATION":
      return {
        ...state,
        rider: {
          ...state.rider,
          latitude: action.payload.latitude,
          longitude: action.payload.longitude,
        },
      };
    default:
      return state;
  }
};

export default locationReducer;
