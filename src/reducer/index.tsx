import { State } from "../context";
import * as AllTypes from "./actions";
import { ActionType } from "./index.mode";

export const reducer = (state: State, action: ActionType): State => {
 

  switch (action.type) {
    case AllTypes.SET_LOADING:
      return { ...state, isLoading: true, error: "" };
    case AllTypes.SET_DATA:
      return { ...state, data: action.payload, isLoading: false };
    case AllTypes.SET_ERROR:
      return { ...state, error: "An error occured" };
    case AllTypes.AMOUNT_INPUT:
      return { ...state, amount_query: action.payload };
    case AllTypes.CATEGORY_OPTION:
      return { ...state, category_query: action.payload };
    case AllTypes.DIFFICULTY_OPTION:
      return { ...state, difficulty_query: action.payload };
    case AllTypes.NEXT_QUESTION:
      return { ...state, index: state.index + 1 };
    case AllTypes.CHECK_ANSWER:
      const lastIndex = state.userQuizResults.length - 1;
      if (
        state.userQuizResults.length === 0 ||
        state.userQuizResults[lastIndex].id !== action.payload.id
      ) {
        return {
          ...state,
          userQuizResults: [...state.userQuizResults, action.payload],
        };
      } else {
        state.userQuizResults[lastIndex] = action.payload;
        return { ...state, userQuizResults: state.userQuizResults };
      }
    case AllTypes.OPEN_MODAL:
      return { ...state, openModal: true };
    case AllTypes.CLOSE_MODAL:
      return { ...state, openModal: false };
      case AllTypes.START_SCRATCH:
        return action.payload;
    default:
      throw new Error(`no mathching action type`);
  }
};
