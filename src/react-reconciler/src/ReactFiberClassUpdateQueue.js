/*
 * @Author: lihuan
 * @Date: 2023-07-12 14:56:11
 * @LastEditors: lihuan
 * @LastEditTime: 2023-07-13 10:59:14
 * @Email: 17719495105@163.com
 */
import { markUpdateLaneFromFiberToRoot } from './ReactFiberConcurrentUpdates'

export function initialUpdateQueue(fiber) {
	const queue = {
		shared: {
			pedding: null
		}
	}
	fiber.updateQueue = queue
}
export function createUpdate() {
	return {}
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