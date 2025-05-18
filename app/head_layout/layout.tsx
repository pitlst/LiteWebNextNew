import * as React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import AppTheme from '@/components/theme/AppTheme'

export default function Main({ children }: { children: React.ReactNode }) {
    return (
        <AppTheme>
            <CssBaseline enableColorScheme />      
            {children}  
        </AppTheme>
    )
}