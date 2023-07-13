/*
 * @Author: lihuan
 * @Date: 2023-07-09 01:42:15
 * @LastEditors: lihuan
 * @LastEditTime: 2023-07-12 17:29:58
 * @Email: 17719495105@163.com
 */
import { createContainer, updateContainer } from 'react-reconciler/src/ReactFiberReconciler'

function ReactDOMRoot(internalRoot) {
    this._internalRoot = internalRoot
}
ReactDOMRoot.prototype.render = function (children) {

    const root = this._internalRoot
    updateContainer(children,root)
    
}
export function createRoot(container) {// div#root 真实dom
    const root = createContainer(container)
    return new ReactDOMRoot(root)
}