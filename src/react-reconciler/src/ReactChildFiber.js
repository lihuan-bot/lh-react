/*
 * @Author: lihuan
 * @Date: 2023-07-16 22:35:29
 * @LastEditors: lihuan
 * @LastEditTime: 2023-07-19 09:50:38
 * @Email: 17719495105@163.com
 */

import { REACT_ELEMENT_TYPE } from "shared/ReactSymbols";
import { createFiberFromElement } from './ReactFiber'
import { Placement } from './ReactFiberFlags'

/**
 * @description: 
 * @param {*} shouldTrackSideEffects 是否跟踪副作用
 * @return {*}
 */
function createChildReconciler(shouldTrackSideEffects) {
    function reconcileSingleElement(returnFiber, currentFirstFiber, element) {
        // 实现的挂载 所以currentFirstFiber没有 所以可以直接根据虚拟dom生成fiber节点
        const created = createFiberFromElement(element)
        created.returnFiber = returnFiber
        return created
    }
    function placeSingleChild(newFiber) {

        if (shouldTrackSideEffects) {
            // 添加副作用
            newFiber.flags |= Placement
        }
        return newFiber
    }
    /**
     * @description: 比较子fibers dom-diff
     * @param {*} returnFiber 新的父fiber
     * @param {*} currentFirstFiber 老fiber第一个子fiber
     * @param {*} newChild 新的子虚拟dom h1虚拟dom
     * @return {*}
     */    
    function reconcileChildFibers(returnFiber,currentFirstFiber,newChild) {
        if (typeof newChild === 'object' && newChild !== null) {
            switch (newChild.$$typeof) {
                case REACT_ELEMENT_TYPE:
                    
                    return placeSingleChild(reconcileSingleElement(returnFiber,currentFirstFiber,newChild))
            
                default:
                    break;
            }
        }
    }
    return reconcileChildFibers
}
export const mountChildFibers = createChildReconciler(false)
export const reconcileChildFibers = createChildReconciler(true)