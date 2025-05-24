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
            mrtTheme:{
                baseBackgroundColor: actualMode === 'light'? 'hsl(0, 0%, 100%)' : 'hsl(220, 30%, 3%)',
                border: 'none',
                boxShadow: 'none', 
            },
            muiTablePaperProps: {
                elevation: 0,
            },
            muiTopToolbarProps: {
                sx: {
                    '& .MuiButtonBase-root': {
                        boxShadow: 'none', 
                        border: 'none',
                        backgroundColor: actualMode === 'light'? 'hsl(0, 0%, 100%)' : 'hsl(220, 30%, 3%)',
                    },
                },
            },
        }
    }, [mode]) // 将 mode 添加到依赖项数组
    return data
}
