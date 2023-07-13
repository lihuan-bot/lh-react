/*
 * @Author: lihuan
 * @Date: 2023-07-09 01:48:27
 * @LastEditors: lihuan
 * @LastEditTime: 2023-07-13 11:12:55
 * @Email: 17719495105@163.com
 */
import { createFilberRoot } from './ReactFilberRoot'
import { createUpdate, enqueueUpdate } from './ReactFiberClassUpdateQueue'
import { scheduleUpdateOnFiber } from './ReactFiberWorkLoop'
export function createContainer(containerInfo) {
    return createFilberRoot(containerInfo)
}
/**
 * 更新容器把虚拟dom element变成真实don插到container容器中
 * @param {*} element 虚拟dom
 * @param {*} container 容器 FirberRootNode containerInfo div#root
 */
export function updateContainer(element, container) {
    // 获取当前根fiber
    const current = container.current
    // 创建更新
    const updated = createUpdate()
    // 要更新的虚拟dom
    updated.payload = { element }
    // 把此更新添加到 current这个根fiber的更新队列上
    const root = enqueueUpdate(current, updated)
    
    scheduleUpdateOnFiber(root)

}