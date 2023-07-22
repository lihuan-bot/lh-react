/*
 * @Author: lihuan
 * @Date: 2023-07-21 16:55:08
 * @LastEditors: lihuan
 * @LastEditTime: 2023-07-22 22:04:53
 * @Email: 17719495105@163.com
 */

import { MutationMask, Placement } from "./ReactFiberFlags";
import { HostComponent, HostRoot, HostText } from "./ReactWorkTags";
import { appendChild } from 'react-dom-bindings/src/client/ReactDOMHostConfig'



function recursivelyTraverseMutationEffects(root,parentFiber) {
    if (parentFiber.subtreeFlags & MutationMask) {
        let { child } = parentFiber

        while (child!==null) {
            commitMutationEffectOnFiber(child, root)
            child = child.sibling
        }
    }
}
function commitReconciliationEffects(finishedWork) {
    const { flags } = finishedWork
    // 如果此fiber要进行插入操作
    if (flags & Placement) {
        // 进行插入操作 也就是把此fiber对应的真实dom节点添加到父节点上
        commitPlacement(finishedWork)
        finishedWork.flags & ~Placement
    }

}
function isHostParent(fiber) {
    return fiber.tag === HostComponent || fiber.tag === HostRoot // div#root
}
function getHostParentFiber(fiber) {
    let parent = fiber.return
    while (parent !== null) {
        if (isHostParent(parent)) {
            return parent
        }
        parent = parent.parent
    }
}
/**
 * @description: 
 * @param {*} node 要插入的fiber节点
 * @param {*} parent 父真实dom节点
 * @return {*}
 */
function insertNode(node, parent) {
    const { tag } = node
    // 判断此fiber节点是不是真实dom节点
    const isHost = tag === HostComponent || tag === HostText
    if (isHost) {
        const { stateNode } = node
        appendChild(parent,stateNode)
    } else {
        // 如果node不是真实dom节点 获取他的大儿子
        const { child } = node
        if (child !== null) {
            insertNode(node, parent)
            let { sibling } = child
            while (sibling !== null) {
                insertNode(sibling, parent)
                sibling = sibling.sibling
            }
        }
    }
}
/**
 * @description: 把此fiber的真实dom插到父dom里
 * @param {*} finishedWork
 * @return {*}
 */
function commitPlacement(finishedWork) {
    const parentFiber = getHostParentFiber(finishedWork)
    switch (parentFiber.tag) {
        case HostRoot:{
            const parent = parentFiber.stateNode.containerInfo
            insertNode(finishedWork, parent)
            break;
            }
        case HostComponent: {
            const parent = parentFiber.stateNode
            insertNode(finishedWork, parent)
            break;
            }
        default:
            break;
    }
}
/**
 * @description: 遍历fiber，执行fiber上的副作用
 * @param {*} finishedWork fiber节点
 * @param {*} root 根节点
 * @return {*}
 */
export function commitMutationEffectOnFiber(finishedWork,root) {
    switch (finishedWork.tag) {
        case HostRoot:
        case HostComponent:
        case HostText: {
            // 先遍历他们的子节点 处理他们子节点上的副作用
            recursivelyTraverseMutationEffects(root, finishedWork)
            // 在处理自己身上的副作用
            commitReconciliationEffects(finishedWork)
            break;
        }
        default:
            break;
    }
}