/*
 * @Author: lihuan
 * @Date: 2023-07-21 10:39:40
 * @LastEditors: lihuan
 * @LastEditTime: 2023-07-31 09:46:18
 * @Email: 17719495105@163.com
 */
export function setValueForProperty(node, name, value) {
    if (value === null) {
        node.removeAttribute(name);
    } else {
        node.setAttribute(name, value)
    }
}