'use client'
/**
 * @file UpdateTime.tsx
 * @description 数据更新时间显示组件
 * 
 * 该组件用于显示特定数据集的最近更新时间，包含以下功能：
 * 1. 从服务器获取数据更新时间
 * 2. 在加载过程中显示加载状态
 * 3. 加载完成后显示具体更新时间
 * 
 * 技术特点：
 * - 使用 React 函数式组件和 Hooks
 * - 采用 Material-UI Typography 组件
 * - 支持异步数据加载
 * - 优雅的加载状态处理
 */



import * as React from 'react'
import Typography from '@mui/material/Typography'
import GetUpdateTime from '@/components/data/update_time'

/**
 * 更新时间组件属性接口
 * 
 * @interface UpdateTimeProps
 * @property {string} name - 需要获取更新时间的数据集名称
 */
export interface UpdateTimeProps {
    name: string
}

/**
 * 更新时间显示组件
 * 
 * @description
 * 该组件用于显示数据的最近更新时间，具有以下特点：
 * 1. 接收数据集名称作为参数
 * 2. 组件挂载时自动获取更新时间
 * 3. 在加载过程中显示"正在获取......"
 * 4. 加载完成后显示具体的更新时间
 * 
 * 状态管理：
 * - 使用 useState 管理更新时间数据
 * - 使用 useEffect 处理数据获取
 * 
 * 样式特点：
 * - 使用次要文本颜色
 * - 底部保持统一间距
 * 
 * @param {UpdateTimeProps} props - 组件属性
 * @returns {JSX.Element} 返回显示更新时间的Typography组件
 */
export default function UpdateTime(props: UpdateTimeProps) {
    const [UpdateTimeData, setUpdateTimeData] = React.useState<string | null>(null)
    React.useEffect(() => {
        async function fetchPosts() {
            const data = await GetUpdateTime(props.name)
            setUpdateTimeData(data)
        }
        fetchPosts()
    }, [])
    if (UpdateTimeData === null) {
        return (
            <Typography color="textSecondary" sx={{ mb: 2 }}>
                数据非实时更新，后台任务定时刷新，最近更新时间：正在获取......
            </Typography>
        )
    }
    else {
        return (
            <Typography color="textSecondary" sx={{ mb: 2 }}>
                数据非实时更新，后台任务定时刷新，最近更新时间：{UpdateTimeData}
            </Typography>
        )
    }
}