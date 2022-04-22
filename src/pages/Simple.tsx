import { useState } from "react";

interface ICard {
  id: string;
  text: string;
}

const Simple = () => {
  const [cards, setCards] = useState<ICard[]>([
    {
      id: "1",
      text: "Card 1",
    },
    {
      id: "2",
      text: "Card 2",
    },
    {
      id: "3",
      text: "Card 3",
    },
    {
      id: "4",
      text: "Card 4",
    },
    {
      id: "5",
      text: "Card 5",
    },
  ]);

  const HOVER_BG_CLASS = "bg-gray-200";

  const dragStart = (evt: React.DragEvent<HTMLLIElement>, card: ICard) => {
    evt.dataTransfer.setData("card", JSON.stringify(card));
  };

  const dragLeave = (evt: React.DragEvent<HTMLLIElement>) => {
    const target = evt.target as HTMLLIElement;
    target.classList.remove(HOVER_BG_CLASS);
  };

  const dragOver = (evt: React.DragEvent<HTMLLIElement>) => {
    evt.preventDefault();
    const target = evt.target as HTMLLIElement;

    if (target.classList.contains(HOVER_BG_CLASS)) {
      return;
    }

    target.classList.add(HOVER_BG_CLASS);
  };

  const drop = (evt: React.DragEvent<HTMLLIElement>, card: ICard) => {
    evt.preventDefault();
    const data: ICard = JSON.parse(evt.dataTransfer.getData("card"));
    const target = evt.target as HTMLLIElement;
    target.classList.remove(HOVER_BG_CLASS);
    setCards((prevCards) => {
      return prevCards.map((item) => {
        if (item.id === card.id) {
          return data;
        }

        if (item.id === data.id) {
          return card;
        }

        return item;
      });
    });
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-4xl font-semibold">Simple DND</h1>
      <ul className="flex gap-4 justify-center mt-5">
        {cards.map((card) => (
          <li
            key={card.id}
            draggable
            onDragStart={(evt) => dragStart(evt, card)}
            onDragOver={dragOver}
            onDragLeave={dragLeave}
            onDrop={(evt) => drop(evt, card)}
            className="w-60 h-80 flex items-center justify-center border-blue-500 border-2 rounded-lg cursor-grab"
          >
            <h2 className="text-xl font-medium select-none">{card.text}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Simple;
