/*
 * @Author: lihuan
 * @Date: 2023-07-08 10:36:06
 * @LastEditors: lihuan
 * @LastEditTime: 2023-07-12 17:26:54
 * @Email: 17719495105@163.com
 */
import { createRoot } from 'react-dom/client'
const element = (
    < h1 >
        hello <span style={{ color: 'red' }}>world</span>
    </h1>
)
console.log(element)
debugger
const root = createRoot(document.getElementById('root'))
console.log(root)
root.render(element)