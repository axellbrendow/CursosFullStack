import React, { useReducer } from 'react'

const counterReducer = (state, action) => {
    switch (action.type) {
        case 'INC_COUNTER': return state + action.inc;
        default:            return state;
    }
};

const ReducerTest = () => {
    const [counter, dispatchCounter] = useReducer(counterReducer, 0);

    const dispatchInc = () => {
        dispatchCounter({type: 'INC_COUNTER', inc: 1});
    };

    return (
        <div className="ReducerTest">
            <button onClick={dispatchInc}>Reducer Test {counter}</button>
        </div>
    )
}

export default ReducerTest
