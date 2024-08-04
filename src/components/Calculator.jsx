import { useReducer, useState, useEffect, useRef } from "react";
import reducer, { initialState } from "./Reducer";

import { themes } from "../assets/data/data.js";

import CalculatorButtonContainer from "./CalculatorButtonContainer.jsx";
import ThemeChanger from "./ThemeChanger.jsx";

const themeCollection = ["theme1", "theme2", "theme3"];

const keyboardInsertRegex = /[\d.+\-*\/]/;

export default function Calculator() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [theme, setTheme] = useState(1);

  const currentTheme = themeCollection[theme - 1]
    ? themeCollection[theme - 1]
    : "theme1";

  const currentThemeObj = themes[currentTheme];

  const calcSectRef = useRef(null);

  useEffect(() => {
    if (calcSectRef) {
      calcSectRef.current.focus();
    }
  }, []);

  function handleKeyDown(e) {
    if (e.key === "Delete") {
      dispatch({ type: "delete" });
    } else if (e.key === "=" || e.key === "Enter") {
      dispatch({ type: "calculate" });
    } else if (keyboardInsertRegex.test(e.key)) {
      dispatch({ type: "insert", payload: e.key });
    } else if (e.key === "x") {
      dispatch({ type: "insert", payload: "*" });
    }
  }

  return (
    <section
      className="flex justify-center items-center min-h-screen select-none font-league-spartan text-number"
      style={{ backgroundColor: currentThemeObj["main-bg"] }}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      ref={calcSectRef}
    >
      <div className="w-11/12 md:w-base-width">
        <div className="flex justify-between mb-10">
          <div className="flex justify-between items-end w-full">
            <span
              className="h-8 text-4xl font-extrabold"
              style={{ color: currentThemeObj["text-color-1"] }}
            >
              calc
            </span>
            <span
              className="text-sm mr-8 h-4 uppercase"
              style={{ color: currentThemeObj["text-color-1"] }}
            >
              theme
            </span>
          </div>
          <div className="flex justify-self-end">
            <div className="flex flex-col">
              <div
                className="flex justify-evenly text-sm"
                style={{ color: currentThemeObj["text-color-1"] }}
              >
                <span>1</span>
                <span>2</span>
                <span>3</span>
              </div>
              <ThemeChanger
                setTheme={setTheme}
                theme={theme}
                style={[
                  currentThemeObj["toggle-bg"],
                  currentThemeObj["key-bg-2"],
                  currentThemeObj["active-slider-bg"],
                ]}
              />
            </div>
          </div>
        </div>
        <div
          className="mb-6 overflow-x-auto rounded-lg"
          style={{
            backgroundColor: currentThemeObj["screen-bg"],
            color: currentThemeObj["text-color-1"],
          }}
        >
          <div className={"text-6xl text-right h-28 pt-8 pr-4 pl-2"}>
            {state}
          </div>
        </div>
        <CalculatorButtonContainer
          onInsert={(payload) => dispatch({ type: "insert", payload: payload })}
          onDelete={() => dispatch({ type: "delete" })}
          onReset={() => dispatch({ type: "reset" })}
          onCalculate={() => dispatch({ type: "calculate" })}
          style={[
            currentThemeObj["toggle-bg"],
            currentThemeObj["key-bg-1"],
            currentThemeObj["key-bg-2"],
            currentThemeObj["key-bg-3"],
            currentThemeObj["text-white"],
            currentThemeObj["text-color-calculate"],
            currentThemeObj["text-color-2"],
            currentThemeObj["key-shadow-1"],
            currentThemeObj["key-shadow-2"],
            currentThemeObj["key-shadow-3"],
            currentThemeObj["active-del-bg"],
            currentThemeObj["active-reset-bg"],
            currentThemeObj["active-calculate-bg"],
            currentThemeObj["active-normal-bg"],
          ]}
        />
      </div>
    </section>
  );
}
