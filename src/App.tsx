import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import PopUpModal from "./components/PopUpModal";
import QuizPage from "./components/QuizPage";
import StartPage from "./components/StartPage";

function App() {
 

  return (
    <div className="App">
      <ToastContainer position="top-center" />
      <PopUpModal />
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/questions" element={<QuizPage />} />
      </Routes>
    </div>
  );
}

export default App;
