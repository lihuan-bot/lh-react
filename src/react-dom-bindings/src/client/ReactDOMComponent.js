/*
 * @Author: lihuan
 * @Date: 2023-07-21 10:17:03
 * @LastEditors: lihuan
 * @LastEditTime: 2023-07-31 09:43:31
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