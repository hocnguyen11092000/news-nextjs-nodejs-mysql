import { createContext, useReducer, useEffect } from "react";
import reducers from "./Reducers";
import { getData } from "../utils/fetchData";
import categoryApi from "../api-client/categoryApi";
import { handleSubView } from "../utils/subView";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const initialState = {
    auth: {},

    categories: [],
    showModalSearch: false,
  };

  const [state, dispatch] = useReducer(reducers, initialState);
  const { cart, auth } = state;

  useEffect(() => {
    const user = localStorage.getItem("next_user");
    if (user) {
      dispatch({ type: "AUTH", payload: JSON.parse(user) });
    }
  }, []);

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      getData("auth/accessToken").then((res) => {
        if (res.err) return localStorage.removeItem("firstLogin");
        dispatch({
          type: "AUTH",
          payload: {
            token: res.access_token,
            user: res.user,
          },
        });
      });
    }

    (async () => {
      const res = await categoryApi.getAll();
      dispatch({
        type: "ADD_CATEGORIES",
        payload: handleSubView(res.category),
      });
    })();
  }, []);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
