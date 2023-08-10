/*
 * @Author: lihuan
 * @Date: 2023-07-08 10:36:06
 * @LastEditors: lihuan
 * @LastEditTime: 2023-08-07 11:25:56
 * @Email: 17719495105@163.com
 */
import { createRoot } from 'react-dom/client'
import * as React from 'react'
// const element = (
//     < h1 >
//         hello <span style={{ color: 'red' }}>world</span>
//     </h1>
// )
function reducer(state, action) {
    if (action.type === 'add') return state + action.payload
    return state

}
function FunctionComponent() {
    const [number, setNumber] = React.useReducer(reducer, 0)
    // const [number1,setNumber1] = React.useReducer(reducer,1)
    return (
        <button id={Date.now()} onClick={() => setNumber({ type: 'add',payload: 1})}>{number}</button>
        // < h1 onClick={(e)=> {console.log(1,e)}}>
        //     hello <span style={{ color: 'red' }}>world</span>
        // </h1>
    )
}
const element = <FunctionComponent />
const root = createRoot(document.getElementById('root'))
console.log(root)
root.render(element)