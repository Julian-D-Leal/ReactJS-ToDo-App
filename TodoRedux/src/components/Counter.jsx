import { useReducer} from 'react'

const types = {
  INCREMENT: 'increment',	
  DECREMENT: 'decrement',
  RESET: 'reset'
}
const counterReducer = (state, action) =>{
  switch(action.type){
    case 'increment':
      return state+1;
    case 'decrement':
      return state-1;
    case 'reset':
      return 0;
    default:
      return state;
  }
}
const Counter = () => {
  const [counter, dispatch] = useReducer(counterReducer,0)

  return (
    <div className='Container mt-4'>
      <div className='row'>
        <div className='col-12 '>
          <h1>clicks:{counter}</h1>
          <button 
          className='btn btn-primary'
          onClick={() => dispatch({type: types.INCREMENT})}
          >
          Aumentar
          </button>
          <button 
          className='btn btn-primary'
          onClick={() => dispatch( {type: types.DECREMENT})}
          >
          Decrementar
          </button>
          <button 
          className='btn btn-primary'
          onClick={() => dispatch({type: types.RESET})}
          >
          Reiniciar
          </button>
        </div>
      </div>
    </div>
  )
}

export default Counter;