import { ACTIONS } from "../App";
import "./Key.css";
const OperationKey = ({ dispatch, operation }) => {
  return (
    <>
      <button
        className="operationKey"
        onClick={() =>
          dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } })
        }
      >
        {operation}
      </button>
    </>
  );
};
export default OperationKey;
