'use client'
import * as React from 'react'
import { zhCN } from '@mui/material/locale'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { colorSchemes, typography, shadows, shape } from './themePrimitives'

/**
 * Material-UI 主题提供者组件
 * 
 * @component
 * @param {Object} props - 组件属性
 * @param {React.ReactNode} props.children - 子组件
 * 
 * @description
 * 该组件负责配置和提供全局 Material-UI 主题。
 * 使用 useMemo 缓存主题配置以优化性能。
 * 主题配置包括：
 * - CSS 变量配置
 * - 颜色方案
 * - 排版样式
 * - 阴影效果
 * - 形状样式
 * - 中文语言支持
 * 
 * @example
 * ```tsx
 * <AppTheme>
 *   <App />
 * </AppTheme>
 * ```
 */
export default async function AppTheme({ children }: { children: React.ReactNode }) {
    const theme = React.useMemo(() => {
        return createTheme(
            {
                cssVariables: {
                    colorSchemeSelector: 'data-mui-color-scheme', // 颜色方案选择器
                    cssVarPrefix: 'template', // CSS 变量前缀
                },
                colorSchemes, // 颜色方案配置
                typography, // 排版配置
                shadows, // 阴影配置
                shape, // 形状配置
            },
            zhCN // 中文语言包
        )
    }, [])
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
