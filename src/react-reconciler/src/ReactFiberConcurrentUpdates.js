/*
 * @Author: lihuan
 * @Date: 2023-07-13 10:50:03
 * @LastEditors: lihuan
 * @LastEditTime: 2023-08-05 23:57:39
 * @Email: 17719495105@163.com
 */

import { HostRoot } from "./ReactWorkTags"
const concurrentQueue = []
let concurrentQueuesIndex = 0
/**
 * @description: 把更新先缓存到数组中
 * @param {*} fiber
 * @param {*} queue
 * @param {*} update
 * @return {*}
 */

export function finishQueueingConcurrentUpdates() {
    const endIndex = concurrentQueuesIndex
    concurrentQueuesIndex = 0
    let i = 0
    while (i < endIndex) {
        const fiber = concurrentQueue[i++]
        const queue = concurrentQueue[i++]
        const update = concurrentQueue[i++]
        if (queue !== null && update !== null) {
            const pending = queue.pending
            if (pending === null) { 
                update.next = update
            } else {
                update.next = pending.next
                pending.next = update
            }
            queue.pending = update
        }
    }
}
function enqueueUpdate(fiber, queue, update) {
    concurrentQueue[concurrentQueuesIndex++] = fiber;
    concurrentQueue[concurrentQueuesIndex++] = queue;
    concurrentQueue[concurrentQueuesIndex++] = update;
}
/**
 * @description: 把更新添加到更新队列中
 * @param {*} fiber
 * @param {*} queue
 * @param {*} update
 * @return {*}
 */
export function enqueueConcurrentHookUpdate(fiber,queue,update) {
    enqueueUpdate(fiber, queue, update)
    return getRootForUpdateFiber(fiber)
}
function getRootForUpdateFiber(sourceFiber) {
    let node = sourceFiber
    let parent = node.return
    while (parent !== null) {
        node = parent
        parent = node.return
    }
    return node.tag === HostRoot ? node.stateNode : null
}

/**
 * 本文件要处理更新优先级
 * 目前只实现向上查找根节点
 */
export function markUpdateLaneFromFiberToRoot(sourceFiber) {
    let node = sourceFiber // 当前fiber
    let parent = sourceFiber.return // 当前fiber的父fiber
    while (parent !== null) {
        node = parent
        parent = parent.return
    }
    // 查找到parrent为null
    if (node.tag === HostRoot) {
        return node.stateNode
    }

    return null
}