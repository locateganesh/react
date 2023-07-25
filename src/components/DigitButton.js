
import React from 'react';
import { ACTIONS } from '../App';

export default function DigitButton({digit, dispatch, highight}) {
    return (
        <button 
            onClick={() => dispatch({type: ACTIONS.ADD_DIGIT, payload: {digit}})}
            className={highight === digit ? 'active' : ''}
        >{digit}
        </button>
    )
}
