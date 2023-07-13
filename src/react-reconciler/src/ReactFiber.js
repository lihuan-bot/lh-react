/*
 * @Author: lihuan
 * @Date: 2023-07-09 11:22:35
 * @LastEditors: lihuan
 * @LastEditTime: 2023-07-12 13:51:14
 * @Email: 17719495105@163.com
 */
import { HostRoot } from './ReactWorkTags'

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
    this.memozedProps = null  // 已经生效的属性
    // 每个fiber还会有自己的状态每一种fiber状态存的类型不一样
    //类组件存的是类的实例 HostRoot存的是渲染的元素
    this.memozedState = null

    this.updateQueue = null
    // 副作用标识
    this.flags = NoFlags
    // 子节点副作用标识
    this.subtreeFlags = NoFlags
    this.alternate = null
}
export function createFiber(tag, pendingProps, key) {
    return new FiberNode(tag, pendingProps, key)

}
export function createHostRootFiber() {
    return createFiber(HostRoot, null, null)
}