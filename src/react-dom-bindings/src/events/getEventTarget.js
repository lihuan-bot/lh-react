/*
 * @Author: lihuan
 * @Date: 2023-07-31 13:41:26
 * @LastEditors: lihuan
 * @LastEditTime: 2023-07-31 14:18:01
 * @Email: 17719495105@163.com
 */
export default function getEventTarget(nativeEvent) {
    const target = nativeEvent.target || nativeEvent.srcElement || window
    return target
}