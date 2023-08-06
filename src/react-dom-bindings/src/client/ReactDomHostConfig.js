/*
 * @Author: lihuan
 * @Date: 2023-07-19 13:23:49
 * @LastEditors: lihuan
 * @LastEditTime: 2023-08-06 18:07:33
 * @Email: 17719495105@163.com
 */
import { setInitialProperties, diffProperties } from './ReactDOMComponent'
import { precacheFiberNode, updateFiberProps } from './ReactDOMComponentTree'
export function shouldSetTextContent(type, props) {
    return typeof props.children === 'string' || typeof props.children === 'number'
}

export function createTextInstance(content) {
    return document.createTextNode(content)
}

export function createInstance(type, props, internalInstanceHandle) {
    const domElement = document.createElement(type)
    precacheFiberNode(internalInstanceHandle, domElement)
    // 那属性保存在domElement的属性上
    updateFiberProps(domElement, props)
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

export function prepareUpdate(domElement, tag, lastProps, nextProps) {
    return diffProperties(domElement, tag, lastProps, nextProps)
    
}