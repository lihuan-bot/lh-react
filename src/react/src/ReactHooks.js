/*
 * @Author: lihuan
 * @Date: 2023-08-01 20:57:02
 * @LastEditors: lihuan
 * @LastEditTime: 2023-08-01 21:07:23
 * @Email: 17719495105@163.com
 */
import ReactCurrentDispatcher from './ReactCurrentDispatcher'

function resolveDispatcher() {
    return ReactCurrentDispatcher.current
}

/**
 * @description: 
 * @param {*} reducer 处理函数 用于根据老状态和动作计算状态
 * @param {*} initalArg 初始状态
 * @return {*}
 */
export function useReducer(reducer,initalArg) {
    const dispatcher = resolveDispatcher()
    return dispatcher.useReducer(reducer,initalArg)
}