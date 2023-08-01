/*
 * @Author: lihuan
 * @Date: 2023-07-27 15:30:47
 * @LastEditors: lihuan
 * @LastEditTime: 2023-07-31 15:51:58
 * @Email: 17719495105@163.com
 */
import { registerSimpleEvents, topLevelEventsToReactNames } from '../DOMEventProperties'
import { IS_CAPTURE_PHASE } from '../EventSystemFlags'
import { accumulateSinglePhaseListeners } from '../DOMPluginEventSystem'
function extractEvents(dispatchQueue, domEventName, targetInst, nativeEvent, nativeEventTarget, eventSystemFlags, targetContainer) {
    const reactName = topLevelEventsToReactNames.get(domEventName)
    const isCapturePhase = (eventSystemFlags & IS_CAPTURE_PHASE) !== 0
    const listeners = accumulateSinglePhaseListeners(targetInst,reactName,nativeEvent.type,isCapturePhase)
}
export { registerSimpleEvents  as registerEvents, extractEvents}