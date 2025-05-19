'use client'
/**
 * @file client.tsx
 * @description 校线异常处理流程页面的客户端组件
 * @author 城轨事业部精益信息化组
 * 
 * 该文件实现了校线异常处理流程的可视化展示页面，包含以下主要功能：
 * 1. 数据更新时间显示
 * 2. 总体统计数据展示
 * 3. 无异常原因分析
 * 4. 异常原因占比分析
 * 5. 各组室流程及时率统计
 * 
 * 技术特点：
 * - 使用 React 函数式组件和 Hooks
 * - 采用 Material-UI (MUI) 组件库
 * - 实现数据加载状态的骨架屏展示
 * - 支持响应式布局设计
 * 
 * 数据流：
 * - 所有数据通过服务端API异步获取
 * - 使用 React.useState 管理组件状态
 * - 使用 React.useEffect 处理数据获取
 * 
 * 页面布局：
 * - 采用响应式设计，适配不同屏幕尺寸
 * - 移动端：单列布局
 * - 平板：双列布局
 * - 桌面端：最大宽度1700px的居中布局
 */



import * as React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'

import UpdateTime from '@/components/UpdateTime'
import NormPieChart, { NormPieChartProps } from '@/components/NormPieChart'
import NormCard, { NormCardProps } from '@/components/NormCard'
import NormChart, { NormChartProps } from '@/components/NormChart'
import { GetCalibrationLineTotalData, GetPieChartNoErrorData, GetPieChartErrorData, GetCalibrationLineGroupData } from './server'

/**
 * 头部卡片组件
 * 
 * @description
 * 该组件用于显示校线异常处理流程的总体统计数据，包含以下功能：
 * 1. 从服务器获取校线总体数据
 * 2. 在加载过程中显示骨架屏
 * 3. 加载完成后以卡片网格形式展示数据
 * 
 * 技术实现：
 * - 使用 React.useState 管理数据状态
 * - 使用 React.useEffect 处理数据获取
 * - 使用 MUI Grid 系统实现响应式布局
 * - 使用 MUI Skeleton 实现加载状态
 * 
 * @returns {JSX.Element} 返回包含多个统计卡片的Grid组件
 */
function HeadCard() {
    const [CalibrationLineTotalData, setCalibrationLineTotalData] = React.useState<NormCardProps[] | null>(null)
    React.useEffect(() => {
        async function fetchPosts() {
            const data = await GetCalibrationLineTotalData()
            setCalibrationLineTotalData(data)
        }
        fetchPosts()
    }, [])
    if (CalibrationLineTotalData === null) {
        const temp = Array.from({ length: 5 }, (_, i) => i)
        return (
            <Grid container spacing={2} columns={temp.length} sx={{ mb: (theme) => theme.spacing(2) }}>
                {temp.map((_, index) => (
                    <Grid key={index} size={{ xs: 12, sm: 6, lg: 1 }}>
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Skeleton key={i} animation="wave" />
                        ))}
                    </Grid>
                ))}
            </Grid>
        )
    }
    else {
        return (
            <Grid container spacing={2} columns={CalibrationLineTotalData.length} sx={{ mb: (theme) => theme.spacing(2) }}>
                {CalibrationLineTotalData.map((card, index) => (
                    <Grid key={index} size={{ xs: 12, sm: 6, lg: 1 }}>
                        <NormCard {...card} />
                    </Grid>
                ))}
            </Grid>
        )
    }
}

/**
 * 原因分析卡片组件
 * 
 * @description
 * 该组件用于显示无异常情况下的数据分析，包含以下功能：
 * 1. 从服务器获取无异常饼图数据
 * 2. 在加载过程中显示骨架屏
 * 3. 加载完成后以饼图形式展示数据分布
 * 
 * 技术实现：
 * - 使用自定义 NormPieChart 组件展示数据
 * - 支持数据加载状态的优雅降级
 * - 采用网格布局确保响应式展示
 * 
 * @returns {JSX.Element} 返回包含多个饼图的Grid组件
 */
