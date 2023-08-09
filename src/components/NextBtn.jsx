const NextBtn = ({ answer, dispatch, questionsNum, index }) => {
  if (answer === null) return null;

  if (index < questionsNum - 1) {
    return (
      <button
        onClick={() => dispatch({ type: "nextQuestion" })}
        className="btn "
      >
        next
      </button>
    );
  }

  if (index === questionsNum - 1) {
    return (
      <button onClick={() => dispatch({ type: "finish" })} className="btn">
        finish
      </button>
    );
  }

 
};

export default NextBtn;
