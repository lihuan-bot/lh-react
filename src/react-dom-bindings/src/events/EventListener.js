/*
 * @Author: lihuan
 * @Date: 2023-07-31 09:01:40
 * @LastEditors: lihuan
 * @LastEditTime: 2023-07-31 09:03:46
 * @Email: 17719495105@163.com
 */
export function addEventCaptureListener(target, eventType, listener) {
    target.addEventListener(eventType, listener, true);
    return listener
}

export function addEventBubbleListener(target, eventType, listener) {
    target.addEventListener(eventType, listener, false);
    return listener
}