function ReasonCard() {
    const [PieChartNoErrorData, setPieChartNoErrorData] = React.useState<NormPieChartProps[] | null>(null)
    React.useEffect(() => {
        async function fetchPosts() {
            const data = await GetPieChartNoErrorData()
            setPieChartNoErrorData(data)
        }
        fetchPosts()
    }, [])
    if (PieChartNoErrorData === null) {
        const temp = Array.from({ length: 3 }, (_, i) => i)
        return (
            <Grid container spacing={2} columns={temp.length} sx={{ mb: (theme) => theme.spacing(2) }}>
                {temp.map((_, index) => (
                    <Grid key={index} size={{ xs: 12, sm: 6, lg: 1 }}>
                        <Card variant="outlined" sx={{ display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1, height: '100%' }}>
                            <CardContent>
                                {Array.from({ length: 10 }).map((_, i) => (
                                    <Skeleton key={i} animation="wave" />
                                ))}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        )
    } else {
        return (
            <Grid container spacing={2} columns={PieChartNoErrorData.length} sx={{ mb: (theme) => theme.spacing(2) }}>
                {PieChartNoErrorData.map((card, index) => (
                    <Grid key={index} size={{ xs: 12, sm: 6, lg: 1 }}>
                        <NormPieChart {...card} />
                    </Grid>
                ))}
            </Grid>
        )
    }
}

/**
 * 配置卡片组件
 * 
 * @description
 * 该组件用于显示校线异常原因的占比分析，包含以下功能：
 * 1. 从服务器获取异常原因饼图数据
 * 2. 在加载过程中显示骨架屏
 * 3. 加载完成后以水平布局展示主要饼图和次要饼图
 * 4. 使用分隔线分隔不同类型的数据展示
 * 
 * 布局特点：
 * - 主饼图占据较大空间
 * - 次要饼图平均分布在剩余空间
 * - 使用分隔线优化视觉效果
 * 
 * @returns {JSX.Element} 返回包含异常原因分析的Card组件
 */
function ConfigurationCard() {
    const [PieChartErrorData, setPieChartErrorData] = React.useState<NormPieChartProps[] | null>(null)
    React.useEffect(() => {
        async function fetchPosts() {
            const data = await GetPieChartErrorData()
            setPieChartErrorData(data)
        }
        fetchPosts()
    }, [])
    if (PieChartErrorData === null) {
        return (
            <Grid container spacing={2} columns={1} sx={{ mb: (theme) => theme.spacing(2) }}>
                <Card variant="outlined" sx={{ display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1, height: '100%' }}>
                    <CardContent>
                        <Typography color="h3" variant="h5" gutterBottom>
                            本月校线异常原因占比
                        </Typography>
                        <Grid container spacing={2} columns={3} sx={{ mb: (theme) => theme.spacing(2) }}>
                            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                                {Array.from({ length: 10 }).map((_, i) => (
                                    <Skeleton key={i} animation="wave" />
                                ))}
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                                <Divider />
                            </Grid>
                            {Array.from({ length: 3 }).map((_, index) => (
                                <Grid key={index} size={{ xs: 12, sm: 6, lg: 1 }}>
                                    {Array.from({ length: 10 }).map((_, i) => (
                                        <Skeleton key={i} animation="wave" />
                                    ))}
                                </Grid>
                            ))}
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        )
    } else {
        return (
            <Grid container spacing={2} columns={1} sx={{ mb: (theme) => theme.spacing(2) }}>
                <Card variant="outlined" sx={{ display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1, height: '100%' }}>
                    <CardContent>
                        <Typography color="h3" variant="h5" gutterBottom>
                            本月校线异常原因占比
                        </Typography>
                        <Grid container spacing={2} columns={3} sx={{ mb: (theme) => theme.spacing(2) }}>
                            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                                <NormPieChart {...PieChartErrorData[0]} />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                                <Divider />
                            </Grid>
                            {PieChartErrorData.slice(1).map((card, index) => (
                                <Grid key={index} size={{ xs: 12, sm: 6, lg: 1 }}>
                                    <NormPieChart {...card} />
                                </Grid>
                            ))}
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        )
    }
}

/**
 * 组别数据卡片组件
 * 
 * @description
 * 该组件用于显示各组室的流程及时转化率，包含以下功能：
 * 1. 从服务器获取组别统计数据
 * 2. 在加载过程中显示骨架屏
 * 3. 加载完成后以柱状图形式展示各组数据
 * 4. 使用分隔线分隔不同组别的数据
 * 
 * 数据展示：
 * - 每个组别独立展示
 * - 包含及时率趋势分析
 * - 支持数据对比和排序
 * 
 * @returns {JSX.Element} 返回包含组别统计的Card组件
 */
function GroupCard() {
    const [CalibrationLineGroupData, setCalibrationLineGroupData] = React.useState<NormChartProps[] | null>(null)
    React.useEffect(() => {
        async function fetchPosts() {
            const data = await GetCalibrationLineGroupData()
            setCalibrationLineGroupData(data)
        }
        fetchPosts()
    }, [])
    if (CalibrationLineGroupData === null) {
        return (
            <Grid size={{ xs: 12, sm: 6 }}>
                <Card variant="outlined" sx={{ width: '100%' }}>
                    <CardContent>
                        <Typography component="h2" variant="subtitle2" gutterBottom>
                            各组室流程及时转化率
                        </Typography>
                        {Array.from({ length: 5 }).map((_, index) => (
                            <div key={index}>
                                {index !== 0 ? (
                                    <>
                                        <Divider sx={{ my: 2 }} />
                                        <Stack>
                                            {Array.from({ length: 10 }).map((_, i) => (
                                                <Skeleton key={i} animation="wave" />
                                            ))}
                                        </Stack>
                                    </>
                                ) : (
                                    <Stack>
                                        {Array.from({ length: 10 }).map((_, i) => (
                                            <Skeleton key={i} animation="wave" />
                                        ))}
                                    </Stack>
                                )}
                            </div>

                        ))}
                    </CardContent>
                </Card>
            </Grid>
        )
    } else {
        return (
            <Grid size={{ xs: 12, sm: 6 }}>
            <Card variant="outlined" sx={{ width: '100%' }}>
                <CardContent>
                    <Typography component="h2" variant="subtitle2" gutterBottom>
                        各组室流程及时转化率
                    </Typography>
                    {CalibrationLineGroupData.map((card, index) => (
                        <div key={index}>
                            {index !== 0 ? (
                                <>
                                    <Divider sx={{ my: 2 }} />
                                    <NormChart {...card} />
                                </>
                            ) : (
                                <NormChart {...card} />
                            )}
                        </div>
                    ))}
                </CardContent>
            </Card>
        </Grid>
        )
    }
}

/**
 * 校线异常处理流程页面主组件
 * 
 * @description
 * 该组件是整个页面的根组件，负责组织和布局所有子组件。
 * 
 * 组件结构：
 * 1. 页面标题 - 展示当前页面主题
 * 2. 更新时间信息 (UpdateTime) - 显示数据最后更新时间
 * 3. 总体统计卡片 (HeadCard) - 展示关键指标
 * 4. 无异常原因分析 (ReasonCard) - 分析正常流程数据
 * 5. 异常原因占比 (ConfigurationCard) - 分析异常原因
 * 6. 组别数据统计 (GroupCard) - 展示各组室数据
 * 
 * 布局设计：
 * - 移动端：单列布局，垂直堆叠
 * - 平板：双列布局，合理分配空间
 * - 桌面端：最大宽度1700px，居中对齐
 * 
 * 性能优化：
 * - 组件级别的代码分割
 * - 独立的数据获取逻辑
 * - 骨架屏优化加载体验
 * 
 * @returns {JSX.Element} 返回完整的校线异常处理流程页面
 */
export default function CalibrationLine() {
    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            <Typography component="h2" variant="h4" sx={{ mb: 2 }}>
                校线异常处理流程情况
            </Typography>
            <UpdateTime name={'calibratio_line'}/>
            <HeadCard />
            <ReasonCard />
            <ConfigurationCard />
            <GroupCard/>
        </Box>
    )
}
