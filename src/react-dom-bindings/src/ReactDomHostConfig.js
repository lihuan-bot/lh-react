/*
 * @Author: lihuan
 * @Date: 2023-07-19 13:23:49
 * @LastEditors: lihuan
 * @LastEditTime: 2023-07-19 13:30:19
 * @Email: 17719495105@163.com
 */
export function shouldSetTextContent(type, props) {
    return typeof props.children === 'string' || typeof props.children === 'number'
}