/*
 * @Author: lihuan
 * @Date: 2023-07-08 11:46:07
 * @LastEditors: lihuan
 * @LastEditTime: 2023-10-26 19:14:40
 * @Email: 17719495105@163.com
 */
import hasOwnProperty from 'shared/hasOwnProperty'
import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols'

const RESERVED_PROPS = {
    key: true,
    ref: true,
    __self: true,
    __sources: true,
}
function hasValidKey(config) {
    return config.key !== undefined
}
function hasValidRef(config) {
    return config.ref !== undefined
}
function ReactElement(type, key, ref, props) {
    // react元素 也是虚拟dom
    return {
        $$typeof: REACT_ELEMENT_TYPE,
        type,
        key,
        ref,
        props
    }
}
export function jsxDEV(type, config,maybeKey) {
    let propName
    const props = {}
    let key = null
    let ref = null
    if (typeof maybeKey !=='undefined') {
        key = maybeKey
    }
    if (hasValidRef(config)) {
        ref = config.ref
    }
    for (propName in config) {
        if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
            props[propName] = config[propName]
        }
    }

    return ReactElement(type, key, ref, props)
}