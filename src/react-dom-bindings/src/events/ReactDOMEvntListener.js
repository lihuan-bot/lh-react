/*
 * @Author: lihuan
 * @Date: 2023-07-30 13:03:22
 * @LastEditors: lihuan
 * @LastEditTime: 2023-07-31 14:18:55
 * @Email: 17719495105@163.com
 */
import getEventTarget from './getEventTarget'
import { getClosestInstanceFromNode } from '../client/ReactDOMComponentTree'
import { dispatchEventForPluginEventSystem } from './DOMPluginEventSystem'
export function createEventListenerWrapperWithPriority(targetContainer, domEventName,eventSystemFlags) {
    
    const listenerWrapper = dispatchDiscreteEvent
    return listenerWrapper.bind(null,domEventName,eventSystemFlags,targetContainer)
}
/**
 * @description: 派发离散的事件监听函数 
 * @param {*} domEventName 事件名 click
 * @param {*} eventSystemFlags 阶段 0冒泡  4捕获
 * @param {*} nativeEvent 原生事件
 * @return {*}
 */
function dispatchDiscreteEvent(domEventName, eventSystemFlags, container, nativeEvent) {
    
    dispatchEvent(domEventName, eventSystemFlags,container,nativeEvent)
}

export function dispatchEvent(domEventName, eventSystemFlags, container, nativeEvent) {
    //获取事件源 它是一个真实dom
    const nativeEventTarget = getEventTarget(nativeEvent)
    const targetInst = getClosestInstanceFromNode(nativeEventTarget)
    dispatchEventForPluginEventSystem(domEventName,eventSystemFlags,nativeEvent,targetInst,container)
} 