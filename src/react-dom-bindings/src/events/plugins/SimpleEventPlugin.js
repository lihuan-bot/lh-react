/*
 * @Author: lihuan
 * @Date: 2023-07-27 15:30:47
 * @LastEditors: lihuan
 * @LastEditTime: 2023-08-01 11:25:22
 * @Email: 17719495105@163.com
 */
import { registerSimpleEvents, topLevelEventsToReactNames } from '../DOMEventProperties'
import { IS_CAPTURE_PHASE } from '../EventSystemFlags'
import { accumulateSinglePhaseListeners } from '../DOMPluginEventSystem'
import { SyntheticMouseEvent } from '../SyntheticEvent'
function extractEvents(dispatchQueue, domEventName, targetInst, nativeEvent, nativeEventTarget, eventSystemFlags, targetContainer) {
    let reactEventType = domEventName
    const reactName = topLevelEventsToReactNames.get(domEventName)
    let SyntheticEventCtor
    switch (domEventName) {
        case 'click':
            SyntheticEventCtor = SyntheticMouseEvent
            break;
    
        default:
            break;
    }
    const isCapturePhase = (eventSystemFlags & IS_CAPTURE_PHASE) !== 0
    const listeners = accumulateSinglePhaseListeners(targetInst, reactName, nativeEvent.type, isCapturePhase)
    if (listeners.length > 0) {
        const event = new SyntheticEventCtor(reactName, reactEventType, null, nativeEvent, nativeEventTarget)
        dispatchQueue.push({
            event, //合成事件
            listeners// 监听的函数数组
        })
    }
    console.log(dispatchQueue,'dispatchQueue')
}
export { registerSimpleEvents  as registerEvents, extractEvents}