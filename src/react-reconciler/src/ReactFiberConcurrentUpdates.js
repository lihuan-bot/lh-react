/*
 * @Author: lihuan
 * @Date: 2023-07-13 10:50:03
 * @LastEditors: lihuan
 * @LastEditTime: 2023-07-13 11:02:58
 * @Email: 17719495105@163.com
 */

import { HostRoot } from "./ReactWorkTags"

/**
 * 本文件要处理更新优先级
 * 目前只实现向上查找根节点
 */
export function markUpdateLaneFromFiberToRoot(sourceFiber) {
    let node = sourceFiber // 当前fiber
    let parent = sourceFiber.return // 当前fiber的父fiber
    while (parent !== null) {
        node = parent
        parent = parent.return
    }
    // 查找到parrent为null
    if (node.tag === HostRoot) {
        return node.stateNode
    }

    return null
}