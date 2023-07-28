/*
 * @Author: lihuan
 * @Date: 2023-07-27 15:27:16
 * @LastEditors: lihuan
 * @LastEditTime: 2023-07-28 23:17:47
 * @Email: 17719495105@163.com
 */
export const allNativeEvents = new Set();
/**
 * @description: 注册两个阶段事件
 * @param {*} registrationName React事件名 onClick
 * @param {*} dependencies 原生事件数组[click]
 * @return {*}
 */
export function registerTwoPhaseEvent(registrationName, dependencies) {
    // 冒泡对应关系
    registerDirectEvent(registrationName, dependencies)
     // 捕获对应关系
    registerDirectEvent(registrationName + 'Capture', dependencies)

}
export function registerDirectEvent(registrationName,dependencies) {
    for (let i = 0; i < dependencies.length; i++) {
        allNativeEvents.add(dependencies[i]); // click
        
    }
}