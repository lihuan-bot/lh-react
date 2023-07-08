/*
 * @Author: lihuan
 * @Date: 2023-07-08 11:19:18
 * @LastEditors: lihuan
 * @LastEditTime: 2023-07-08 11:37:25
 * @Email: 17719495105@163.com
 */

// react 17 之前 babel
import babel from '@babel/core'
const code = `
< h1 >
    hello <span style={{color:'red'}}>world</span>
</h1>
`

// classic
const result1 = babel.transform(code, {
    plugins: [
        ["@babel/plugin-transform-react-jsx",{runtime:'classic'}]
    ]
})

console.log(result1.code)

// /*#__PURE__*/React.createElement("h1", null, "hello ", /*#__PURE__*/React.createElement("span", {
//     style: {
//         color: 'red'
//       }
//     }, "world"));


// 新版 automatic
const result2 = babel.transform(code, {
    plugins: [
        ["@babel/plugin-transform-react-jsx",{runtime:'automatic'}]
    ]
})

console.log(result2.code)

// import { jsx as _jsx } from "react/jsx-runtime";
// import { jsxs as _jsxs } from "react/jsx-runtime";
// /*#__PURE__*/_jsxs("h1", {
//   children: ["hello ", /*#__PURE__*/_jsx("span", {
//     style: {
//       color: 'red'
//     },
//     children: "world"
//   })]
// });