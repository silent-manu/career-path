import { useSelector, useDispatch } from "react-redux";

import classes from "./Counter.module.css";
import { counterActions } from "../store/counter";

const _INCREMENT = 7;

const Counter = () => {
  const dispatch = useDispatch();
  const { counter, showCounter } = useSelector((state) => state.counter);

  const incrementHandler = () => {
    dispatch(counterActions.counterIncrement());
  };
  const decrementHandler = () => {
    dispatch(counterActions.counterDecrement());
  };
  const incrementByValueHandler = () => {
    dispatch(counterActions.counterIncrementByValue(_INCREMENT));
  };
  const toggleCounterHandler = () => {
    dispatch(counterActions.counterToggle());
  };
  const resetCounterHandler = () => {
    dispatch(counterActions.counterReset());
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {showCounter && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={incrementByValueHandler}>
          Increment by {_INCREMENT}
        </button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
      <div>
        <button onClick={toggleCounterHandler}>Toggle Counter</button>
        <button onClick={resetCounterHandler}>Reset Counter</button>
      </div>
    </main>
  );
};

export default Counter;
