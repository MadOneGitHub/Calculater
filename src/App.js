import React from "react";
import { useReducer } from "react";
import "./App.css";
import OperationKey from "./components/OperationKey";
import DigitKey from "./components/DigitKey";

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        };
      }
      if (payload.digit === "0" && state.currentOperand === "0") return state;

      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }
      if (state.currentOperand == null && state.previousOperand == null)
        return state;
      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      }
      if (payload.operation === "." && state.currentOperand.includes("."))
        return state;

      return {
        ...state,
        operation: payload.operation,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
      };
    case ACTIONS.CLEAR:
      return {};
    case ACTIONS.EVALUATE:
      if (
        state.operation == null ||
        state.currentOperand == null ||
        state.previousOperand == null
      )
        return state;
      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
      };
    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null,
        };
      }
      if (state.currentOperand === null) return state;
      if (state.currentOperand.length === 1) {
        return {
          ...state,
          currentOperand: null,
        };
      }
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };
  }
}
function evaluate({ currentOperand, previousOperand, operation }) {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return "";
  let computation = "";
  switch (operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "x":
      computation = prev * current;
      break;
    case "÷":
      computation = prev / current;
      break;
  }
  return computation.toString();
}

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  return (
    <>
      <div className="App">
        <div className="container">
          <div className="display">
            <div className="previousOperand">
              {previousOperand} {operation}
            </div>
            <div className="currentOperand">{currentOperand}</div>
            <div></div>
          </div>
          <div className="keys">
            <button
              className="logBtn"
              operation="AC"
              onClick={() => dispatch({ type: ACTIONS.CLEAR })}
            >
              AC
            </button>
            <button
              className="logBtn"
              operation="Del"
              onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}
            >
              Del
            </button>
            <OperationKey operation="(" dispatch={dispatch} />
            <OperationKey operation=")" dispatch={dispatch} />
            <DigitKey digit="7" dispatch={dispatch} />
            <DigitKey digit="8" dispatch={dispatch} />
            <DigitKey digit="9" dispatch={dispatch} />
            <OperationKey operation="x" dispatch={dispatch} />
            <DigitKey digit="4" dispatch={dispatch} />
            <DigitKey digit="5" dispatch={dispatch} />
            <DigitKey digit="6" dispatch={dispatch} />
            <OperationKey operation="÷" dispatch={dispatch} />
            <DigitKey digit="1" dispatch={dispatch} />
            <DigitKey digit="2" dispatch={dispatch} />
            <DigitKey digit="3" dispatch={dispatch} />
            <OperationKey operation="+" dispatch={dispatch} />
            <OperationKey operation="." dispatch={dispatch} />
            <DigitKey digit="0" dispatch={dispatch} />
            <button
              className="logBtn"
              operation="eval"
              onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
            >
              =
            </button>
            <OperationKey operation="-" dispatch={dispatch} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
