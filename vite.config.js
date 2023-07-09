/*
 * @Author: lihuan
 * @Date: 2023-07-08 10:33:11
 * @LastEditors: lihuan
 * @LastEditTime: 2023-07-09 01:47:24
 * @Email: 17719495105@163.com
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
const resolve = (name) => path.posix.resolve(name)

export default defineConfig({
    resolve: {
        alias: {
            react: resolve('src/react'),
            'react-dom': resolve('src/react-dom'),
            'react-reconciler': resolve('src/react-reconciler'),
            shared:resolve('src/shared')
        }
    },
    plugins: [
        react()
    ]
})