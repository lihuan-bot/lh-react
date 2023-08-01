/*
 * @Author: lihuan
 * @Date: 2023-07-31 15:37:45
 * @LastEditors: lihuan
 * @LastEditTime: 2023-07-31 15:57:28
 * @Email: 17719495105@163.com
 */

import { getFiberCurrentpropsFromNode } from "../client/ReactDOMComponentTree";

/**
 * @description: 获取此fiber对应的回调函数
 * @param {*} instance
 * @param {*} registrationName
 * @return {*}
 */
export default function getListener(instance,registrationName) {
    const { stateNode } = instance;
    if (stateNode === null) return null;
    const props = getFiberCurrentpropsFromNode(stateNode);
    if(props === null) return null;
    const listener = props[registrationName] // props.onClick
    return listener
}