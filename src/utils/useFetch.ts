
import { useReducer, useEffect } from "react";
import axios from "axios";
import { ResponseDataType } from "../context";

export type fetchStateType = {
  isLoading: boolean;
  data: ResponseDataType;
  error: string;
};

const initialData: fetchStateType = {
  isLoading: false,
  data: {} as ResponseDataType,
  error: "",
};

type ActionType =
  | { type: "LOADING" }
  | { type: "SUCCESS"; payload: ResponseDataType }
  | { type: "ERROR"; payload: string };


const useFetchReducer = (
  state: fetchStateType,
  action: ActionType
): fetchStateType => {
  switch (action.type) {
    case "LOADING":
      return { ...state, isLoading: true, error: "" };
    case "SUCCESS":
      return { ...state, data: action.payload, isLoading: false };
    case "ERROR":
      return { ...state, error: action.payload, isLoading: false };

    default:
      return state;
  }
};

const API_ENDPOINT = "https://opentdb.com/api.php?";

export const useFetch = ({
  amount,
  category,
  difficulty,
}: {
  amount: number;
  category: number;
  difficulty: string;
}) => {
  const [state, dispatch] = useReducer(useFetchReducer, initialData);

  const fetchQuestions = async (url: string) => {
    console.log("url::::",url);
    dispatch({ type: "LOADING" });
    try {
      const res = await axios.get<ResponseDataType>(url);
      const data = res.data;
      dispatch({ type: "SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "ERROR", payload: " An error occured " });
    }
  };

  //https://opentdb.com/api.php?amount=50&category=23&difficulty=medium&type=multiple

  useEffect(() => {
    fetchQuestions(
      `${API_ENDPOINT}amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`
    );
  }, [amount, category, difficulty]);

  console.log("state::::",state);
  return  state;
};
