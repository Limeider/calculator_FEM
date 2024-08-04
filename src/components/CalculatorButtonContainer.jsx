import { calculatorButtonData } from "../assets/data/data.js";
import CalculatorButton from "./CalculatorButton.jsx";

export default function CalculatorButtonContainer({
  onInsert,
  onDelete,
  onReset,
  onCalculate,
  style,
}) {
  return (
    <div
      className="grid grid-cols-4 place-content-center gap-y-4 gap-x-3 xs:gap-6 p-4 xs:p-6 rounded-lg"
      style={{ backgroundColor: style[0] }}
    >
      {calculatorButtonData.map((calcSymbol, index) => {
        const columnSpan =
          calcSymbol === "RESET" || calcSymbol === "="
            ? "col-span-2"
            : "col-span-1";

        let handleClick;
        let buttonBg;
        let textColor;
        let fontSize;
        let boxShadow;
        let activeButtonBg;

        if (calcSymbol === "DEL") {
          handleClick = onDelete;
          buttonBg = style[1];
          textColor = style[4];
          fontSize = "20px";
          boxShadow = `2px 2px 2px ${style[7]}`;
          activeButtonBg = style[10];
        } else if (calcSymbol === "RESET") {
          handleClick = onReset;
          buttonBg = style[1];
          textColor = style[4];
          fontSize = "20px";
          boxShadow = `2px 2px 2px ${style[7]}`;
          activeButtonBg = style[11];
        } else if (calcSymbol === "=") {
          handleClick = onCalculate;
          buttonBg = style[2];
          textColor = style[5];
          fontSize = "20px";
          boxShadow = `2px 2px 2px ${style[8]}`;
          activeButtonBg = style[12];
        } else {
          handleClick = () => onInsert(calcSymbol);
          buttonBg = style[3];
          textColor = style[6];
          fontSize = "32px";
          boxShadow = `1px 1px 1px ${style[9]}`;
          activeButtonBg = style[13];
        }

        return (
          <CalculatorButton
            key={index} // Using index as a key for unique identification
            symbol={calcSymbol}
            colSpan={columnSpan}
            onClick={handleClick}
            style={[buttonBg, textColor, fontSize, boxShadow, activeButtonBg]}
          />
        );
      })}
    </div>
  );
}
