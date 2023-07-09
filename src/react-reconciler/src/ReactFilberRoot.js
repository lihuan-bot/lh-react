/*
 * @Author: lihuan
 * @Date: 2023-07-09 10:23:42
 * @LastEditors: lihuan
 * @LastEditTime: 2023-07-09 11:25:56
 * @Email: 17719495105@163.com
 */
import { createHostRootFiber } from './ReactFiber'
function FilberRootNode(containerInfo) {
    this.containerInfo = containerInfo;
}
export function createFilberRoot(containerInfo) {
    const root = new FilberRootNode(containerInfo)
    // hostRoot 是跟节点 div#root
    const uninitializedFiber = createHostRootFiber()
    root.current = uninitializedFiber
    uninitializedFiber.stateNode = root
    return root

}