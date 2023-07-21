/*
 * @Author: lihuan
 * @Date: 2023-07-21 10:27:47
 * @LastEditors: lihuan
 * @LastEditTime: 2023-07-21 10:30:42
 * @Email: 17719495105@163.com
 */
export function setValueForStyles(node,styles) {
    const { style } = node
    // styles = {color:'red'}
    for (const styleName in styles) {
        if (styles.hasOwnProperty(styleName)) {
            const styleValue = styles[styleName];
            style[styleName] = styleValue
            
        }
    }
}