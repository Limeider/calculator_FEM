import { useState } from "react";

export default function CalculatorButton({ symbol, colSpan, onClick, style }) {
  const [isActive, setIsActive] = useState(false);

  if (symbol === "*") {
    symbol = "x";
  }

  return (
    <button
      onClick={onClick}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      onBlur={() => setIsActive(false)}
      className={`${colSpan} rounded-lg h-12`}
      style={{
        backgroundColor: isActive ? style[4] : style[0],
        color: style[1],
        fontSize: style[2],
        boxShadow: style[3],
        transition: "background-color 0.075s",
      }}
    >
      {symbol}
    </button>
  );
}
