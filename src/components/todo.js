import React,{Component} from 'react';

export default class Todo extends Component{
    constructor(props){
        super(props); 
        this.state = {
          inEdit:false
        }
        //获取真实DOM元素
        this.editInput = React.createRef();
  
    }

    //双击出现输入框，改变状态值
    inEdit = ()=>{
      this.setState({
        inEdit:true
      },()=>{
        //获取焦点
        this.editInput.current.value = this.props.content;
        this.editInput.current.focus();
      })
    }

    //编辑内容传参数
    commitAliter = ()=>{
      let {current:input} = this.editInput;
      let content = input.value.trim();
      let id = this.props.id;
      if(content){
        this.props.alterTodoContent(id,content)
      }else{
        this.props.deleteTodo(id);
      }
      
    }

    //失去焦点退出
    onBlur = ()=>{
      if(!this.state.inEdit) return;
      this.setState({
        inEdit:false
      })
      //输入框内容为空则删除
      this.commitAliter();
      
    }

    //esc键退出
    onkeyDown = (ev)=>{
      if(ev.keyCode === 27 || ev.keyCode === 13){
        this.setState({
          inEdit:false
        })
      }
      if(ev.keyCode === 13){
        this.commitAliter();
      }
    }
    
    render(){
        let {content,deleteTodo,id,hasComleted,toggleTodo} = this.props;
        //判断输入框的class
        let className = this.state.inEdit?'editing':'';
        className = hasComleted?className + 'completed': className;

        return(
            <li
              // className="completed"
               className={className}
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
                <label 
                  ref="label"
                  onDoubleClick={this.inEdit}
                >
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
                ref={this.editInput}
                onBlur={this.onBlur}
                onKeyDown = {this.onkeyDown}
              />
            </li>
        )
    }
}