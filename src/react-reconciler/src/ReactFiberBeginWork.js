/*
 * @Author: lihuan
 * @Date: 2023-07-13 16:51:46
 * @LastEditors: lihuan
 * @LastEditTime: 2023-07-19 13:45:09
 * @Email: 17719495105@163.com
 */
import logger from 'shared/logger'
import { HostComponent, HostRoot, HostText } from './ReactWorkTags';
import { processUpdateQueue } from './ReactFiberClassUpdateQueue'
import { mountChildFibers, reconcileChildFibers } from './ReactChildFiber'
import { shouldSetTextContent } from 'react-dom-bindings/src/ReactDomHostConfig'
/**
 * @description: 根据新的虚拟dom生成新的fiber链表
 * @param {*} current 父fiber
 * @param {*} workInProgress 新的父fiber
 * @param {*} nextChildren 新的子虚拟dom
 * @return {*}
 */
function reconcileChildren(current,workInProgress,nextChildren) {
	if (current === null) {
		workInProgress.child = mountChildFibers(workInProgress,null,nextChildren)
	} else {
		//如果有老fiber 做dom-diff 做最小化更新
		workInProgress.child = reconcileChildFibers(workInProgress,current.child,nextChildren) //
		}
}
function updateHostRoot(current, workInProgress) {
    // 需要知道它的子虚拟dom，知道它的儿子的虚拟dom信息
    processUpdateQueue(workInProgress) // 根节点的虚拟dom在更新队列上 workInProgress.memoizedState = { element }
    const nextState = workInProgress.memoizedState
    const nextChildren = nextState.element
    // 协调子节点
    reconcileChildren(current, workInProgress, nextChildren)
    return workInProgress.child

}
function updateHostComponent(current, workInProgress) {
    const { type } = workInProgress
    const nextProps = workInProgress.pendingProps
    let nextChildren = nextProps.children
    // 判断当前节点是不是一个单独文本
    const isDirectTextChild = shouldSetTextContent(type, nextProps)
    if (isDirectTextChild) {
        nextChildren = null
    }
    reconcileChildren(current, workInProgress, nextChildren)
    return workInProgress.child
}
/**
 * @description: 目标根据新的虚拟dom构建新的fiber子链表 child.sibling
 * @param {*} current 老fiber
 * @param {*} workInProgress 新fiber
 * @return {*}
 */
export function beginWork(current,workInProgress) {
    switch (workInProgress.tag) {
        case HostRoot:
            return updateHostRoot(current, workInProgress)
        case HostComponent:
            return updateHostComponent(current, workInProgress)
        case HostText:
            return null
        default:
            return null
    }
}   