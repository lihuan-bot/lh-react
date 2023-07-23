/*
 * @Author: lihuan
 * @Date: 2023-07-08 10:36:06
 * @LastEditors: lihuan
 * @LastEditTime: 2023-07-23 16:02:51
 * @Email: 17719495105@163.com
 */
import { createRoot } from 'react-dom/client'
// const element = (
//     < h1 >
//         hello <span style={{ color: 'red' }}>world</span>
//     </h1>
// )
function FunctionsComponent() {
    return  (
        < h1 >
            hello <span style={{ color: 'red' }}>world</span>
        </h1>
    )
}
const element = <FunctionsComponent />
debugger
const root = createRoot(document.getElementById('root'))
console.log(root)
root.render(element)