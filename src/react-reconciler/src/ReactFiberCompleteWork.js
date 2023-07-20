/*
 * @Author: lihuan
 * @Date: 2023-07-20 09:43:01
 * @LastEditors: lihuan
 * @LastEditTime: 2023-07-20 14:51:27
 * @Email: 17719495105@163.com
 */
import logger, { indent } from 'shared/logger'
import { HostText } from './ReactWorkTags';
import { createTextInstance } from 'react-dom-bindings/src/client/ReactDomHostConfig'
import { NoFlags } from './ReactFiberFlags';
/**
 * @description: 完成一个fiber节点
 * @param {*} current 老fiber
 * @param {*} workInProgress 新构建的fiber
 * @return {*}
 */
export function completeWork(current, workInProgress) {
    indent.number -= 2
    logger(' '.repeat(indent.number) + 'completeWork', workInProgress)
    const newProps = workInProgress.pendingProps
    switch (workInProgress.tag) {
        case HostText:
            // 如果完成的fiber节点是一个文本节点 那就创建真实的文本节点
            const newText = newProps
            // 创建真实的dom节点并插入stateNode
            workInProgress.stateNode = createTextInstance(newText)
            // 向上冒泡
            bubbleProprieties(workInProgress)
            break;
    
        default:
            break;
    }
}

function bubbleProprieties(completedWork) {
    let subtreeFlags = NoFlags
    let child = completedWork.child
    // 遍历当前fiber所有子节点，把所有子节点的副作用，以及子节点的子节点的副作用全部合并
    while (child !== null) {
        subtreeFlags |= child.subtreeFlags
        subtreeFlags |= child.flags
        child = child.sibling
    }
    completedWork.subtreeFlags = subtreeFlags
}