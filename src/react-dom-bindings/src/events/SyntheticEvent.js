import assign from "shared/assign";

/*
 * @Author: lihuan
 * @Date: 2023-08-01 10:53:17
 * @LastEditors: lihuan
 * @LastEditTime: 2023-08-01 11:10:36
 * @Email: 17719495105@163.com
 */
function functionThatReturnsTrue() {
    return true;
}
function functionThatReturnsFalse() {
    return false;
}
const MouseEventInterface = {
    clientX: 0,
    clientY: 0,
}
function createSyntheticEvent(inter) {
    /**
     * @description:  合成事件基类
     * @param {*} reactName  onClick
     * @param {*} reactEvnetType click
     * @param {*} targetInst fiber 实例
     * @param {*} nativeEvent 原生事件对象
     * @param {*} nativeEventTarget 原生事件源 span 事件源对应的那个真实dom
     * @return {*}
     */    
    function SyntheticBaseEvent(reactName, reactEvnetType, targetInst, nativeEvent, nativeEventTarget) {
        this._reactName = reactName
        this._type = reactEvnetType
        this._targetInst = targetInst
        this.nativeEvent = nativeEvent
        this.target = nativeEventTarget
        for (const propName in inter) {
            if (!inter.hasOwnProperty(propName)) {
               continue
            }
            this[propName] = nativeEvent[propName]
        }
        this.isDefaultPrevented = functionThatReturnsFalse
        this.isPropagationStopped = functionThatReturnsFalse
        return this
    }
    assign(SyntheticBaseEvent.prototype, {
        preventDefault() {
            const event = this.nativeEvent
            if (event.preventDefault) {
                event.preventDefault()
            } else {
                event.returnValue = false
            }
            this.isDefaultPrevented = functionThatReturnsTrue
        },
        stopPropagation() {
            const event = this.nativeEvent
            if (event.stopPropagation) {
                event.stopPropagation()
            } else {
                event.cancelBubble = truefalse
            }
            this.isPropagationStopped = functionThatReturnsTrue
        }
    })
    return SyntheticBaseEvent
}

export const SyntheticMouseEvent = createSyntheticEvent(MouseEventInterface)