const ScoreBoard = ({ scores, currentPlayer }) => {
    return (
      <div className="flex space-x-8 mb-8">
        <div
          className={`text-center ${
            currentPlayer === 1 ? "font-bold text-blue-400" : "text-gray-400"
          }`}
        >
          <p>Jogador 1</p>
          <p>{scores.player1}</p>
        </div>
        <div
          className={`text-center ${
            currentPlayer === 2 ? "font-bold text-blue-400" : "text-gray-400"
          }`}
        >
          <p>Jogador 2</p>
          <p>{scores.player2}</p>
        </div>
      </div>
    );
  };
  
  export default ScoreBoard;