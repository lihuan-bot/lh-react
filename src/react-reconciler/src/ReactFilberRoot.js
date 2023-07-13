/*
 * @Author: lihuan
 * @Date: 2023-07-09 10:23:42
 * @LastEditors: lihuan
 * @LastEditTime: 2023-07-12 15:02:23
 * @Email: 17719495105@163.com
 */
import { createHostRootFiber } from './ReactFiber'
import { initialUpdateQueue } from './ReactFiberClassUpdateQueue'
function FilberRootNode(containerInfo) {
    this.containerInfo = containerInfo;
}
export function createFilberRoot(containerInfo) {
    const root = new FilberRootNode(containerInfo)
    // hostRoot 是跟节点 div#root
    const uninitializedFiber = createHostRootFiber()
    root.current = uninitializedFiber
    uninitializedFiber.stateNode = root
    initialUpdateQueue(uninitializedFiber)
    return root

}