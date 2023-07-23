/*
 * @Author: lihuan
 * @Date: 2023-07-19 13:23:49
 * @LastEditors: lihuan
 * @LastEditTime: 2023-07-23 01:53:32
 * @Email: 17719495105@163.com
 */
import { setInitialProperties } from './ReactDOMComponent'
export function shouldSetTextContent(type, props) {
    return typeof props.children === 'string' || typeof props.children === 'number'
}

export function createTextInstance(content) {
    return document.createTextNode(content)
}

export function createInstance(type, props) {
    const domElement = document.createElement(type)
    // TODO: 更新属性
    return domElement
}

export function appendInitialChild(parent, child) {
    parent.appendChild(child)
}

export function finalizeInitialChildren(domElement, type, props) {
    setInitialProperties(domElement, type, props)
    
}

export function appendChild(parentInstance, child) {
    parentInstance.appendChild(child)
}
export function insertBefore(parentInstance, child, beforeChild) {
    parentInstance.insertBefore(child,beforeChild)
}