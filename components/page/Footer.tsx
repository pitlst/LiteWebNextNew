'use client'
/**
 * @file Footer.tsx
 * @description 页面底部组件
 * 
 * 该文件实现了网站的页脚部分，包含版权信息和社交媒体链接。
 * 组件采用响应式设计，在不同屏幕尺寸下自动调整布局。
 */
import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/X';

/**
 * 版权信息组件
 * 
 * @description
 * 显示网站的版权信息，包含：
 * 1. 版权符号
 * 2. 组织名称链接
 * 3. 当前年份（自动更新）
 * 
 * @returns {JSX.Element} 返回包含版权信息的Typography组件
 */
function Copyright() {
    return (
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
            {'Copyright © '}
            <Link color="text.secondary" href="https://10.24.5.13:8090/">
                城轨事业部精益信息化组
            </Link>
            &nbsp;
            {new Date().getFullYear()}
        </Typography>
    );
}

/**
 * 页脚主组件
 * 
 * @description
 * 网站的页脚组件，提供以下功能：
 * 1. 显示版权信息
 * 2. 提供社交媒体链接（GitHub、Twitter、LinkedIn）
 * 
 * 布局特点：
 * - 响应式设计，适配不同屏幕尺寸
 * - 移动端：垂直布局，居中对齐
 * - 平板：居中对齐
 * - 桌面端：左对齐
 * - 顶部包含分隔线
 * - 版权信息和社交媒体图标分列两侧
 * 
 * 样式特点：
 * - 使用次要文本颜色
 * - 图标按钮采用继承颜色
 * - 统一的间距和对齐方式
 * 
 * @returns {JSX.Element} 返回完整的页脚组件
 */
export default function Footer() {
    return (
        <React.Fragment>
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: { xs: 4, sm: 8 },
                    py: { xs: 8, sm: 8 },
                    textAlign: { sm: 'center', md: 'left' },
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        pt: { xs: 4, sm: 8 },
                        width: '100%',
                        borderTop: '1px solid',
                        borderColor: 'divider',
                    }}
                >

                    <Copyright />
                    <Stack
                        direction="row"
                        spacing={1}
                        useFlexGap
                        sx={{ justifyContent: 'left', color: 'text.secondary' }}
                    >
                        <IconButton
                            color="inherit"
                            size="small"
                            href="https://github.com/mui"
                            aria-label="GitHub"
                            sx={{ alignSelf: 'center' }}
                        >
                            <GitHubIcon />
                        </IconButton>
                        <IconButton
                            color="inherit"
                            size="small"
                            href="https://x.com/MaterialUI"
                            aria-label="X"
                            sx={{ alignSelf: 'center' }}
                        >
                            <TwitterIcon />
                        </IconButton>
                        <IconButton
                            color="inherit"
                            size="small"
                            href="https://www.linkedin.com/company/mui/"
                            aria-label="LinkedIn"
                            sx={{ alignSelf: 'center' }}
                        >
                            <LinkedInIcon />
                        </IconButton>
                    </Stack>
                </Box>
            </Container>
        </React.Fragment>
    );
}
