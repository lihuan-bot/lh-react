/*
 * @Author: lihuan
 * @Date: 2023-07-14 09:12:59
 * @LastEditors: lihuan
 * @LastEditTime: 2023-07-14 09:32:07
 * @Email: 17719495105@163.com
 */
import * as ReactWoekTags from 'react-reconciler/src/ReactWorkTags'
const ReactWoekTagsMap  =new Map()
for (const tag in ReactWoekTags) {
    ReactWoekTagsMap.set(ReactWoekTags[tag],tag)
}
export default function (prefix, workinProgress) {
    let tagValue = workinProgress.tag
    let tagName = ReactWoekTagsMap.get(tagValue)
    let str = ` ${tagName} `
    if (tagName === 'HostComponent') {
        str + ` ${workinProgress.type} `
    } else if (tagName==='HostText') {
        str + ` ${workinProgress.pendingPropd} `
    }
    console.log(`${prefix} ${str}`)
}