'use client'
import * as React from 'react'
import { MRT_Localization_ZH_HANS } from 'material-react-table/locales/zh-Hans'
import { Theme } from '@mui/material/styles'
import { useColorScheme } from '@mui/material/styles'; // 导入 useColorScheme

export default function GetDataTableConfig() {
    const { mode } = useColorScheme(); // 使用 useColorScheme Hook 获取当前主题模式
    console.log(mode); // 输出当前主题模式
    const data = React.useMemo(() => {
        return {
            localization: MRT_Localization_ZH_HANS,
            muiTablePaperProps: {
                elevation: 0, // 设置为0以移除阴影
                sx: (theme: Theme) => ({
                    border: 'none',
                }),
            },
            // 添加以下配置来移除按钮边框
            muiTableHeadCellProps: {
                sx: (theme: Theme) => ({
                    backgroundColor: mode === 'light' ? 'hsl(220, 35%, 97%)' : 'hsl(220, 30%, 7%)',
                    '& .MuiButtonBase-root': {
                        border: 'none',
                    },
                }),
            },
            muiTableBodyRowProps: {
                sx: (theme: Theme) => ({
                    backgroundColor: mode === 'light' ? 'hsl(220, 35%, 97%)': 'hsl(220, 30%, 7%)',
                }),
            },
            muiTopToolbarProps: {
                sx: (theme: Theme) => ({
                    backgroundColor: mode === 'light' ? 'hsl(220, 35%, 97%)' : 'hsl(220, 30%, 7%)',
                    '& .MuiButtonBase-root': {
                        border: 'none',
                    },
                }),
            },
            muiTableBodyCellProps: {
                sx: (theme: Theme) => ({
                    backgroundColor: mode === 'light' ? 'hsl(220, 35%, 97%)' : 'hsl(220, 30%, 7%)',
                    '& .MuiButtonBase-root': {
                        border: 'none',
                    },
                }),
            },
            muiBottomToolbarProps: {
                sx: (theme: Theme) => ({
                    backgroundColor: mode === 'light' ? 'hsl(220, 35%, 97%)' : 'hsl(220, 30%, 7%)',
                    '& .MuiButtonBase-root': {
                        border: 'none',
                    },
                    '& .MuiInputBase-root': {
                        border: 'none',
                    },
                }),
            },
        }
    }, [mode]) // 将 mode 添加到依赖项数组
    return data
}
