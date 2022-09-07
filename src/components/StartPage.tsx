import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";
import "./StartPage.css";

interface categoriesType {
  sports: number;
  history: number;
  politics: number;
}
const categories: categoriesType = {
  sports: 21,
  history: 23,
  politics: 24,
};

const difficulties: string[] = ["Easy", "Medium", "Hard"];

const StartPage = () => {
  console.log("StartPage component");
  const {
    getQuestions,
    state,
    handleAmount,
    handleCategory,
    handleDifficulty,
  } = useGlobalContext();
  const { amount_query, isLoading } = state;

  return (
    <main className="main">
      <h1 className="main-title">Setup Quiz</h1>
      <section className="section">
        <p className="subtitle amount-quesions">Number Of Questions</p>
        <input
          type="number"
          value={amount_query}
          min="1"
          max="50"
          onChange={(e) => handleAmount(Number(e.target.value))}
        />
      </section>

      <section className="section">
        <p className="subtitle amount-quesions">Category</p>
        <select
          onChange={(e: React.ChangeEvent<HTMLSelectElement>): void =>
            handleCategory(Number(e.target.value))
          }
        >
          {Object.entries(categories).map((item: any, index: number) => {
            return (
              <option key={item[1]} value={item[1]}>
                {item[0]}
              </option>
            );
          })}
        </select>
      </section>
      <section className="section">
        <p className="subtitle amount-quesions">Select Difficulty</p>
        <select
          onChange={(e: React.ChangeEvent<HTMLSelectElement>): void =>
            handleDifficulty(e.target.value)
          }
        >
          {difficulties.map((item: string, index: number) => {
            return (
              <option key={index} value={item.toLowerCase()}>
                {item}
              </option>
            );
          })}
        </select>
      </section>
      <button className="btn" onClick={() => getQuestions()}>
        <Link to="/questions">Start</Link>
      </button>
    </main>
  );
};

export default StartPage;
