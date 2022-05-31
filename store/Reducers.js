import { ACTIONS } from "./Actions";

const reducers = (state, action) => {
  switch (action.type) {
    case ACTIONS.AUTH:
      return {
        ...state,
        auth: action.payload,
      };
    case ACTIONS.LOGOUT:
      return {
        ...state,
        auth: {},
      };

    case ACTIONS.ADD_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case ACTIONS.TOGGLE_MODAL_SEARCH:
      return {
        ...state,
        showModalSearch: !state.showModalSearch,
      };

    default:
      return state;
  }
};

export default reducers;
