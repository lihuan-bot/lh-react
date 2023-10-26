/*
 * @Author: lihuan
 * @Date: 2023-07-23 16:42:59
 * @LastEditors: lihuan
 * @LastEditTime: 2023-08-21 10:22:09
 * @Email: 17719495105@163.com
 */
import ReactSharedInternals from 'shared/ReactSharedInternals'
import { scheduleUpdateOnFiber } from './ReactFiberWorkLoop'
import { enqueueConcurrentHookUpdate } from './ReactFiberConcurrentUpdates'
const { ReactCurrentDispatcher } = ReactSharedInternals
let currentlyRenderingFiber = null
let workInProgressHook = null
let currentHook = null
const HooksDispatcherOnMount = {
    useReducer: mountReducer,
    useState: mountState,
}
const HooksDispatcherOnUpdate = {
    useReducer: updateReducer,
    useState: updateState,
}
/**
 * @description: 构建新hooks
 * @return {*}
 */
function updateWorkInProgressHook() {
    if (currentHook === null) {
        const current = currentlyRenderingFiber.alternate
        currentHook = current.memoizedState
    } else {
        currentHook = currentHook.next
    }
    const newHook = {
        memoizedState: currentHook.memoizedState,
        queue: currentHook.queue,
        next:null
    }
    if (workInProgressHook === null) {
        currentlyRenderingFiber.memoizedState = workInProgressHook = newHook
        
    } else {
        workInProgressHook = workInProgressHook.next = newHook
    }
    return workInProgressHook
}
function baseStateReducer(state,action) {
 return typeof action === 'function' ? action(state) : action
}
function updateState() {
    return updateReducer(baseStateReducer)
}
function mountState(initialState) {
    const hook = mountWorkInProgressHook()
    hook.memoizedState = initialState
    const queue = {
        pending: null,
        dispatch: null,
        lastRenderedReducer: baseStateReducer, 
        lastRenderedState: initialState

    }
    hook.queue = queue
    const dispatch = (queue.dispatch = dispatchSetState.bind(null, currentlyRenderingFiber, queue))
    return [hook.memoizedState,dispatch]
}
function dispatchSetState(fiber,queue,action) {
      const update = {
          action, 
          hasEaferState: false, // 是否有急切的更新
          eagerState: null, // 急切的更新状态
          next: null,
      }
    // 没有像更新一样复用mountReducer 为了做个优化 当状态不变时跳过更新
    // 当派发动作时立即用上一次的状态和reducer计算状态
    const { lastRenderedReducer, lastRenderedState } = queue
    const eagerState = lastRenderedReducer(lastRenderedState, action)
    update.hasEaferState = true
    update.eagerState = eagerState
    if (Object.is(eagerState, lastRenderedState)) {
        return
    }
    const root = enqueueConcurrentHookUpdate(fiber, queue, update)
    scheduleUpdateOnFiber(root)
}
function updateReducer(reducer) {
    const hook = updateWorkInProgressHook()
    const queue = hook.queue
    const current = currentHook
    // 获取将要生效的更新队列
    const pendingQueue = queue.pending
    let newState = current.memoizedState
    if (pendingQueue !== null) {
        queue.pending = null
        // pendingQueue最后一个更新
        const firstUpdate = pendingQueue.next
        let update = firstUpdate
        do {
            if (update.hasEaferState) {
                newState = update.eagerState
            } else {
                const action = update.action
                newState = reducer(newState, action)
            }
            update = update.next
        } while (update !== null && update !== firstUpdate);
    }
    hook.memoizedState = newState
    return [hook.memoizedState,queue.dispatch]

}
function mountReducer(reducer, initialArg) {
    const hook = mountWorkInProgressHook()
    hook.memoizedState = initialArg
    const queue = {
        pending: null,
        dispatch:null
    }
    hook.queue = queue
    const dispatch = (queue.dispatch = dispatchReducerAction.bind(null,currentlyRenderingFiber,queue))
    return [hook.memoizedState, dispatch]
}
/**
 * @description: 执行派发动作的方法
 * @param {*} fiber function对应的fiber
 * @param {*} queue hook 对应的更新队列
 * @param {*} action 派发动作
 * @return {*}
 */
function dispatchReducerAction(fiber, queue, action) {
    // 每个hook里都会存放一个更新队列 update1.next = update2.next = update3.next
    const update = {
        action, 
        next: null,
    }
    // 把当前最新的更新添加到更新队列
    const root = enqueueConcurrentHookUpdate(fiber, queue, update)
    scheduleUpdateOnFiber(root)
}
function mountWorkInProgressHook() {
    const hook = {
        memoizedState: null, // hook的状态 0
        queue: null, // 存放本hook的更新队列 queue.pending = update的循环链表
        next: null, // 指向下一个hook，一个函数里可以有多个hook 会形成一个单向环状链表
    }
    if (workInProgressHook === null) {
        // 当前函数对应的fiber状态等于第一个hook对象
        currentlyRenderingFiber.memoizedState = workInProgressHook = hook
    } else {
        workInProgressHook = workInProgressHook.next = hook
    }
    return workInProgressHook
}
/**
 * @description: 渲染函数组件
 * @param {*} current 老fiber
 * @param {*} workInProgress 新fiber
 * @param {*} Component 组件类型
 * @param {*} props 组件属性
 * @return {*}  虚拟dom或者react元素
 */
export function renderWithHooks(current, workInProgress, Component, props) {
    currentlyRenderingFiber = workInProgress // 函数组件对应的fiber
    if (current !== null && current.memoizedState !== null) {
        ReactCurrentDispatcher.current = HooksDispatcherOnUpdate
    } else {
        ReactCurrentDispatcher.current = HooksDispatcherOnMount
    }
    // 需要在函数组件执行前给ReactCurrentDispatcher赋值
    const children = Component(props)
    currentlyRenderingFiber = null
    workInProgressHook = null
    currentHook = null
    return children
}