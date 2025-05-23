'use client'

import { useTheme } from '@mui/material/styles'

export function GetThemeColors() {
    return [
        'hsl(221, 60%, 80%)',
        'hsl(221, 60%, 75%)',
        'hsl(221, 60%, 70%)',
        'hsl(221, 60%, 65%)',
        'hsl(221, 60%, 60%)',
        'hsl(220, 60%, 55%)',
        'hsl(220, 60%, 50%)',
        'hsl(220, 60%, 45%)',
        'hsl(220, 60%, 40%)',
        'hsl(220, 60%, 35%)',
        'hsl(220, 60%, 30%)',
        'hsl(220, 60%, 25%)',
        'hsl(220, 60%, 20%)',

        'hsl(221, 100%, 80%)',
        'hsl(221, 100%, 75%)',
        'hsl(221, 100%, 70%)',
        'hsl(221, 100%, 65%)',
        'hsl(221, 100%, 60%)',
        'hsl(220, 100%, 55%)',
        'hsl(220, 100%, 50%)',
        'hsl(220, 100%, 45%)',
        'hsl(220, 100%, 40%)',
        'hsl(220, 100%, 35%)',
        'hsl(220, 100%, 30%)',
        'hsl(220, 100%, 25%)',
        'hsl(220, 100%, 20%)',

        'hsl(240, 60%, 80%)',
        'hsl(240, 60%, 75%)',
        'hsl(240, 60%, 70%)',
        'hsl(240, 60%, 65%)',
        'hsl(240, 60%, 60%)',
        'hsl(240, 60%, 55%)',
        'hsl(240, 60%, 50%)',
        'hsl(240, 60%, 45%)',
        'hsl(240, 60%, 40%)',
        'hsl(240, 60%, 35%)',
        'hsl(240, 60%, 30%)',
        'hsl(240, 60%, 25%)',
        'hsl(240, 60%, 20%)',
    ]
}

export function GetColorPalette() {
    const theme = useTheme()
    return [theme.palette.primary.light, theme.palette.primary.main, theme.palette.primary.dark]
}
