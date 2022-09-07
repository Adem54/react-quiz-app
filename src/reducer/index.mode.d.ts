
import {ResponseDataType, State, UserQuizResult} from "../context/index";
export type ActionType =
  | { type: "LOADING" }
  | { type: "SUCCESS", payload: ResponseDataType }
  | { type: "ERROR" }
  | {type:"AMOUNT_INPUT",payload:number}
  | {type:"CATEGORY_OPTION",payload:number}
  | {type:"DIFFICULTY_OPTION",payload:string}
  | {type:"NEXT_QUESTION"}
  | {type:"CHECK_ANSWER",payload:UserQuizResult}
  | {type:"OPEN_MODAL"}
  | {type:"CLOSE_MODAL"}
  | {type:"START_SCRATCH",payload:State}


