import React from "react";
import "./card.css";

const cardBack = "/img/cover.png";

const singleCard = ({ card, handleChoice, flipped, selected }) => {
  return (
    <div className={"card rounded-sm".concat(selected ? " selected" : "")}>
      <div>
        <img className={"front select-none".concat(flipped ? " flipped" : "")} src={card.src} alt="card front" draggable={false}/>
        <img
          className={"back select-none".concat(flipped ? " flipped" : "")}
          onClick={(e) => {
            e.preventDefault();
            handleChoice(card);
          }}
          onDrag={e => e.preventDefault()}
          src={cardBack}
          alt="card back"
          draggable={false}
        />
      </div>
    </div>
  );
};

export default singleCard;
