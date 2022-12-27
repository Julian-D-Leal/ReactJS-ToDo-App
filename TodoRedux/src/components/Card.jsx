import React from 'react'

const Card = ({todo, Del,End,Edit}) => {
  return (
    <div className="card mt-2">
    <div className="card-body">
        <h3 className="card-title text-center">
          {todo.title}
          <button className=
          {`btn btn-sm ${todo.completed? 'btn-outline-success' : 'btn-success'} ml-2`} //template string para seleccionar una clase dependiendo si la tarea está completa o no
          onClick={() => End(todo.id)}>
            {todo.completed? 'Terminado' : 'Terminar'}
          </button>
        </h3>
      <p className="card-text text-center">
        {todo.description}
      </p>
      <div className="d-flex justify-content-end">
        <button 
        className="btn btn-sm btn-outline-primary mr-5"
        onClick={() => Edit(todo)}>
          Editar  
        </button>
        <button 
        className="btn btn-sm btn-outline-danger" 
        onClick={() => Del(todo.id)}
        >
          Eliminar
        </button>
      </div>
    </div>
  </div>
  )
}

export default Card;