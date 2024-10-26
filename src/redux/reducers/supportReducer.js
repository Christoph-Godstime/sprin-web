import { GLOBALTYPES } from "../actions/globalTypes";

const initialStore = {};

const supportReducer = (state = initialStore, action) => {
  switch (action.type) {
    case GLOBALTYPES.SUPPORT:
      return action.payload;
    default:
      return state;
  }
};

export default supportReducer;
