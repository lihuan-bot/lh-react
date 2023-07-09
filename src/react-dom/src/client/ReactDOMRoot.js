/*
 * @Author: lihuan
 * @Date: 2023-07-09 01:42:15
 * @LastEditors: lihuan
 * @LastEditTime: 2023-07-09 10:31:13
 * @Email: 17719495105@163.com
 */
import { createContainer } from 'react-reconciler/src/ReactFiberReconciler'

function ReactDOMRoot(internalRoot) {
    this._internalRoot = internalRoot
}
export function createRoot(container) {// div#root 真实dom
    const root = createContainer(container)
    return new ReactDOMRoot(root)
}