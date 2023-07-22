import React from 'react';
import plusIcon from '../assets/plus-round-line-icon.svg';

export default function Form({handleFromSubmit, inputValue, handleInputValue, inputError}) {
  //console.log('Form Component Rendered');
  return (
    <form className="form" onSubmit={handleFromSubmit}>
        <label htmlFor="listInput">Enter List name</label>
        <div className="form-group">
        <input type="text"
            id="listInput" 
            value={inputValue} 
            onChange={handleInputValue}  
            className="form-control" 
        />
        <button type="submit" aria-label="Add Item">
            <img src={plusIcon} alt="" aria-hidden="true" />
        </button>
        </div>
        {inputError && <span className="error-message" role='alert' aria-live="assertive">Please enter a list name</span>}
    </form>
  )
}
