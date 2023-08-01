/*
 * @Author: lihuan
 * @Date: 2023-07-23 16:42:59
 * @LastEditors: lihuan
 * @LastEditTime: 2023-08-01 21:44:12
 * @Email: 17719495105@163.com
 */
import ReactSharedInternals from 'shared/ReactSharedInternals'
const { ReactCurrentDispatcher } =  ReactSharedInternals
const HooksDispatcherOnMount = {
    useReducer: mountReducer
}
function mountReducer(reducer, initialArg) {
    console.log(reducer, initialArg)
    return [initialArg]
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
    ReactCurrentDispatcher.current = HooksDispatcherOnMount
    // 需要在函数组件执行前给ReactCurrentDispatcher赋值
    const children = Component(props)
    return children
}