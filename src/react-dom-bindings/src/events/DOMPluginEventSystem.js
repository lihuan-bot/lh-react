/*
 * @Author: lihuan
 * @Date: 2023-07-27 13:07:37
 * @LastEditors: lihuan
 * @LastEditTime: 2023-07-28 23:19:42
 * @Email: 17719495105@163.com
 */

import { allNativeEvents } from './EventRegistry'
import * as SimpleEventPlugin from './plugins/SimpleEventPlugin'

SimpleEventPlugin.registerEvents()

export function listenToAllSupportedEvents(rootContainerElement) {
    allNativeEvents.forEach((domEventName) => {
        
    })
}