import Card from './Card'

const Todo = ({tasks,Delete, end, Edit}) => {
  return (
    <div>
      <h2 className="text-center display-4">Lista de tareas</h2>
      {
        tasks.length === 0
        ?(<div className="alert alert-danger" role="alert">
            No hay tareas en este momento. Porfavor agregar tareas {":)"}
        </div>)
        : (
            tasks.map(item =>
              <Card 
                key={item.id} 
                todo={item} 
                Del={Delete} 
                End={end} 
                Edit = {Edit}
              />
            )
        )        
      }
    </div>
  )
}

export default Todo;