/*
 * @Author: lihuan
 * @Date: 2023-07-30 13:03:22
 * @LastEditors: lihuan
 * @LastEditTime: 2023-07-31 09:52:34
 * @Email: 17719495105@163.com
 */
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
function dispatchDiscreteEvent(domEventName, eventSystemFlags,container,nativeEvent) {
    dispatchEvent(domEventName, eventSystemFlags,nativeEvent)
}

export function dispatchEvent(domEventName, eventSystemFlags, container,nativeEvent) {
    console.log(domEventName, eventSystemFlags, nativeEvent)
}