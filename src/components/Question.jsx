import Options from "./Options";
 
const Question = ({ question, dispatch, answer }) => {
  return (
    <div className="question">
      <h4>{question.question}</h4>
      <div className="options">
        {question.options.map((option, index) => {
          return (
            <Options
              key={option}
              option={option}
              dispatch={dispatch}
              index={index}
              correctOption={question.correctOption}
              answer={answer}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Question;
