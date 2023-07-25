import './App.css';
import { useReducer, useEffect, useCallback, useState } from 'react';
import DigitButton from './components/DigitButton';
import OperationButton from './components/OperationButton';

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  DELETE_DIGIT: 'delete-digit',
  OPERATION: 'opration',
  EVALUATE: 'evaluate',
  CLEAR: 'clear'
};

function reducer(state, {type, payload}) {
  switch(type) {
    case ACTIONS.ADD_DIGIT :
      //console.log(payload.digit, state.currentOperand);
      if (state.ACTIONSoverwrite) {
        return {
          ...state, 
          currentOperand: payload.digit,
          overwrite: false
        }
      }
      if (payload.digit === "0" && state.currentOperand === "0") {
        return state;
      }
      if (payload.digit === "." && state.currentOperand.includes(".")) {
        return state;
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ''}${payload.digit}`
      };
    case ACTIONS.DELETE_DIGIT :
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: null,
          overwrite: false
        }
      }
      if (!state.currentOperand) {
        return state;
      }
      if (state.currentOperand.length === 1) {
        return {
          ...state,
          currentOperand: null
        }
      }
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1) 
      }
    case ACTIONS.OPERATION :
      if (!state.currentOperand && !state.previousOperand) {
        return state;
      }
      if (!state.previousOperand) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null
        }
      }
      if (!state.currentOperand) {
        return {
          ...state,
          operation: payload.operation
        }
      }
      return {
        ...state,
        previousOperand: evaluateOpertion(state),
        operation: payload.operation,
        currentOperand: null
      }
    case ACTIONS.EVALUATE :
      if (!state.currentOperand || !state.previousOperand || !state.operation) {
        return state;
      }
      return {
        ...state,
        overwrite: true,
        currentOperand: evaluateOpertion(state),
        previousOperand: null,
        operation: null
      }  
    case ACTIONS.CLEAR :
      return {};  
    default :
      return state;  
  }
}

function evaluateOpertion({currentOperand, previousOperand, operation}) {
  const prev = parseFloat(previousOperand);
  const curr = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(curr)) {
    return ''
  }
  let computation = "";
  switch (operation) {
    case "+" :
      computation = prev + curr;
      break;
    case "-" :
      computation = prev - curr;
      break;
    case "*" :
      computation = prev * curr;
      break;
    case "/" :
      computation = prev / curr;
      break;
    default :
      return ''    
  }
  return computation.toString();
}

const dispatchValue = (type, payload = null) => {
  return payload !== null ? {type: ACTIONS[type], payload} : {type: ACTIONS[type]};
}

const INTEGER_FORMATTER = new Intl.NumberFormat('en-in', {
  maximumFractionDigits: 0
});

function formatOperand(operand) {
  if (!operand) {
    return 
  }
  const [integer, decimal] = operand.split('.');
  if (!decimal) {
    return INTEGER_FORMATTER.format(integer);
  }
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

function App() {
  const [{currentOperand, previousOperand, operation}, dispatch] = useReducer(reducer, {});
  const [highight, setHighlight] = useState(null);

  const handleUserKeyPress = useCallback(event => {
    const { key, keyCode } = event; 
    const numberKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];
    const operationKeys = ['/', '*', '-', '+'];
    //console.log(key, keyCode, numberKeys.indexOf(key) !== -1);
    setHighlight(key);
    setTimeout(()=> {setHighlight(null)}, 500);
    if (numberKeys.indexOf(key) !== -1) {
      return dispatch(dispatchValue("ADD_DIGIT", {digit: key}));
    }
    if (operationKeys.indexOf(key) !== -1) {
      return dispatch(dispatchValue("OPERATION", {operation: key}));
    }
    if (keyCode === 27) {
      return dispatch(dispatchValue("CLEAR"));
    }
    if (keyCode === 8) {
      return dispatch(dispatchValue("DELETE_DIGIT"));
    }
    if (keyCode === 13 || key === '=') {
      return dispatch(dispatchValue("EVALUATE"));
    }
    return false;  
  }, []);
  
  useEffect(() => {
    document.addEventListener("keydown", handleUserKeyPress);
    return () => {
      document.removeEventListener("keydown", handleUserKeyPress);
    };
  }, [handleUserKeyPress]);

  return (
    <div className='main-container'>
      <div className="calc calc--grid">
        <div className="calc__display">
          <div className="calc__prev-operant">{formatOperand(previousOperand)}{operation}</div>
          <div className="calc__current-operant">{formatOperand(currentOperand)}</div>
        </div>
        <button className={`span-two ${highight === 'Escape' ? 'active' : ''}`} onClick={() => dispatch({type: ACTIONS.CLEAR})} aria-label='Clear All'>AC</button>
        <button className={highight === 'Backspace' ? 'active' : ''} onClick={() => dispatch({type: ACTIONS.DELETE_DIGIT})} aria-label='Delete'>DEL</button>
        <OperationButton operation="/" dispatch={dispatch} highight={highight} ariaText="Divide" />
        <DigitButton digit="1" dispatch={dispatch} highight={highight} />
        <DigitButton digit="2" dispatch={dispatch} highight={highight} />
        <DigitButton digit="3" dispatch={dispatch} highight={highight} />
        <OperationButton operation="*" dispatch={dispatch} highight={highight} ariaText="multiply" />
        <DigitButton digit="4" dispatch={dispatch} highight={highight} />
        <DigitButton digit="5" dispatch={dispatch} highight={highight} />
        <DigitButton digit="6" dispatch={dispatch} highight={highight} />
        <OperationButton operation="+" dispatch={dispatch} highight={highight} />
        <DigitButton digit="7" dispatch={dispatch} highight={highight} />
        <DigitButton digit="8" dispatch={dispatch} highight={highight} />
        <DigitButton digit="9" dispatch={dispatch} highight={highight} />
        <OperationButton operation="-" dispatch={dispatch} highight={highight} ariaText="minus" />
        <DigitButton digit="." dispatch={dispatch} highight={highight} />
        <DigitButton digit="0" dispatch={dispatch} highight={highight} />
        <button className={`span-two ${highight === 'Enter' || highight === '=' ? 'active' : ''}`} onClick={() => dispatch({type: ACTIONS.EVALUATE})} aria-label='total'>=</button>
      </div>
    </div>
  )
}

export default App;
