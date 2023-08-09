const Progress = ({  index, questionsNum, points, maxPoints }) => {
  return (
    <div className="progress">
      <p>
        question <strong>{index + 1}</strong> / {questionsNum}
      </p>
      <p>
        <strong> points {points}</strong> / {maxPoints}
      </p>
    </div>
  );
};
 
export default Progress;
