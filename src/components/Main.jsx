import { useEffect, useReducer } from "react";
import Loading from "./Loading";
import Error from "./Error";
import DisplayScreen from "./displayScreen";
import Question from "./Question";

const inititalState = {
  questions: [],
  status: "loading",
  index: 0,
};

const reducer = (state, action) => {
  const { type, payLoad } = action;
  if (type === "dataRecieved") {
    return { ...state, questions: payLoad, status: "ready" };
  }
  if (type === "error") {
    return { ...state, status: "error" };
  }
  if (type === "active") {
    return { ...state, status: "active" };
  }
};

const Main = () => {
  const [{ questions, status,index }, dispatch] = useReducer(reducer, inititalState);

  const questionsNum = questions.length;

  //   function for fetching questions
  const fetchQuestions = async () => {
    try {
      const response = await fetch("http://localhost:9000/questions");
      const data = await response.json();
      dispatch({ type: "dataRecieved", payLoad: data });
    } catch (error) {
      dispatch({ type: "error" });
    }
  };

  //   use-Effect
  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div className="main">
      {status === "loading" && <Loading />}
      {status === "error" && <Error />}
      {status === "ready" && (
        <DisplayScreen questionsNum={questionsNum} dispatch={dispatch} />
      )}
      {status === "active" && <Question question ={questions[index]} />}
    </div>
  );
};

export default Main;
