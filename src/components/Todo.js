import React from 'react';
import deleteIcon from '../assets/recycle-bin-icon.svg';

export default function Todo({tasks, showCompleted, handleShowCompleted, handleToggleTask, handleDeleteTask}) {
  return (
    <div style={{display: tasks && tasks.length ? 'block' : 'none'}}>
        <div className="show-completed-container">
            <input id="showCompleted" type="checkbox" onChange={handleShowCompleted} className="sr-only" tabIndex="-1" />
            <label className="show-completed" htmlFor="showCompleted" tabIndex="0">Show completed</label>
        </div>

        <ul className="list">
            {tasks
            .filter(task => showCompleted ? true : !task.completed)
            .map(item => {
                return (
                <li key={item.id}>
                    <input type="checkbox" checked={item.completed} onChange={() => handleToggleTask(item.id)} aria-label={`${item.text} item mark as complete`} />
                    <span style={{textDecoration: item.completed ? 'line-through' : 'none'}}>{item.text}</span>
                    <button type="button" onClick={() => handleDeleteTask(item.id, item.text)} aria-label={`${item.text} item Delete`}>
                        <img src={deleteIcon} alt="" aria-hidden="true" />
                    </button>
                </li>
                )
            })}
        </ul>
    </div>
  )
}
