import { useState } from 'react';

export default function RankButton({
  index,
  beats,
  setBeats,
  color = 0,
  disable = false,
}) {
  const colorList = ['#FFFFFF', '#89BA71', '#31601B'];
  const [colorIndex, setColorIndex] = useState(color);

  const changeColor = () => {
    const currentBeats = beats;
    if (!disable) {
      if (colorIndex === 0) {
        setColorIndex(1);
        currentBeats[index] = 1;
      } else if (colorIndex === 1) {
        setColorIndex(2);
        currentBeats[index] = 2;
      } else {
        setColorIndex(0);
        currentBeats[index] = 0;
      }
    }
    setBeats([...currentBeats]);
  };

  return (
    <svg
      height="30"
      width="30"
      onClick={() => {
        changeColor();
      }}
    >
      <circle
        cx="16"
        cy="16"
        r="7"
        stroke="black"
        strokeWidth="1"
        fill={disable ? colorList[color] : colorList[colorIndex]}
      />
    </svg>
  );
}
