import Button from '../components/Button';
import { useReducer } from 'react';
import Panel from '../components/Panel';

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const ADDLOTS = 'ADDLOTS';
const SETLOTS = 'SETLOTS';


const reducer = (state, action) => {
    switch (action.type) {
        case INCREMENT:
            return {
                ...state,
                count: state.count + 1
            }
        case DECREMENT:
            return {
                ...state,
                count: state.count - 1
            }
        case ADDLOTS:
            return {
                ...state,
                count: Number(state.count) + Number(state.lots),
                lots: 0
            }
        case SETLOTS:
            return {
                ...state,
                lots: action.payload
            }
        default:
            return state;
    }
}

function CounterPage({ initialCount }) {


    // const [count, setCount] = useState(initialCount);
    // const [lots, setLots] = useState(0);

    const [state, dispatch] = useReducer(reducer, {
        count: initialCount,
        lots: 0
    })

    const increment = () => {
        dispatch({ type: INCREMENT });
        // setCount(count + 1);
    }

    const decrement = () => {
        dispatch({ type: DECREMENT });
        // setCount(count - 1);
    }

    const hancleSubmit = (e) => {
        e.preventDefault();
        dispatch({ type: ADDLOTS });
        // setCount((prev) => Number(prev) + Number(lots));
        // setLots(0);
        dispatch({ type: SETLOTS, payload: 0 });
    }

    return (
        <Panel className="m-3" >
            <h1 className='text-lg ' >Count is {state.count}</h1>
            <div className='flex flex-row gap-2 p-3'>
                <Button onClick={increment}>Increment</Button>
                <Button onClick={decrement}>Decrement</Button>
            </div>
            <form>
                <label className='mr-3' >Add a lot</label>
                <input className='p-1 m-3 border bg-gray-50' value={state.lots} onChange={(e) =>
                    dispatch({ type: SETLOTS, payload: Number(e.target.value) })} />
                <Button onClick={hancleSubmit}>Add {state.lots}</Button>
            </form>
        </Panel>
    );
}

export default CounterPage;
