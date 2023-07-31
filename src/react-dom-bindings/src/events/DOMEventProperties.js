/*
 * @Author: lihuan
 * @Date: 2023-07-27 15:34:58
 * @LastEditors: lihuan
 * @LastEditTime: 2023-07-29 09:55:31
 * @Email: 17719495105@163.com
 */
import { registerTwoPhaseEvent } from './EventRegistry'
const simpleEventPluginEvents = ['click']
export const topLevelEventsToReactNames = new Map()
function registerSimpleEvent(domEventName, reactName) {
    // onClick 从元素的fiber的属性获取 props.onClick
    // 源码里 让真实dom元素 updateFiberProps(domElement,props)
    //node是真实dom node[internalPropsKey] = props
    // 原生事件和处理函数映射
    topLevelEventsToReactNames.set(domEventName, reactName)
    registerTwoPhaseEvent(reactName,[domEventName])
}
export function registerSimpleEvents() {
    for (let i = 0; i < simpleEventPluginEvents.length; i++) {
        const eventName = simpleEventPluginEvents[i]; // click
        const domEventName = eventName.toLowerCase() 
        const capitalizeEvent = eventName[0].toUpperCase() + eventName.slice(1) 
        registerSimpleEvent(domEventName,`on${capitalizeEvent}`)// click onClick
        
    }
}