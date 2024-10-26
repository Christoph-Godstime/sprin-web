import { GLOBALTYPES } from "./globalTypes";
import { postDataApi } from "../../utils/fetchData";
import valid from "../../utils/validate";

export const supportConversation = (data) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    const res = await postDataApi("account", data);

    dispatch({
      type: GLOBALTYPES.SUPPORT,
      payload: { user: res.data.account },
    });

    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { success: res.data.message },
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: error?.response?.data?.message },
    });
  }
};
