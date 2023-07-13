/*
 * @Author: lihuan
 * @Date: 2023-07-13 13:34:36
 * @LastEditors: lihuan
 * @LastEditTime: 2023-07-13 13:36:30
 * @Email: 17719495105@163.com
 */
export function scheduleCallback(callback) {
    requestIdleCallback(callback)
}