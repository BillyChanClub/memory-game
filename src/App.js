import React, { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/singleCard";

const cardImages = [
  { src: "/img/astral.png", matched: false },
  { src: "/img/bunny.png", matched: false },
  { src: "/img/fields.png", matched: false },
  { src: "/img/hamster.png", matched: false },
  { src: "/img/pug.png", matched: false },
  { src: "/img/vader.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setchoiceTwo] = useState(null);
  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setCards(shuffledCards);
    setChoiceOne(null);
    setchoiceTwo(null);
    setTurns(0);
  };

  const handleChoice = (card) => {
    if (choiceOne == null) {
      setChoiceOne(card);
      return;
    }
    if (choiceTwo == null) {
      setchoiceTwo(card);
    }
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      const match = choiceOne.id !== choiceTwo.id && choiceOne.src === choiceTwo.src;
      if (match) {
        setCards((prevCards) => {
          return prevCards.map((prevCard) => {
            if (prevCard.src === choiceOne.src) {
              return { ...prevCard, matched: true };
            } else {
              return prevCard;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 500);
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetTurn = () => {
    setChoiceOne(null);
    setchoiceTwo(null);
    setTurns((prev) => prev + 1);
  };

  console.log(cards);

  return (
    <div className="App text-center mx-auto overflow-hidden bg-neutral-800 text-slate-100 min-h-screen">
      <h1 className="text-4xl my-4">Memory Game</h1>
      <button className="text-2xl my-4 border rounded-md py-2 px-5 active:bg-slate-700" onClick={shuffleCards}>New Game</button>

      <div className="grid grid-cols-4 m-4 gap-2">
        {cards.map((card) => {
          return (
            <SingleCard
              key={card.id}
              card={card}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              selected={card === choiceOne || card === choiceTwo}
            ></SingleCard>
          );
        })}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
