import Options from "./Options";

const Question = ({ question }) => {
  return (
    <div className="question">
      <h4>{question.question}</h4>
      <div className="options">
        {question.options.map((option) => {
          return <Options key={option} option={option} />;
        })}
      </div>
    </div>
  );
};

export default Question;
