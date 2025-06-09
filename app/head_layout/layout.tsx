'use client'

import * as React from 'react'
import { StyledEngineProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline'
import AppTheme from '@/components/theme/AppTheme'
import AppAppBar from '@/components/page/AppAppBar'
import Footer from '@/components/page/Footer';

export default function Main({ children }: { children: React.ReactNode }) {
    return (
        <StyledEngineProvider injectFirst>
            <AppTheme>
                <CssBaseline enableColorScheme />
                {/* <AppAppBar /> */}
                <Container
                    maxWidth={false}
                    component="main"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        my: 16,
                        gap: 4,
                        maxWidth: '1680px',
                        mx: 'auto'
                    }}
                >
                    {children}
                </Container>
                <Footer/>
            </AppTheme>
        </StyledEngineProvider>
    )
}