import React, { useState } from "react";
import GameBoard from "./components/GameBoard";
import ScoreBoard from "./components/ScoreBoard";

const App = () => {
  const [wordToGuess, setWordToGuess] = useState(generateRandomWord()); // Palavra secreta
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState(1); // Jogador atual
  const [guesses, setGuesses] = useState([]); // Tentativas dos jogadores
  const [gameOver, setGameOver] = useState(false); // Estado do jogo

  // Função para gerar uma palavra aleatória
  function generateRandomWord() {
    const words = [
      "AMOR", "CASA", "FOGO", "LUAR", "RISO",
      "PAZ", "SOL", "LUA", "VIDA", "MÃE",
      "PAI", "MAR", "CÉU", "FLOR", "ARCO",
      "LAGO", "PÃO", "CAOS", "SAÚDE", "CALMA",
      "FORÇA", "LIVRO", "ÁGUA", "PEIXE", "FRUTO",
      "CORPO", "MUNDO", "TEMPO", "FÉ", "DEUS"
    ];
    return words[Math.floor(Math.random() * words.length)];
  }

  // Função para lidar com uma tentativa
  const handleGuess = (guess) => {
    const newGuesses = [...guesses, guess];
    setGuesses(newGuesses);

    let scoreIncrement = 0;

    // Verifica cada letra da palavra
    for (let i = 0; i < guess.length; i++) {
      if (guess[i] === wordToGuess[i]) {
        scoreIncrement += 10; // Letra certa no lugar certo
      } else if (wordToGuess.includes(guess[i])) {
        scoreIncrement += 5; // Letra certa no lugar errado
      }
    }

    // Atualiza o score do jogador atual
    if (currentPlayer === 1) {
      setPlayer1Score(player1Score + scoreIncrement);
    } else {
      setPlayer2Score(player2Score + scoreIncrement);
    }

    // Verifica se o jogador acertou a palavra
    if (guess === wordToGuess) {
      if (currentPlayer === 1) {
        setPlayer1Score(player1Score + 100);
      } else {
        setPlayer2Score(player2Score + 100);
      }
      alert(`Jogador ${currentPlayer} venceu!`);
      setGameOver(true); // Encerra o jogo
    } else {
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1); // Troca de jogador
    }
  };

  // Função para resetar o jogo
  const resetGame = () => {
    setWordToGuess(generateRandomWord()); // Gera uma nova palavra
    setPlayer1Score(0);
    setPlayer2Score(0);
    setCurrentPlayer(1);
    setGuesses([]);
    setGameOver(false);
  };

  if (gameOver) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
        <h1 className="text-4xl sm:text-3xl md:text-4xl font-bold mb-8">Fim de Jogo!</h1>
        <ScoreBoard
          scores={{ player1: player1Score, player2: player2Score }}
          currentPlayer={null}
        />
        <button
          onClick={resetGame}
          className="px-4 py-2 bg-green-600 text-white rounded w-full sm:w-auto"
        >
          Reiniciar Jogo
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-4xl sm:text-3xl md:text-4xl font-bold mb-8">Jogo de Palavras</h1>
      <ScoreBoard
        scores={{ player1: player1Score, player2: player2Score }}
        currentPlayer={currentPlayer}
      />
      <GameBoard wordToGuess={wordToGuess} guesses={guesses} onGuess={handleGuess} />
    </div>
  );
};

export default App;