
import { memo } from 'react';

const Category = ({category, currentCtegoryHandler}) => {

    const currentCtegoryEvent = (data) => {
      currentCtegoryHandler(data);
    }

    return (
        <aside>
          <ul>
            <li className="category">
              <button className="btn btn-all-categories" onClick={(e) => currentCtegoryEvent('all')}>All</button>
            </li>
            {category && category.length && category.map(list => (
              <li key={list.name} className="category">
                <button
                  className="btn btn-category"
                  style={{backgroundColor: list.color}} onClick={(e) => currentCtegoryEvent(list.name)}>
                  {list.name}
                </button>
              </li>
            ))}
          </ul>
        </aside>
    )
}
export default memo(Category);