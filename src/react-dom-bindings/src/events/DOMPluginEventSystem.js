/*
 * @Author: lihuan
 * @Date: 2023-07-27 13:07:37
 * @LastEditors: lihuan
 * @LastEditTime: 2023-07-31 09:53:46
 * @Email: 17719495105@163.com
 */

import { allNativeEvents } from './EventRegistry'
import * as SimpleEventPlugin from './plugins/SimpleEventPlugin'
import { IS_CAPTURE_PHASE } from './EventSystemFlags'
import { createEventListenerWrapperWithPriority } from './ReactDOMEvntListener'
import { addEventCaptureListener, addEventBubbleListener } from './EventListener'
SimpleEventPlugin.registerEvents()
const listeningMarker = '_reactListening' + Math.random().toString(36).slice(2)

export function listenToAllSupportedEvents(rootContainerElement) {
    if (!rootContainerElement[listeningMarker]) {
        rootContainerElement[listeningMarker] = true
        allNativeEvents.forEach((domEventName) => {
            listenToNativeEvent(domEventName, true, rootContainerElement)
            listenToNativeEvent(domEventName,false,rootContainerElement)
        })
    }

    
}
/**
 * @description: 注册原生事件
 * @param {*} domEventName 原生事件
 * @param {*} isCapturePhase 是否是捕获
 * @param {*} target 原生dom
 * @return {*}
 */
export function listenToNativeEvent(domEventName, isCapturePhaseListener, target) { 
    let eventSystemFlags = 0 // 0是冒泡 4捕获
    if (isCapturePhaseListener) {
        eventSystemFlags |= IS_CAPTURE_PHASE
    }
    addTrappedEvnetListener(target,domEventName, eventSystemFlags,isCapturePhaseListener)
}
function addTrappedEvnetListener(targetContainer, domEventName, eventSystemFlags, isCapturePhaseListener) {
    const listener = createEventListenerWrapperWithPriority(domEventName, isCapturePhaseListener,eventSystemFlags)
    if (isCapturePhaseListener) {
        addEventCaptureListener(targetContainer,domEventName, listener)
    } else {
        addEventBubbleListener(targetContainer,domEventName, listener)
    }
}