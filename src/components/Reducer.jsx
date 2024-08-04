import { evaluate, round } from "mathjs";

export const initialState = "0";

const alphabeticalRegex = /(?!e\+)[a-zA-Z]/;
const operatorRegex = /(?<!e)[+\-*\/]/;
const pointRegex = /[.]/;
const generalError = "Error!";

function reducer(state, action) {
  switch (action.type) {
    case "insert":
      return onInsert(state, action);
    case "delete":
      return onDelete(state, initialState);
    case "reset":
      return onReset(initialState);

    case "calculate":
      return onCalculate(state, operatorRegex, pointRegex);
    default:
      console.log("UNKNOWN ERROR!");
      return initialState;
  }
}

function onInsert(state, action) {
  const arrOfState = state.split(operatorRegex);
  const lastChar = state[state.length - 1];
  const areLastTwoOperators =
    operatorRegex.test(lastChar) && operatorRegex.test(action.payload);
  const areLastTwoPoints =
    pointRegex.test(lastChar) && pointRegex.test(action.payload);
  const hasTwoOperators =
    operatorRegex.test(state) && operatorRegex.test(action.payload);

  const hasMultiplePeriods = checkMultiplePeriods(arrOfState, action);

  const hasMultipleZeroes = checkMultipleZeroes(arrOfState, action);

  if (state.length >= 32) {
    return state;
  } else if (alphabeticalRegex.test(state)) {
    return action.payload;
  } else if (areLastTwoOperators && lastChar === action.payload) {
    return state;
  } else if (areLastTwoOperators && lastChar !== action.payload) {
    const slicedState = state.slice(0, -1);
    return slicedState + action.payload;
  } else if (areLastTwoPoints) {
    return state;
  } else if (hasMultiplePeriods) {
    return state;
  } else if (hasMultipleZeroes) {
    return state;
  } else if (hasTwoOperators) {
    return `${onCalculate(state, operatorRegex, pointRegex) + action.payload}`;
  } else if (operatorRegex.test(lastChar) && action.payload === ".") {
    return state + "0.";
  } else {
    return `${
      state === initialState &&
      !operatorRegex.test(action.payload) &&
      action.payload !== "."
        ? action.payload
        : state + action.payload
    }`;
  }
}

function onDelete(state, initialState) {
  if (state.length === 0 || state === "0") {
    return initialState;
  } else if (state.length === 1) {
    return "0";
  } else {
    return state.slice(0, -1);
  }
}

function onReset(initialState) {
  return initialState;
}

function onCalculate(state, operatorRegex) {
  try {
    const [number] = state.split(operatorRegex);
    if (number && operatorRegex.test(state[state.length - 1])) {
      const operator = state.match(operatorRegex);
      return round(evaluate(`${number + operator + number}`), 8).toString();
    } else {
      const answer = round(evaluate(state), 8);
      return answer.toString();
    }
  } catch (error) {
    return generalError;
  }
}

function checkMultiplePeriods(arrOfState, action) {
  const multiplePeriodsRegex = /\..*\..*/;
  let hasMultiplePeriods = false;
  arrOfState.forEach((element) => {
    if (
      element === arrOfState[arrOfState.length - 1] &&
      multiplePeriodsRegex.test(element + action.payload)
    ) {
      hasMultiplePeriods = true;
    }
  });
  return hasMultiplePeriods;
}

function checkMultipleZeroes(arrOfState, action) {
  const multipleZeroesRegex = /(?<!\d|\.)0{2,}/;
  let hasMultipleZeroes = false;
  const lastElement = arrOfState[arrOfState.length - 1];
  if (lastElement && multipleZeroesRegex.test(lastElement + action.payload)) {
    hasMultipleZeroes = true;
  }
  return hasMultipleZeroes;
}

export default reducer;
