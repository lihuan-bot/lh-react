/*
 * @Author: lihuan
 * @Date: 2023-07-16 22:35:29
 * @LastEditors: lihuan
 * @LastEditTime: 2023-07-16 22:52:46
 * @Email: 17719495105@163.com
 */
/**
 * @description: 
 * @param {*} shouldTrackSideEffects 是否跟踪副作用
 * @return {*}
 */
function createChildReconciler(shouldTrackSideEffects) {
    /**
     * @description: 比较子fibers dom-diff
     * @param {*} returnFiber 新的父fiber
     * @param {*} currentFirstFiber 老fiber第一个子fiber
     * @param {*} newChild 新的子虚拟dom h1虚拟dom
     * @return {*}
     */    
    function reconcileChildFibers(returnFiber,currentFirstFiber,newChild) {

    }
    return reconcileChildFibers
}
export const mountChildFibers = createChildReconciler(false)
export const reconcileChildFibers = createChildReconciler(true)