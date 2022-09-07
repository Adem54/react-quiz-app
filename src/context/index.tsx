import { createContext, ReactNode, useContext, useReducer } from "react";
import { reducer } from "../reducer";
import axios from "axios";

const AppContext = createContext<rootState>({} as rootState);

export interface rootState {
  handleAmount: (amount: number) => void;
  handleCategory: (category: number) => void;
  handleDifficulty: (difficulty: string) => void;
  getQuestions: () => void;
  handleNextQuestion: () => void;
  handleOpenModal:()=>void;
  handleCloseModal:()=>void;
  checkUserAnswerIsRight: ({question,answer}:{question:string,answer:string}) => void;
  startFromScratch:()=>void;
  isLoading: boolean;
  data: ResponseDataType;
  error: string;
  amount_query: number;
  category_query: number;
  difficulty_query: string;
  index: number;
  currentData: Result;
  answers: string[];
  userQuizResults: UserQuizResult[];
  openModal:boolean;
}

export interface UserQuizResult {
  id: number;
  question:string;
  user_answer: string;
  giveUserRightAnswer: boolean;
}

export interface ResponseDataType {
  response_code: number;
  results: Result[];
}
export interface Result {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface State {
  isLoading: boolean;
  data: ResponseDataType;
  error: string;
  amount_query: number;
  category_query: number;
  difficulty_query: string;
  index: number;
  currentData: Result;
  answers: string[];
  userQuizResults: UserQuizResult[];
  openModal:boolean;
}

export const initialState: State = {
  isLoading: false,
  data: {
    response_code: 0,
    results: [],
  },
  error: "",
  amount_query: 10,
  category_query: 21, //sports
  difficulty_query: "easy",
  index: 0,
  currentData: {} as Result,
  answers: [],
  userQuizResults: [],
  openModal:false,
};



export const ContextProvider = ({ children }: { children: ReactNode }) => {
  //https://opentdb.com/api.php?amount=50&category=23&difficulty=medium&type=multiple
  const API_ENDPOINT = "https://opentdb.com/api.php?";

  const [state, dispatch] = useReducer(reducer, initialState as State);

const startFromScratch=()=>{
    dispatch({type:"START_SCRATCH",payload:initialState})
}

  const handleAmount = (amount: number): void => {
    dispatch({ type: "AMOUNT_INPUT", payload: amount });
  };

  const handleCategory = (category: number): void => {
    dispatch({ type: "CATEGORY_OPTION", payload: category });
  };

  const handleDifficulty = (difficulty: string): void => {
    dispatch({ type: "DIFFICULTY_OPTION", payload: difficulty });
  };




  const mixChoices = (currentData: Result) => {
    let myAnswers = Array(4)
      .fill("")
      .map((item: string, index: number) => {
        if (index === 3) {
          return currentData.correct_answer;
        } else {
          return currentData.incorrect_answers[index];
        }
      });
  
    const res = Array(4)
      .fill("")
      .map((item: string, index: number) => {
        const random = Math.floor(Math.random() * myAnswers.length);
        const result = myAnswers[random];
        myAnswers.splice(random, 1);
        return result;
      });
  
    return res;
  };

  
  //https://opentdb.com/api.php?amount=50&category=23&difficulty=medium&type=multiple
  //const API_ENDPOINT = "https://opentdb.com/api.php?";

  const getQuestions = async () => {
    const queryUrl = `amount=${state.amount_query}&category=${state.category_query}&difficulty=${state.difficulty_query}&type=multiple`;
    let myUrl = `${API_ENDPOINT}${queryUrl}`;
    dispatch({ type: "LOADING" });
    try {
      const res = await axios.get<ResponseDataType>(myUrl);
      const data = res.data;
      dispatch({ type: "SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "ERROR" });
    }
  };

  //Burda bir baslangic datasi veriyoruz ki ilk data geldiginde biz cunku currentData uzerinden bir fonksiyon olusturduk
  //onun icindeki incorrect_ansers ve correct_answer i kullaniyoruz..
 const currentData = state.data.results[state.index] || {
    
        category: "Sports",
        type: "multiple",
        difficulty: "easy",
        question:
          "Which English football club has the nickname &#039;The Foxes&#039;?",
        correct_answer: "Leicester City",
        incorrect_answers: [
          "Northampton Town",
          "Bradford City",
          "West Bromwich Albion",
        ],
      }

     
      const handleNextQuestion = (): void => {  
        dispatch({ type: "NEXT_QUESTION" });
        
      };
    

  
 if(state.userQuizResults.length===0){
    state.answers=mixChoices(currentData);
 }else if(state.index>state.userQuizResults.length-1){
    state.answers=mixChoices(currentData);
 }



  const checkUserAnswerIsRight = ({question,answer}:{question:string,answer:string}): void => {
    const res =
      currentData.correct_answer.trim().toLowerCase() ===
      answer.trim().toLowerCase()
        ? true
        : false;
    const userResObj: UserQuizResult = {
      id: state.index + 1,
      question:question,
      user_answer: answer,
      giveUserRightAnswer: res,
    };
    dispatch({ type: "CHECK_ANSWER", payload: userResObj });
  };



const handleOpenModal=()=>{
dispatch({type:"OPEN_MODAL"})
}

const handleCloseModal=()=>{
    dispatch({type:"CLOSE_MODAL"})

}

  const values = {
    ...state,
    userQuizResults: state.userQuizResults,
    checkUserAnswerIsRight,
    startFromScratch,
    answers:state.answers,
    currentData,
    handleOpenModal,
    handleCloseModal,
    handleAmount,
    handleCategory,
    handleDifficulty,
    getQuestions,
    handleNextQuestion,
  } as rootState;

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export const useGlobalContext = () => useContext(AppContext);
export default AppContext;

//const state=useFetch({amount:50,category:23,difficulty:"medium"});
