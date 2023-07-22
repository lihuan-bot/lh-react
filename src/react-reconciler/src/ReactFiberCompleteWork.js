/*
 * @Author: lihuan
 * @Date: 2023-07-20 09:43:01
 * @LastEditors: lihuan
 * @LastEditTime: 2023-07-22 22:08:37
 * @Email: 17719495105@163.com
 */
import logger, { indent } from 'shared/logger'
import { HostComponent, HostText, HostRoot } from './ReactWorkTags';
import { createTextInstance, createInstance, appendInitialChild, finalizeInitialChildren } from 'react-dom-bindings/src/client/ReactDOMHostConfig'
import { NoFlags } from './ReactFiberFlags';
/**
 * @description: 把当前完成的fiber所有子节点对应的真实dom挂到自己父parent真实dom节点上
 * @param {*} parent 当前完成的fiber的真实dom
 * @param {*} workInProgress 完成的fiber
 * @return {*}
 */
function appendAllChildren(parent, workInProgress) {
    let node = workInProgress.child
    while (node) {
        // 如果子节点是一个原生节点或者是文本节点
        if (node.tag === HostComponent || node.tag === HostText) {
            appendInitialChild(parent, node.stateNode)
            //如果第一个儿子不是原生节点 可能是函数组件
        } else if(node!==null){
            node = node.child
            continue
        }
        if (node === workInProgress) {
            return;
          }
        // 如果当前节点没有弟弟
        while (node.sibling === null) {
            if (node.return === null || node.return === workInProgress) {
                return;
              }
            // 回到父节点
            node = node.return
        }
       node = node.sibling
    }
}
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
        case HostRoot:
            bubbleProperties(workInProgress);
            break;
        case HostComponent:
            // 目前只是挂载和创建 后面要区分初次挂载和更新
            const { type } = workInProgress
            const instance = createInstance(type, newProps, workInProgress)
            // 把自己所有儿子都挂到自己身上
            appendAllChildren(instance,workInProgress)
            workInProgress.stateNode = instance
            finalizeInitialChildren(instance,type,newProps)
            bubbleProperties(workInProgress)
            break
        case HostText:
            // 如果完成的fiber节点是一个文本节点 那就创建真实的文本节点
            const newText = newProps
            // 创建真实的dom节点并插入stateNode
            workInProgress.stateNode = createTextInstance(newText)
            // 向上冒泡
            bubbleProperties(workInProgress)
            break;
        default:
            break;
    }
}

function bubbleProperties(completedWork) {
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