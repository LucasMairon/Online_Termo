import React, { useState } from "react";

const GameBoard = ({ wordToGuess, guesses, onGuess }) => {
  const [currentGuess, setCurrentGuess] = useState("");

  // Função para lidar com cliques de letras
  const handleLetterClick = (letter) => {
    if (currentGuess.length < wordToGuess.length) {
      setCurrentGuess(currentGuess + letter); // Adiciona a letra ao final da palavra atual
    }
  };

  // Função para enviar a palavra
  const handleSubmit = () => {
    if (currentGuess.length === wordToGuess.length) {
      onGuess(currentGuess);
      setCurrentGuess(""); // Limpa a palavra atual após enviar
    } else {
      alert("A palavra deve ter o mesmo número de letras!");
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 bg-gray-900 p-4 rounded-lg max-w-full w-full">
      {/* Contêiner rolável para as tentativas anteriores */}
      <div className="max-h-64 overflow-y-auto mb-4 w-full">
        {guesses.map((guess, guessIndex) => (
          <div key={guessIndex} className="grid grid-cols-5 sm:grid-cols-5 md:grid-cols-5 gap-2">
            {Array.from({ length: wordToGuess.length }).map((_, i) => {
              const letter = guess[i];
              let color = "bg-gray-700"; // Cor padrão
              if (letter === wordToGuess[i]) {
                color = "bg-green-600"; // Verde: letra certa no lugar certo
              } else if (wordToGuess.includes(letter)) {
                color = "bg-yellow-600"; // Amarelo: letra certa no lugar errado
              }
              return (
                <div
                  key={i}
                  className={`w-12 h-12 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center text-white text-xl font-bold ${color}`}
                >
                  {letter || ""}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Exibe a palavra atual */}
      <div className="grid grid-cols-5 sm:grid-cols-5 md:grid-cols-5 gap-2">
        {Array.from({ length: wordToGuess.length }).map((_, index) => (
          <div
            key={index}
            className={`w-12 h-12 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center border-2 border-gray-600 text-xl font-bold`}
          >
            {currentGuess[index] || ""}
          </div>
        ))}
      </div>

      {/* Teclado virtual */}
      <div className="grid grid-cols-6 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
        {Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)).map((letter) => {
          const isCorrect = guesses.some((guess) =>
            Array.from(guess).some((l, idx) => l === letter && l === wordToGuess[idx])
          );
          const isInWord = guesses.some((guess) =>
            Array.from(guess).some((l) => l === letter && wordToGuess.includes(l))
          );

          let color = "bg-gray-700";
          if (isCorrect) {
            color = "bg-green-600";
          } else if (isInWord) {
            color = "bg-yellow-600";
          }

          return (
            <button
              key={letter}
              onClick={() => handleLetterClick(letter)} // Adiciona a próxima posição disponível
              className={`w-12 h-12 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full text-white ${color}`}
            >
              {letter}
            </button>
          );
        })}
      </div>

      {/* Botão de envio */}
      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-blue-600 text-white rounded w-full sm:w-auto"
      >
        Enviar
      </button>
    </div>
  );
};

export default GameBoard;