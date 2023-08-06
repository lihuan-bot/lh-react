/*
 * @Author: lihuan
 * @Date: 2023-07-31 13:46:30
 * @LastEditors: lihuan
 * @LastEditTime: 2023-08-06 15:47:24
 * @Email: 17719495105@163.com
 */
const randomKey = Math.random().toString(32).slice(2)
const internalInstanceKey = '__reactFibers$' + randomKey
const internalPropsKey = '__reactProps$' + randomKey
/**
 * @description: 从真实dom节点上获取它对应的fiber节点
 * @param {*} targetNode
 * @return {*}
 */
export function getClosestInstanceFromNode(targetNode) {
    const targetInst = targetNode[internalInstanceKey];
    if(targetInst) return targetInst
    return null
}
/**
 * @description: 缓存fiber节点的实例到dom节点上
 * @param {*} hostInst
 * @param {*} node
 * @return {*}
 */
export function precacheFiberNode(hostInst, node) {
    node[internalInstanceKey] = hostInst
}

export function updateFiberProps(node, props) {
    node[internalPropsKey] = props
}
export function getFiberCurrentpropsFromNode(node) {
    return node[internalPropsKey] || null
}