import React,{Component} from 'react';

export default class Todo extends Component{
    constructor(props){
        super(props); 
  
    }
    
    render(){
        let {content,deleteTodo,id,hasComleted,toggleTodo} = this.props;
        return(
            <li
              // className="completed"
              // className="editing"
            >
              <div className="view">
                {/* 勾选按钮 */}
                <input
                  type="checkbox"
                  className="toggle"
                  checked={hasComleted}
                  onChange = {()=>toggleTodo(id)}
                />
                {/* todo 的内容 */}
                <label ref="label">
                  {content}
                </label>
                {/* 删除按钮 */}
                <button
                  className="destroy"
                  ref="btn"
                  onClick={()=>deleteTodo(id)}
                ></button>
              </div>
              {/* 编辑 todo 的输入框 */}
              <input
                type="text"
                className="edit"
                ref="editInput"
              />
            </li>
        )
    }
}