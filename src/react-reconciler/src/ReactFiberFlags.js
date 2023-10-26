/*
 * @Author: lihuan
 * @Date: 2023-07-09 22:31:13
 * @LastEditors: lihuan
 * @LastEditTime: 2023-10-26 19:28:25
 * @Email: 17719495105@163.com
 */
export const NoFlags = 0b0000000000000000000000000000;

export const PerformedWork = 0b0000000000000000000000000001;

export const Placement = 0b0000000000000000000000000010;

export const Update = 0b00000000000000000000000000100;

export const ChildDeletion = 0b000000000000000000000000001000;

export const MutationMask = Update | Placement | ChildDeletion
