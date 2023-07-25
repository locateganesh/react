
import React from 'react';
import { ACTIONS } from '../App';

export default function OperationButton({operation, dispatch, highight, ariaText}) {
    return <button className={highight === operation ? 'active' : ''} onClick={() => dispatch({type: ACTIONS.OPERATION, payload: {operation}})} aria-label={ariaText ? ariaText : null}>{operation}</button>
}
