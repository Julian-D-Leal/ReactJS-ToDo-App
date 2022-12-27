import React, {useState,useEffect} from 'react'

const newTask = {
    title: '',
    description: ''
}


const TodoForm = ({Add,setEditTask,EditTask,Edit}) => {
    const [formValues, setFormValues] = useState(newTask)
    const [error, setError] = useState(null);
    const [good,setGood] = useState(null);
    const {title, description} = formValues;

  //cambiar formulario si EditTask cambia y es diferente a vacio
  useEffect(() => {
    if(EditTask) setFormValues(EditTask);
    else setFormValues(newTask);
  }, [EditTask])
  //función para cancelar el modo edición
  const cancelar = () => {
    setEditTask(null);
    setFormValues(newTask);
  }
  //actualizar el value de los inputs si se escribe algo en ellos
  const handleInputChange = (e) => {
      const changeFormValues = {
          ...formValues,
          [e.target.name]: e.target.value
      }

      setFormValues(changeFormValues)
  }
  //función para registrar una tarea nueva o para editar una tarea y mostrar mensajes dependiendo de la acción ejecutada
  const handleSubmit = (e) => {
      e.preventDefault();
      //verificación si los inputs no son vacios
      if(title.trim() === '' || description.trim() === ''){
          setError('Debes llenar todos los campos del formulario');
          return;
      }
      //si editTask es diferente de null ejecuta la función de editar o sino la función de crear tarea nueva
      if(EditTask){
        Edit(formValues);
        setGood('Tarea actualizada con exito'); 
      }
      else{
          Add(formValues);
          setGood('Tarea agregada con exito');
          setFormValues(newTask);
      }

      setError(null);
      setTimeout(() =>{
      setGood(null);
      },2000)
  }
  return (
    <div>
      <h2 className="text-center display-4">{EditTask? 'Editar tarea': 'Nueva tarea'}</h2>
      {//sentencia de js para verificar si hay tareas mostrar un mensaje o si está vacio mostrar otro
      EditTask &&
      <button onClick={() => cancelar()} className="btn btn-sm btn-warning mb-2">
        Cancelar edición
      </button>
      }
      <form onSubmit={handleSubmit}>
          <input 
          type="text" 
          className='form-control' 
          placeholder="Nombre de la tarea"
          onChange={handleInputChange}
          value={title}
          name="title"
          />
          <textarea 
          className='form-control' 
          placeholder="Descripcion de la tarea"
          onChange={handleInputChange}
          value={description}
          name="description"
          />
          <button 
          className='btn btn-primary btn-block mt-3'
          
          >
          {EditTask
          ? 'Editar'
          : 'Agregar tarea'}
          </button>
      </form>
      {
      error &&
      (
        <div className="alert alert-danger mt-3">
          {error}
        </div>
      )
    }
    {
      good &&
      (
        <div className="alert alert-success mt-3">
          {good}
        </div>
      )
    }
  </div>
  )
}

export default TodoForm;