/*
 * @Author: lihuan
 * @Date: 2023-07-09 01:42:15
 * @LastEditors: lihuan
 * @LastEditTime: 2023-07-31 13:36:18
 * @Email: 17719495105@163.com
 */
import { createContainer, updateContainer } from 'react-reconciler/src/ReactFiberReconciler'
import { listenToAllSupportedEvents } from 'react-dom-bindings/src/events/DOMPluginEventSystem'

function ReactDOMRoot(internalRoot) {
    this._internalRoot = internalRoot
}
ReactDOMRoot.prototype.render = function (children) {

    const root = this._internalRoot
    root.containerInfo.innerHTML = ''
    updateContainer(children,root)
    
}
export function createRoot(container) {// div#root 真实dom
    const root = createContainer(container)
    listenToAllSupportedEvents(container)
    return new ReactDOMRoot(root)
}