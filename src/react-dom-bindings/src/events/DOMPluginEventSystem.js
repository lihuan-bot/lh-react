/*
 * @Author: lihuan
 * @Date: 2023-07-27 13:07:37
 * @LastEditors: lihuan
 * @LastEditTime: 2023-08-01 14:41:53
 * @Email: 17719495105@163.com
 */

import { allNativeEvents } from './EventRegistry'
import * as SimpleEventPlugin from './plugins/SimpleEventPlugin'
import { IS_CAPTURE_PHASE } from './EventSystemFlags'
import { createEventListenerWrapperWithPriority } from './ReactDOMEvntListener'
import { addEventCaptureListener, addEventBubbleListener } from './EventListener'
import getEventTarget from './getEventTarget'
import { HostComponent } from 'react-reconciler/src/ReactWorkTags'
import getListener from './getListener'
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
    const listener = createEventListenerWrapperWithPriority(targetContainer,domEventName, isCapturePhaseListener,eventSystemFlags)
    if (isCapturePhaseListener) {
        addEventCaptureListener(targetContainer,domEventName, listener)
    } else {
        addEventBubbleListener(targetContainer,domEventName, listener)
    }
}
/**
 * @description: 
 * @param {*} domEventName click
 * @param {*} eventSystemFlags 0 4
 * @param {*} nativeEvent 原生事件
 * @param {*} targetInst 真实dom的fiber
 * @param {*} targetContainer 目标容器
 * @return {*}
 */
export function dispatchEventForPluginEventSystem(domEventName, eventSystemFlags, nativeEvent, targetInst, targetContainer) {
    dispatchEventForPlugins(domEventName,eventSystemFlags,nativeEvent,targetInst,targetContainer)
}
function dispatchEventForPlugins(domEventName,eventSystemFlags,nativeEvent,targetInst,targetContainer) {
    const nativeEventTarget = getEventTarget(nativeEvent)
    const dispatchQueue = []
    extractEvents(dispatchQueue, domEventName, targetInst, nativeEvent, nativeEventTarget, eventSystemFlags, targetContainer)
    processDispatchQueue(dispatchQueue,eventSystemFlags)
    
}
function processDispatchQueue(dispatchQueue,eventSystemFlags) {
    const isCapturePhase = (eventSystemFlags & IS_CAPTURE_PHASE) !== 0
    for (let i = 0; i < dispatchQueue.length; i++) {
        const { event, listeners } = dispatchQueue[i];
        processDispatchQueueItemsInOrder(event, listeners, isCapturePhase)
    }
}
function executeDispatch(event,listener, currentTarget) {
    // currentTarget合成事件类型是不断变化的
    // event nativeEventTarget 是原始事件源是不变的
    // event currentTarget 当前事件源 会随着事件回调的执行不断变化的
    event.currentTarget = currentTarget
    listener(event)
}
function processDispatchQueueItemsInOrder(event, listeners, isCapturePhase) {
    if (isCapturePhase) { // listeners [子 ,父]
        for (let i = listeners.length - 1; i >= 0; i--) {
            const { listener, currentTarget } = listeners[i]
            if (event.isPropagationStopped()) return
            executeDispatch(event,listener, currentTarget)
        }
    } else {
        for (let i = 0; i < listeners.length; i++) {
            const { listener, currentTarget } = listeners[i]
            if (event.isPropagationStopped()) return
            executeDispatch(event,listener, currentTarget)
        }
    }
} 

function extractEvents(dispatchQueue,domEventName,targetInst,nativeEvent,nativeEventTarget,eventSystemFlags,targetContainer) {
    SimpleEventPlugin.extractEvents(dispatchQueue,domEventName,targetInst,nativeEvent,nativeEventTarget,eventSystemFlags,targetContainer)
}

export function accumulateSinglePhaseListeners(targetFiber,reactName,nativeEventType,isCapturePhase) {
    const captureName = reactName + 'Capture'
    const reactEventName = isCapturePhase ? captureName : reactName
    const listeners = []
    let instance = targetFiber
    while (instance !== null) {
        const { stateNode, tag } = instance
        if (tag === HostComponent && stateNode !== null) {
            if (reactEventName !== null) {
                const listener = getListener(instance, reactEventName)
                if (listener) {
                    listeners.push(createDispatchedListener(instance, listener,stateNode))
                }
            }
        }
        instance = instance.return
    }
    return listeners
}

function createDispatchedListener(instance, listener,currentTarget) {
    return { instance, listener, currentTarget }
}