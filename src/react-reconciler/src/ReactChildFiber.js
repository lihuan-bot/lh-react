/*
 * @Author: lihuan
 * @Date: 2023-07-16 22:35:29
 * @LastEditors: lihuan
 * @LastEditTime: 2023-07-19 13:44:29
 * @Email: 17719495105@163.com
 */

import { REACT_ELEMENT_TYPE } from "shared/ReactSymbols";
import { createFiberFromElement, createFiberFroText } from './ReactFiber'
import { Placement } from './ReactFiberFlags'
import isArray from 'shared/isArray'

/**
 * @description: 
 * @param {*} shouldTrackSideEffects 是否跟踪副作用
 * @return {*}
 */
function createChildReconciler(shouldTrackSideEffects) {
    function reconcileSingleElement(returnFiber, currentFirstFiber, element) {
        // 实现的挂载 所以currentFirstFiber没有 所以可以直接根据虚拟dom生成fiber节点
        const created = createFiberFromElement(element)
        created.return = returnFiber
        return created
    }
    function placeSingleChild(newFiber) {

        if (shouldTrackSideEffects) {
            // 添加副作用
            newFiber.flags |= Placement
        }
        return newFiber
    }
    function createChild(returnFiber,newChild) {
        if ((typeof newChild === 'string' && newChild !== '') || typeof newChild === 'number') {
            const created = createFiberFroText(`${newChild}`)
            created.return = returnFiber
            return created
        }
        if (typeof newChild === 'object' && newChild !== null) {
            switch (newChild.$$typeof) {
                case REACT_ELEMENT_TYPE:
                    {
                        const created = createFiberFromElement(newChild)
                        created.return = returnFiber
                        return created
                        }      
                default:
                    break;
            }
        }
        return null
    }
    function placeChild(newFiber, newIdnex) {
        newFiber.index = newIdnex
        if (shouldTrackSideEffects) {
            // 如果fiber上的flags上有Placement 说明此节点需要创建真实dom并且插入到父容器中
            //如果父节点是初次挂载 不需要添加flags 这种情况会在完成阶段把所有的子节点全部添加到自己身上
            newFiber.flags |= Placement
        }
        return newFiber
    }
    function reconcileChildrenArray(returnFiber,currentFirstFiber,newChild) {
        let resultingFirstFiber = null // 返回的第一个新儿子
        let previousNewFiber = null // 上一个新的fiber
        let newIdnex = 0
        for (; newIdnex < newChild.length; newIdnex++) {
            const newFiber = createChild(returnFiber,newChild[newIdnex])
            if (newFiber === null) continue
            placeChild(newFiber, newIdnex)
            // previousNewFiber =null 说明是第一个fiber
            if (previousNewFiber === null) {
                resultingFirstFiber = newFiber // 这个就是大儿子
            } else {
                // 不是大儿子 就把这个newFiber添加到上一个子节点后面
                previousNewFiber.sibling = newFiber
            }
            // 让newFiber成为上一子或者最后一个
            previousNewFiber = newFiber
        }
        return resultingFirstFiber
    }
    /**
     * @description: 比较子fibers dom-diff
     * @param {*} returnFiber 新的父fiber
     * @param {*} currentFirstFiber 老fiber第一个子fiber
     * @param {*} newChild 新的子虚拟dom h1虚拟dom
     * @return {*}
     */
    function reconcileChildFibers(returnFiber, currentFirstFiber, newChild) {
        //新节点只有一个的情况
        if (typeof newChild === 'object' && newChild !== null) {
            switch (newChild.$$typeof) {
                case REACT_ELEMENT_TYPE:
                    
                    return placeSingleChild(reconcileSingleElement(returnFiber,currentFirstFiber,newChild))
            
                default:
                    break;
            }
        }
        // newChild 是 【hellow文本节点，span虚拟dom节点】
        if (isArray(newChild)) {
            return reconcileChildrenArray(returnFiber,currentFirstFiber,newChild)
        }
        return null
    }
    return reconcileChildFibers
}
export const mountChildFibers = createChildReconciler(false)
export const reconcileChildFibers = createChildReconciler(true)