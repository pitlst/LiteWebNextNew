'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation' // 修改这里：使用 next/navigation
import { Box, CircularProgress, Typography, Container } from '@mui/material'
import { styled } from '@mui/material/styles'

const StyledContainer = styled(Container)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    textAlign: 'center',
    gap: theme.spacing(3),
}))

export default function RedirectPage() {
    const router = useRouter()

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push('/main/home')
        }, 1000)

        return () => clearTimeout(timer)
    }, [router])

    return (
        <StyledContainer maxWidth="sm">
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                <CircularProgress size={60} thickness={4} />
                <Box
                    sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                ></Box>
            </Box>
            <Typography variant="h6" color="text.primary">
                该页面不存在，页面跳转中...
            </Typography>
            <Typography variant="body2" color="text.secondary">
                正在为您跳转到看板首页
            </Typography>
        </StyledContainer>
    )
}
