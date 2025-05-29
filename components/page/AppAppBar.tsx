'use client'
import * as React from 'react'
import Link from 'next/link'
import { alpha, styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import Drawer from '@mui/material/Drawer'
import Typography from '@mui/material/Typography'
import MenuIcon from '@mui/icons-material/Menu'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import ColorModeIconDropdown from '.././theme/ColorModeIconDropdown'
import MetroIcon from '../MetroIcon'

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
    borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
    backdropFilter: 'blur(24px)',
    border: '1px solid',
    borderColor: (theme.vars || theme).palette.divider,
    backgroundColor: theme.vars ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)` : alpha(theme.palette.background.default, 0.4),
    boxShadow: (theme.vars || theme).shadows[1],
    padding: '8px 12px',
}))

export default function AppAppBar() {
    const [open, setOpen] = React.useState(false)

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen)
    }

    return (
        <AppBar
            position="fixed"
            enableColorOnDark
            sx={{
                boxShadow: 0,
                bgcolor: 'transparent',
                backgroundImage: 'none',
                mt: 'calc(var(--template-frame-height, 0px) + 28px)',
            }}
        >
            <Container maxWidth="lg">
                <StyledToolbar variant="dense" disableGutters>
                    <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
                        <MetroIcon />
                        <Typography variant="body2" noWrap component="div" sx={{ ml: 2, fontWeight: 'medium', color: 'text.primary' }}>
                            城轨事业部数据中台
                        </Typography>
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <Link href="/head_layout/head_page/home" passHref style={{ textDecoration: 'none' }}>
                                <Button variant="text" color="primary" size="small">
                                    首页
                                </Button>
                            </Link>
                            <Link href="/head_layout/head_page/article" passHref style={{ textDecoration: 'none' }}>
                                <Button variant="text" color="primary" size="small">
                                    文章
                                </Button>
                            </Link>
                            <Link href="/head_layout/head_page/dashboard" passHref style={{ textDecoration: 'none' }}>
                                <Button variant="text" color="primary" size="small">
                                    看板
                                </Button>
                            </Link>
                            <Link href="/head_layout/head_page/program" passHref style={{ textDecoration: 'none' }}>
                                <Button variant="text" color="primary" size="small">
                                    小程序
                                </Button>
                            </Link>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            gap: 1,
                            alignItems: 'center',
                        }}
                    >
                        <ColorModeIconDropdown />
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
                        <ColorModeIconDropdown size="medium" />
                        <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
                            <MenuIcon />
                        </IconButton>
                        <Drawer
                            anchor="top"
                            open={open}
                            onClose={toggleDrawer(false)}
                            PaperProps={{
                                sx: {
                                    top: 'var(--template-frame-height, 0px)',
                                },
                            }}
                        >
                            <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                    }}
                                >
                                    <IconButton onClick={toggleDrawer(false)}>
                                        <CloseRoundedIcon />
                                    </IconButton>
                                </Box>
                                <MenuItem>首页</MenuItem>
                                <MenuItem>文章</MenuItem>
                                <MenuItem>看板</MenuItem>
                                <MenuItem>小程序</MenuItem>
                            </Box>
                        </Drawer>
                    </Box>
                </StyledToolbar>
            </Container>
        </AppBar>
    )
}
