//import Counter from './components/Counter'
import Todo from './components/Todo'
import {useReducer, useState, useEffect} from 'react'
import TodoForm from './components/TodoForm'
import {types} from './components/types'

const Todostasks = [
  {
    id:'1',
    title: 'Todo #1',
    description: 'Descripcion #1',
    completed: false
  },
  {
    id:'2',
    title: 'Todo #2',
    description: 'Descripcion #2',
    completed: true
  }
]

const localTodos = JSON.parse(localStorage.getItem('todos'));
const Reducer = (state, action) => {
  switch(action.type){
    case types.DELETE:
      return [...action.payload];
    case types.NEW:
      return [...state,action.payload];
    case types.END:
      return [...action.payload];
    case types.UPDATE:
      return [...action.payload]
    default:
      return state;
  }
}

function App() {
  const [tasks, dispatch] = useReducer(Reducer, localTodos || Todostasks);
  const [EditTask, setEditTask] = useState(null);

  //función para agregar una tarea nueva
  const Addtask = (task) => {
    const newTask ={
      id: Date.now(),
      ...task,
      completed: false
    }

    dispatch({
      type: types.NEW,
      payload: newTask
    })
  }

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(tasks));
  }, [tasks])
  
  //function para eliminar una tarea
  const Delete = (taskId) => {
//condición para verificar si se está editando una tarea y si es eliminada proceder a salir del modo editar
    if(EditTask && EditTask.id === taskId) {
      setEditTask(null);
    }
    const deleteOp = tasks.filter(item => item.id !== taskId)
    dispatch({ type: types.DELETE, payload: deleteOp })
  }  
  //función para cambiar el modo de una tarea, si está terminada o no
  const taskToogleCompleted = (taskId) => {
    const endly = tasks.map(task => (
      task.id === taskId
      ? {...task,completed: !task.completed}
      : task )
    )
    
    dispatch({
      type: types.END,
      payload: endly
    })
  }
  //función para edit una tarea
  const Edit = (todoEdit) => {
    const taskChanged = tasks.map(task => (
      task.id === todoEdit.id
      ? todoEdit
      : task
    ))

    dispatch({
      type: types.UPDATE,
      payload: taskChanged
    })
  }

  return (
    <div className='container mt-4'>
      <div className='row'>
        <div className='col-8'>            
          <Todo 
            tasks = {tasks} 
            Delete = {Delete} 
            end = {taskToogleCompleted}
            Edit={setEditTask}/>
        </div>
        <div className='col-4'>
          <TodoForm 
            Add={Addtask}
            setEditTask={setEditTask}
            EditTask={EditTask}
            Edit = {Edit}
            />
        </div>
      </div>
    </div>
  )
}

export default App;
