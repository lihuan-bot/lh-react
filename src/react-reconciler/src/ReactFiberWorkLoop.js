/*
 * @Author: lihuan
 * @Date: 2023-07-13 11:13:07
 * @LastEditors: lihuan
 * @LastEditTime: 2023-07-19 09:55:28
 * @Email: 17719495105@163.com
 */
import { scheduleCallback } from 'scheduler'
import { createWorkInProgress } from './ReactFiber'
import { beginWork } from './ReactFiberBeginWork'
let workInProgress = null
export function scheduleUpdateOnFiber(root) {
    // 确保调度执行root上的更新
    ensureRootIsScheduled(root)
}
function ensureRootIsScheduled(root) {
    scheduleCallback(performConcurrentWorkOnFiber.bind(null,root))
}

/**
 * @description: 根据fiber构建fiber树要创建真实dom节点 还需要把真实dom节点插入容器
 * @param {*} root
 * @return {*}
 */
function performConcurrentWorkOnFiber(root) {
    // 以同步的方式渲染根节点，初次渲染的时候都是同步
    renderRootSync(root);
}
function prepareFreshStack(root) {
    workInProgress = createWorkInProgress(root.current,null)
}
function renderRootSync(root) {
    // 开始构建fiber
    prepareFreshStack(root)
    workLoopSync()
}
function workLoopSync() {
    while (workInProgress !== null) {
        performUnitOfWork(workInProgress)
    }
}

function performUnitOfWork(unitOfWork) {
    // 获取新fiber对应的老fiber
    const current = unitOfWork.alternate
    // 完成当前fiber的子fiber链表
    const next = beginWork(current, unitOfWork)
    unitOfWork.memoizedProps = unitOfWork.pendingProps
    if (next === null) { // 如果没有子节点表示当前fiber已经完成
        // completeUnitOfWork(unitOfWork)
        workInProgress = null
    } else {
        workInProgress = next
    }
}
