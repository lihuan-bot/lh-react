/*
 * @Author: lihuan
 * @Date: 2023-07-09 11:22:35
 * @LastEditors: lihuan
 * @LastEditTime: 2023-08-06 10:12:49
 * @Email: 17719495105@163.com
 */
import { HostComponent, HostRoot, IndeterminateComponent, HostText } from './ReactWorkTags'

import { NoFlags } from './ReactFiberFlags'
/**
 * 
 * @param {*} tag  函数组件0 类组件1 原生组件5 根元素3
 * @param {*} pendingProps 新属性
 * @param {*} key 
 */
export function FiberNode(tag, pendingProps, key) {
    this.tag = tag
    this.key = key
    this.type = null // fiber类型 虚拟dom节点的type span div p
    // 每个虚拟dom =》 Fiber节点=》 真实dom
    this.stateNode = null // 此fiber对应的真实dom节点 h1=> 真实的h1don

    this.return = null  // 指向父节点
    this.child = null // 指向第一个子节点
    this.sibling = null // 指向弟弟
    // 虚拟dom会提供pendingProps用来创建fiber节点的属性
    this.pendingProps = pendingProps // 等待生效的属性
    this.memoizedProps = null  // 已经生效的属性
    // 每个fiber还会有自己的状态每一种fiber状态存的类型不一样
    //类组件存的是类的实例 HostRoot存的是渲染的元素
    this.memozedState = null

    this.updateQueue = null
    // 副作用标识
    this.flags = NoFlags
    // 子节点副作用标识
    this.subtreeFlags = NoFlags
    this.alternate = null
    this.index = 0
}
export function createFiber(tag, pendingProps, key) {
    return new FiberNode(tag, pendingProps, key)

}
export function createHostRootFiber() {
    return createFiber(HostRoot, null, null)
}
/**
 * @description: 基于老的fiber和新的属性创建新的fiber
 * @param {*} current 老的fiber
 * @param {*} penddingProps 新属性
 * @return {*}
 */
export function createWorkInProgress(current, pendingProps) {
    let workInProgress = current.alternate
    if (workInProgress ===   null) {
        workInProgress = createFiber(current.tag, pendingProps, current.key)
        workInProgress.type = current.type
        workInProgress.stateNode = current.stateNode
        workInProgress.alternate = current
        current.alternate = workInProgress
    } else {
        workInProgress.pendingProps = pendingProps
        workInProgress.type = current.type
        workInProgress.flags = NoFlags
        workInProgress.subtreeFlags = NoFlags

    }
    workInProgress.child = current.child
    workInProgress.memoizedProps = current.memoizedProps
    workInProgress.memoizedState = current.memoizedState
    workInProgress.updateQueue = current.updateQueue
    workInProgress.sibling = current.sibling
    workInProgress.index = current.index
    return workInProgress
}
/**
 * @description: 根据虚拟节点创建fiber
 * @param {*} element
 * @return {*}
 */
export function createFiberFromElement(element) {
    const { type, key, props } = element
    return createFiberFromTypeAndProps(type, key, props)


}

function createFiberFromTypeAndProps(type, key, penddingProps) {
    let tag = IndeterminateComponent
    // fiber是一个原生组件  span p div
    if (typeof type === 'string') {
        tag = HostComponent
    }
    const fiber = createFiber(tag, penddingProps, key)
    fiber.type = type
    return fiber
}

export function createFiberFromText(content) {
    const fiber = createFiber(HostText, content, null)
    return fiber

}