/*
 * @Author: lihuan
 * @Date: 2023-07-12 14:56:11
 * @LastEditors: lihuan
 * @LastEditTime: 2023-07-16 22:50:18
 * @Email: 17719495105@163.com
 */
import { markUpdateLaneFromFiberToRoot } from './ReactFiberConcurrentUpdates'
import assign from 'shared/assign'
export const UpdateState = 0
export function initialUpdateQueue(fiber) {
	const queue = {
		shared: {
			pedding: null
		}
	}
	fiber.updateQueue = queue
}
export function createUpdate() {
	const update = { tag: }
	return update
}
export function enqueueUpdate(fiber, update) {
	const updateQueue = fiber.updateQueue
	const shared = updateQueue.shared
	const pedding = shared.pedding
	if (pedding === null) {
		update.next = update
	} else {
		update.next = pedding.next
		pedding.next = update
	}
	// pending要指向最后一个更新，最后一个更新next指向第一个更新
	// 单向循环链表
	updateQueue.shared.pedding = update
	 return markUpdateLaneFromFiberToRoot(fiber)
}
/**
 * @description: 	根据老状态和更新队列中的更新计算最新的状态
 * @param {*} workInProgress 要计算的fiber
 * @return {*}
 */
export function processUpdateQueue(workInProgress) {
	const queue = workInProgress.updateQueue
	const pendingQueue = queue.shared.pending
	// 如果有更新或者更新队列中有内容
	if (pendingQueue !== null) {
		//清除等待生效的更新
		queue.shared.pending = null;
		// 获取更新队列中最后一个更新 update = { payload: { element:"h1" }}

		const lastPendingUpdate = pendingQueue
		const firstPendingUpdate = lastPendingUpdate.next
		//把更新链表剪开变成单向链表
		lastPendingUpdate.next = null;

		let newState = workInProgress.memoizedState
		let update = firstPendingUpdate
		while (update) {
			newState = getStateFromUpdate(update, newState)
			update = update.next
		}
		workInProgress.memoizedState = newState
	}

}
/**
 * @description: 根据老状态更新计算新状态
 * @param {*} update 更新的对象有很多状态
 * @param {*} prevState
 * @return {*}
 */
function getStateFromUpdate(update, prevState) {
	switch (update.tag) {
		case UpdateState:
			const { payload } =update
			return assign({}, prevState, payload)
	} 
}