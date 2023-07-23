/*
 * @Author: lihuan
 * @Date: 2023-07-09 11:24:30
 * @LastEditors: lihuan
 * @LastEditTime: 2023-07-23 15:51:38
 * @Email: 17719495105@163.com
 */
export const FunctionComponent = 0
export const ClassComponent = 0
export const IndeterminateComponent = 2 // 组件分为函数组件和类组件 最开始都是函数
export const HostRoot = 3 // 根fiber tag类型
export const HostComponent = 5 // 原生节点 span p div
export const HostText = 6 // 文本