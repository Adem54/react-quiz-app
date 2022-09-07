import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useGlobalContext } from "../context";
import Loading from "./Loading";
const QuizPage = () => {
  const [currentAnswer, setCurrentAnswer] = useState<string>("");

  const {
    getQuestions,
    state,
    handleNextQuestion,
    checkUserAnswerIsRight,

    handleOpenModal,
  } = useGlobalContext();
  const {
    data,
    index,
    currentData,
    answers,
    isLoading,
    userQuizResults,
    openModal,
  } = state;
  const { results } = data;

  useEffect(() => {
    if (results.length === 0) {
      getQuestions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showResult = () => {
    setTimeout(() => {
      if (
        userQuizResults.length > 0 &&
        userQuizResults[index].giveUserRightAnswer
      ) {
        toast.success("Right answer");
      } else {
        toast.error("Wrong answer");
      }
    }, 500);
  };
  
  useEffect(() => {
    if (currentAnswer) {
      showResult();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAnswer]);

  if (isLoading) return <Loading />;

  const correctAnswerProcent = `${
    userQuizResults.length === 0
      ? 0
      : userQuizResults.filter((item: any) => item.giveUserRightAnswer).length
  }/ ${userQuizResults.length}`;
  return (
    <main className="main-question">
      <p className="correct-answers">Correct Answers: {correctAnswerProcent}</p>
      <h1 className="question-title">{currentData?.question}</h1>
      <section className="choices">
        {answers.map((item: string, index: number) => {
          return (
            <p
              key={index}
              onClick={() => {
                checkUserAnswerIsRight({
                  question: currentData?.question,
                  answer: item,
                });
                setCurrentAnswer(item);
              }}
            >
              {item}
            </p>
          );
        })}
      </section>
      <section className="section-btn">
        <button
          className="btn"
          onClick={() => {
            if (results?.length - 1 > index) {
              handleNextQuestion();
            } else {
              handleOpenModal();
            }
          }}
        >
          {results?.length - 1 > index ? "Next Question" : "Show Result"}
        </button>
      </section>
    </main>
  );
};

export default QuizPage;
// Next Question
