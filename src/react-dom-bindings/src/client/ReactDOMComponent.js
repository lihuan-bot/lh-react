/*
 * @Author: lihuan
 * @Date: 2023-07-21 10:17:03
 * @LastEditors: lihuan
 * @LastEditTime: 2023-08-06 22:12:46
 * @Email: 17719495105@163.com
 */
import { setValueForStyles } from './CSSPropertyOperations'
import { setTextContent } from './setTextContent'
import { setValueForProperty } from './DOMPropertyOperations'
const STYLE = 'style'
const CHILDREN = 'children'
function setInitialDOMProperties(tag,domElement,nextProps) {
    for (const propKey in nextProps) {
        if (nextProps.hasOwnProperty(propKey)) {
            const nextProp = nextProps[propKey];
            if (propKey === STYLE) {
                setValueForStyles(domElement,nextProp)
            } else if (propKey === CHILDREN) {
                if (typeof nextProp === 'string') {
                 setTextContent(domElement,nextProp)
                } else if (typeof nextProp === 'number') {
                    setTextContent(domElement, `${nextProp}`)
                }
                
            } else if (nextProp !== null) {
                setValueForProperty(domElement,propKey,nextProp)
            }
        }
    }
}
export function setInitialProperties(domElement,tag,props) {
    setInitialDOMProperties(tag,domElement,props)
}

export function diffProperties(domElement, tag, lastProps, nextProps) {
    let updatePayload = null
    let propKey
    let styleName
    let styleUpdates = null
    // 处理属性的删除
    for (propKey in lastProps) {
        // 如果新的有 或者老的没有
        if (nextProps.hasOwnProperty(propKey) || !lastProps.hasOwnProperty(propKey) || lastProps[propKey] === null) {
            continue
        }
        if (propKey === STYLE) {
            const lastStyle = lastProps[propKey]
            for (styleName in lastStyle) {
                if (lastStyle.hasOwnProperty(styleName)) {
                    if (!styleUpdates) {
                        styleUpdates = {}
                    }
                    styleUpdates[styleName] = ''
                }
            }
        } else {
            (updatePayload = updatePayload || []).push(propKey,null)
        }
    }


    for (propKey in nextProps) {
        const nextProp = nextProps[propKey]
        const lastProp = lastProps !== null ? lastProps[propKey] : undefined
        if (!nextProps.hasOwnProperty(propKey) || nextProp === lastProp || (nextProp === null && lastProp === null)) {
          continue
        }
        if (propKey === STYLE) {
            if (lastProp) {
                for (styleName in lastProp) {
                    if (lastProp.hasOwnProperty(styleName) && (!nextProp || !nextProp.hasOwnProperty(styleName))) {
                        if (!styleUpdates) {
                            styleUpdates = {}
                            styleUpdates[styleName] = ''
                        }
                    }
                }
                for (styleName in nextProp) {
                    if (nextProp.hasOwnProperty(propKey) && lastProp[styleName] !== nextProp[styleName]) {
                        if (!styleUpdates) {
                            styleUpdates = {}
                            styleUpdates[styleName] = nextProp[styleName]
                        }
                        
                    }
                }
            } else {
                styleUpdates = nextProp
            }
        } else if(propKey === CHILDREN) {
            if (typeof nextProp === 'string' || typeof nextProp === 'number') {
                (updatePayload = updatePayload || []).push(propKey,nextProp)
            } else {
                (updatePayload = updatePayload || []).push(propKey,nextProp)
            }
        } else {
            (updatePayload = updatePayload || []).push(propKey, nextProp);
        }
    }
    if (styleUpdates) {
        (updatePayload = updatePayload || []).push(STYLE,styleUpdates)
    }
    return updatePayload
}