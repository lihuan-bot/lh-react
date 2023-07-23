/*
 * @Author: lihuan
 * @Date: 2023-07-23 16:42:59
 * @LastEditors: lihuan
 * @LastEditTime: 2023-07-23 16:46:20
 * @Email: 17719495105@163.com
 */
/**
 * @description: 渲染函数组件
 * @param {*} current 老fiber
 * @param {*} workInProgress 新fiber
 * @param {*} Component 组件类型
 * @param {*} props 组件属性
 * @return {*}  虚拟dom或者react元素
 */
export function renderWithHooks(current, workInProgress, Component,props) {
    const children = Component(props)
    return children
}