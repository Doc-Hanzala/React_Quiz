const DisplayScreen = ({ questionsNum, dispatch }) => {
  return (
    <div className="display">
      <h2>welcome to the react quiz</h2>
      <p>{questionsNum} questions included in your quiz</p>
      <button onClick={() => dispatch({type:"active"})} className="btn">
        let's start
      </button>
    </div>
  );
};

export default DisplayScreen;
