import { useState, useCallback } from "react";

const ThemeChanger = ({ theme, setTheme, style }) => {
  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
    setTheme((prevTheme) => (prevTheme % 3) + 1);
  };

  const debouncedHandleToggle = useCallback(
    debounce(() => {
      handleToggle();
    }, 300), // Adjust the delay as needed
    [] // Empty dependency array ensures that the debounced function is created once
  );

  function handleKeyDown(e) {
    if (e.code === "Enter") {
      debouncedHandleToggle();
      setIsActive(true);
    }
  }

  function handleKeyUp(e) {
    if (e.code === "Enter") {
      setIsActive(false);
    }
  }

  const getThemeClasses = () => {
    switch (theme) {
      case 1:
        return {
          beforeTransform: "transform translate-x-0",
        };
      case 2:
        return {
          beforeTransform: "transform translate-x-5",
        };
      case 3:
        return {
          beforeTransform: "transform translate-x-10",
        };
      default:
        return {
          beforeTransform: "",
        };
    }
  };

  const themeClasses = getThemeClasses();

  return (
    <div
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      className="flex rounded-3xl"
      style={{ backgroundColor: style[0] }}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      onBlur={() => setIsActive(false)}
    >
      <label className="relative inline-block w-16 h-6">
        <input
          id="check"
          type="checkbox"
          className="hidden"
          onChange={handleToggle}
        />
        <div className="button relative w-full h-full rounded-full transition-colors duration-200">
          <div
            className={`absolute w-4 h-4 rounded-full m-1 transition-transform duration-200 ${themeClasses.beforeTransform}`}
            style={{
              backgroundColor: isActive ? style[2] : style[1],
            }}
          />
        </div>
      </label>
    </div>
  );
};

function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

export default ThemeChanger;
