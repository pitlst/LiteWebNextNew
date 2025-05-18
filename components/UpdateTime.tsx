'use server'

import * as React from 'react'
import { InitDBConnect } from "@/components/utils/db";
import Typography from '@mui/material/Typography'

/**
 * UpdateTime 组件 - 显示数据最近更新时间的服务器组件
 * 
 * @component
 * @async
 * @param {string} name - 更新时间记录的标识名称，用于在数据库中查询对应的更新时间记录
 * 
 * @description
 * 该组件会从 MongoDB 数据库中查询指定名称的更新时间记录。
 * 连接 "liteweb" 数据库的 "update_time" 集合，获取最新的更新时间。
 * 如果没有找到对应的更新时间记录，将显示默认文本 "暂无更新时间"。
 * 
 * @example
 * ```tsx
 * <UpdateTime name="data_refresh" />
 * ```
 * 
 * @returns {Promise<JSX.Element>} 返回一个 Typography 组件，显示：
 * - 固定的说明文本："数据非实时更新，后台任务定时刷新"
 * - 动态的更新时间或默认文本
 */
export interface UpdateTimeProps {
    name: string,
}

export default async function UpdateTime({ name }: UpdateTimeProps) {
    const client = await InitDBConnect();
    const updateTime_data = await client.db("liteweb").collection("update_time").findOne({ name: name });
    const updateTime: string = updateTime_data?.time;
    return (            
        <Typography color="textSecondary" sx={{ mb: 2 }}>
            数据非实时更新，后台任务定时刷新，最近更新时间：{updateTime || '暂无更新时间'}
        </Typography>
    )
}