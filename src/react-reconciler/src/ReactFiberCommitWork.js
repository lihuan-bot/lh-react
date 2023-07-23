/*
 * @Author: lihuan
 * @Date: 2023-07-21 16:55:08
 * @LastEditors: lihuan
 * @LastEditTime: 2023-07-23 16:38:26
 * @Email: 17719495105@163.com
 */

import { MutationMask, Placement } from "./ReactFiberFlags";
import { FunctionComponent, HostComponent, HostRoot, HostText } from "./ReactWorkTags";
import { appendChild, insertBefore } from 'react-dom-bindings/src/client/ReactDOMHostConfig'



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
function insertOrAppendPlacementNode(node, before, parent) {
    const { tag } = node
    // 判断此fiber节点是不是真实dom节点
    const isHost = tag === HostComponent || tag === HostText
    if (isHost) {
        const { stateNode } = node
        if (before) {
            insertBefore(parent, stateNode, before)
        } else {
            appendChild(parent, stateNode)
        }
    } else {
        // 如果node不是真实dom节点 获取他的大儿子
        const { child } = node
        if (child !== null) {
            insertOrAppendPlacementNode(child, before, parent)
            let { sibling } = child
            while (sibling !== null) {
                insertOrAppendPlacementNode(sibling, before, parent)
                sibling = sibling.sibling
            }
        }
    }
}
/**
 * @description: 找到要插入的锚点
 * @param {*} fiber
 * @return {*}
 */
function getHostSibling(fiber) {
    let node = fiber
    siblings: while (true) {
        while (node.sibling === null) {
            if (node.return === null || isHostParent(node.return)) {
                return null;
            }
            node = node.return;
        }
        node = node.sibling
        // 如果弟弟不是原生节点 也不是文本节点
        while (node.tag !== HostComponent && node.tag !== HostText) {
            // 如果此节点是一个将要插入的新的节点 找他的弟弟
            if (node.tag & Placement) {
                continue siblings;
            } else {
                node = node.child
            }
        }
        if (!(node.flags & Placement)) {
            return node.stateNode
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
            const before = getHostSibling(finishedWork)
            insertOrAppendPlacementNode(finishedWork, before,parent)
            break;
            }
        case HostComponent: {
            const parent = parentFiber.stateNode
            const before = getHostSibling(finishedWork)
            insertOrAppendPlacementNode(finishedWork, before,parent)
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
        case FunctionComponent:
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