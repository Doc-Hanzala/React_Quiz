const Finished = ({ points, maxPoints,dispatch }) => {
  const percentage = Math.ceil((points / maxPoints) * 100);
  return (
    <>
      <div className="finish">
        <p>
          you scored {points} out of {maxPoints} -- ({percentage}%)
        </p>
      </div>
      <button onClick={()=>dispatch({type:"restart"})} className="btn btn-restart" >restart</button>
    </>
  );
};

export default Finished;
