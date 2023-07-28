/*
 * @Author: lihuan
 * @Date: 2023-07-27 15:34:58
 * @LastEditors: lihuan
 * @LastEditTime: 2023-07-28 23:06:21
 * @Email: 17719495105@163.com
 */
import { registerTwoPhaseEvent } from './EventRegistry'
const simpleEventPluginEvents = ['click']
function registerSimpleEvent(domEventName,reactName) {
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