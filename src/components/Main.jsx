import { useEffect, useReducer } from "react";
import Loading from "./Loading";
import Error from "./Error";
import DisplayScreen from "./displayScreen";
import Question from "./Question";
import NextBtn from "./NextBtn";
import Progress from "./Progress";
import Finished from "./Finished";

const inititalState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
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
  if (type === "newAnswer") {
    const question = state.questions.at(state.index);
    return {
      ...state,
      answer: payLoad,
      points:
        payLoad === question.correctOption
          ? state.points + question.points
          : state.points,
    };
  }
  if (type === "nextQuestion") {
    return { ...state, index: state.index + 1, answer: null };
  }
  if (type === "finish") {
    return { ...state, status: "finished" };
  }
  if (type === "restart") {
    return {
      ...state,
      index: 0,
      answer: null,
      points: 0,
      status: "ready",
      questions:state.questions
    }; 
  }
};

const Main = () => {
  const [{ questions, status, index, answer, points }, dispatch] = useReducer(
    reducer,
    inititalState
  );

  // derived states
  const questionsNum = questions.length;
  const maxPoints = questions.reduce((prev, cur) => prev + cur.points, 0);

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
      {status === "active" && (
        <>
          <Progress
            maxPoints={maxPoints}
            points={points}
            index={index}
            questionsNum={questionsNum}
          />
          <Question
            question={questions[index]}
            dispatch={dispatch}
            answer={answer}
          />
          <NextBtn
            questionsNum={questionsNum}
            index={index}
            answer={answer}
            dispatch={dispatch}
          />
        </>
      )}
      {status === "finished" && (
        <Finished points={points} maxPoints={maxPoints} dispatch={dispatch} />
      )}
    </div>
  );
};

export default Main;
