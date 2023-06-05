import { ACTIONS } from "../App";
import "./Key.css";
const DigitKey = ({ dispatch, digit }) => {
  return (
    <>
      <button
        className="digitKey"
        onClick={() =>
          dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })
        }
      >
        {digit}
      </button>
    </>
  );
};
export default DigitKey;
