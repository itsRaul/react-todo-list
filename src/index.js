import React, {Fragment, Component, createRef} from 'react';
import ReactDOM from 'react-dom';

import './main.css';

import Todo from './components/todo'
import Footer from './components/footer'

class TodoList extends Component{
  constructor(props){
      super(props);
      this.state = {
        todoList:[],
        view:'all',
        leftItem:0
      }
      this.todoInput = createRef()
  }

  //增加todoList
  addTodo = (ev)=>{

    //获取真实DOM的value值
    let {value} = this.todoInput.current;

    //ev.keyCode 获取的键盘上的对应的码  13 enter键盘键
    //判断键盘码是否enter,输入框是否存在值
    if(ev.keyCode !== 13 || !value.trim()) return;

    //解构todoList
    let {todoList} = this.state;

    //更新todoList的状态值
    this.setState({
      todoList:[
        {
          id:Math.random(),
          content:value,
          hasComleted:false  //使组件受控
        },
        ...todoList //把之前的todoList保留,否则显示当前的一条数据
      ]

    },()=>{
      this.todoInput.current.value = '';  //更新完成后回调清空输入框的值
    })
  }

  //删除点击的todoList,比较id
  deleteItem = (id)=>{
    let {todoList} = this.state;

    //filter过滤数据，当前id不想等则过滤，返回新的数据必须在setState进行更新
    todoList = todoList.filter( (elt)=>{
      return elt.id !==id
    })
    this.setState({
      todoList
    })
  }

  //单条数据是否选中
  toggleTodo = (id)=>{
    let {todoList} = this.state;

    //判断是否是当前选中，是的话进行去反，改变checked的布尔值
    todoList = todoList.map(elt=>{
      if(elt.id == id){
        elt.hasComleted = !elt.hasComleted;
      }
      return elt;
    })

    this.setState({
      todoList
    })
  }

  //全选状态
  todoAll = (ev)=>{
    let {todoList} = this.state;

    //利用数据hasComleted的属性等于全选的ev.target.checked，
    //再return数据进行更新
    todoList = todoList.map(elt=>{
      elt.hasComleted = ev.target.checked;
      return elt;
    })

    this.setState({
      todoList
    })

  }

  //输入框编辑数据的更新，id判断是否是当前点击，更新传入的内容
  alterTodoContent = (id,content)=>{
    let {todoList} = this.state;

    todoList = todoList.map(elt=>{
      if(elt.id == id){
        elt.content = content
      }
      return elt;
    })

    this.setState({
      todoList
    })
  }

  //删除选中的
  clearAllCompleted = ()=>{
    let {todoList} = this.state;

    //filter过滤数据，当前id不想等则过滤，返回新的数据必须在setState进行更新
    todoList = todoList.filter( (elt)=>{
      return !elt.hasComleted
    })
    this.setState({
      todoList
    })
  }

  //改变footer的className
  changeClassName = (view)=>{
    this.setState({
      view
    })
  }

  render(){

    let {todoList,view,leftItem} = this.state;

    let showTodoData = todoList.filter(elt =>{

      if(!elt.hasComleted) leftItem++
      switch(view){
        case 'active':
          return !elt.hasComleted;
        case 'comleted':
          return elt.hasComleted;
        case 'all':
          default:
            return 'all'

        
      }
    })

    //map遍历返回一个新的<Todo/>,子组件props接受content
    //{...{}} 这不是es6的扩展符，父组件传递的props属性
    let todos = showTodoData.map(elt => {
      return(
        <Todo 
          key={elt.id}
          {...{
            id:elt.id,
            content:elt.content,
            deleteTodo:this.deleteItem,
            hasComleted:elt.hasComleted,
            toggleTodo:this.toggleTodo,
            alterTodoContent:this.alterTodoContent
          }}
        />
      )
    })
    let activeTodo = todoList.find(elt=>elt.hasComleted === false)
    let completedTodo = todoList.find(elt=>elt.hasComleted === true)
    return (
      <div>
        <header className="header">
          <h1>todos</h1>
          {/* 输入框 */}
          <input
            type="text"
            className="new-todo"
            placeholder="type something here"
            ref = {this.todoInput} 
            onKeyDown = {this.addTodo}
          />
        </header>
        {todoList.length>0 && (
          <React.Fragment>
            <section className="main">
            {/* 全选按钮 */}
            <input
              type="checkbox"
              className="toggle-all"
              checked={!activeTodo && todoList.length>0}
              onChange = {this.todoAll}
            />
            <ul className="todo-list">
              {todos}
            </ul>
          </section>
  
          <Footer
            {...{
              clearAllCompleted:this.clearAllCompleted,
              showClearButton:completedTodo && todoList.length>0 ,//判断有1过选中叫显示clear
              view:view,
              changeClassName:this.changeClassName,
              leftItem:leftItem
            }}
          />
         </React.Fragment>
 
        )}
       
      </div>
    )
  }
}


ReactDOM.render(
  <TodoList/>
  ,
  document.getElementById('root')
)
