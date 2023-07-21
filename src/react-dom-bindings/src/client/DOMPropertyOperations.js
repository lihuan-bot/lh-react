/*
 * @Author: lihuan
 * @Date: 2023-07-21 10:39:40
 * @LastEditors: lihuan
 * @LastEditTime: 2023-07-21 10:42:56
 * @Email: 17719495105@163.com
 */
export function setValueForProperty(ndoe, name, value) {
    if (value === null) {
        ndoe.removeAttribute(name);
    } else {
        node.setAttribute(name, value)
    }
}