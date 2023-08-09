const Options = ({ option, dispatch, index, correctOption, answer }) => {
  const hasAnswered = answer !== null;
  return ( 
    <div className="option">
      <button
        disabled={hasAnswered}
        onClick={() => dispatch({ type: "newAnswer", payLoad: index })}
        className={`btn   ${
          hasAnswered ? (index === correctOption ? "green" : "red") : ""
        } `}
      >
        {option}
      </button>
    </div>
  );
};

export default Options;
