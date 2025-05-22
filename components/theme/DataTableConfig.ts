'use client'
import * as React from 'react'
import { MRT_Localization_ZH_HANS } from 'material-react-table/locales/zh-Hans'
import { useColorScheme } from '@mui/material/styles'

export default function GetDataTableConfig() {
    const { mode } = useColorScheme() // 使用 useColorScheme Hook 获取当前主题模式
    const actualMode = mode === 'system' ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : mode
    const data = React.useMemo(() => {
        return {
            localization: MRT_Localization_ZH_HANS,
            muiTablePaperProps: {
                elevation: 0, // 设置为0以移除阴影
                sx: {
                    border: 'none',
                    backgroundColor: actualMode === 'light'? 'hsl(0, 0%, 99%)' : 'hsl(220, 30%, 7%)',
                },
            },

            // 添加以下配置来移除按钮边框
            muiTableHeadCellProps: {
                sx: {
                    backgroundColor: actualMode === 'light' ? 'hsl(0, 0%, 99%)' : 'hsl(220, 30%, 7%)',
                    '& .MuiButtonBase-root': {
                        border: 'none',
                    },
                },
            },
            muiTableBodyRowProps: {
                sx: {
                    backgroundColor: actualMode === 'light' ? 'hsl(0, 0%, 99%)' : 'hsl(220, 30%, 7%)',
                },
            },
            muiTopToolbarProps: {
                sx: {
                    backgroundColor: actualMode === 'light' ? 'hsl(0, 0%, 99%)' : 'hsl(220, 30%, 7%)',
                    '& .MuiButtonBase-root': {
                        border: 'none',
                    },
                },
            },
            muiTableBodyCellProps: {
                sx: {
                    backgroundColor: actualMode === 'light' ? 'hsl(0, 0%, 99%)' : 'hsl(220, 30%, 7%)',
                    '& .MuiButtonBase-root': {
                        border: 'none',
                    },
                },
            },
            muiBottomToolbarProps: {
                sx: {
                    backgroundColor: actualMode === 'light' ? 'hsl(0, 0%, 99%)' : 'hsl(220, 30%, 7%)',
                    '& .MuiButtonBase-root': {
                        border: 'none',
                    },
                    '& .MuiInputBase-root': {
                        border: 'none',
                    },
                },
            },
        }
    }, [mode]) // 将 mode 添加到依赖项数组
    return data
}
