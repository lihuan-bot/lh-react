/*
 * @Author: lihuan
 * @Date: 2023-07-13 11:13:07
 * @LastEditors: lihuan
 * @LastEditTime: 2023-07-22 22:05:45
 * @Email: 17719495105@163.com
 */
import { scheduleCallback } from 'scheduler'
import { createWorkInProgress } from './ReactFiber'
import { beginWork } from './ReactFiberBeginWork'
import { completeWork } from './ReactFiberCompleteWork'
import { NoFlags, MutationMask } from './ReactFiberFlags'
import { commitMutationEffectOnFiber } from './ReactFiberCommitWork'
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
    // 进入提交阶段 就是执行副作用 修改真实dom
    const finishedWork = root.current.alternate
    root.finishedWork = finishedWork
    commitRoot(root)
}
function commitRoot(root) {
    const { finishedWork } = root
    //判断子树有没有副作用
    const subtreeEffects = (finishedWork.subtreeFlags & MutationMask) !== NoFlags
    const rootHasEffects = (finishedWork.flags & MutationMask) !== NoFlags
    // 如果自己有副作用或者子节点有副作用就进行提交DOM操作
    if (subtreeEffects || rootHasEffects) {
        commitMutationEffectOnFiber(finishedWork,root)
    }
    // 等dom变更后就可以让root的current指向新的fiber树
    root.current = finishedWork
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
        completeUnitOfWork(unitOfWork)
    } else {
        workInProgress = next
    }
}
function completeUnitOfWork(unitOfWork) {
    let completedWork = unitOfWork
    do {
        const current = completedWork.alternate
        const rerutnFiber = completedWork.return
        // 执行此fiber的完成 如果是原生节点就创建真实dom节点
        completeWork(current, completedWork)
        const siblingFiber = completedWork.sibling
        // 如果有弟弟就构建弟弟对应的fiber子链表
        if (siblingFiber !== null) {
            workInProgress = siblingFiber
            return
        }
        // 如果没有弟弟 说明当前完成的就是父Fiber的最后一个节点
        // 也就是一个父fiber的所有子fiber全部完成了
        completedWork = rerutnFiber
        workInProgress = completedWork
    }while(completedWork !== null)
}