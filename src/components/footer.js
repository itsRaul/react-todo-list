import React from 'react';

export default function Footer(props){
    return(
        <footer className="footer">
          <span className="todo-count">
            <strong> {props.leftItem} </strong>
            <span>item left</span>
          </span>
          <ul className="filters">
            <li>
              <a
                className={props.view == 'all'?"selected":''}
                onClick={()=>props.changeClassName('all')}
              >All</a>

            </li>
            <li>
              <a
                className={props.view == 'active'?"selected":''}
                onClick={()=>props.changeClassName('active')}
              >Active</a>

            </li>
            <li>
              <a
                className={props.view == 'comleted'?"selected":''}
                onClick={()=>props.changeClassName('comleted')}
              >Completed</a>

            </li>
          </ul>
          {/* 清除完成按钮 */}
          {props.showClearButton && (
            <button
            className="clear-completed"
            onClick = {props.clearAllCompleted}
            >
            clear all completed
             </button>
          )}
          
        </footer>
    )
}