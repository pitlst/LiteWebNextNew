'use client'

import * as React from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import LinearProgress from '@mui/material/LinearProgress'
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

/**
 * 标准化饼图组件
 * 
 * @description
 * 该组件用于展示饼图数据，支持以下功能：
 * - 可选的卡片包装
 * - 水平或垂直布局
 * - 自动计算数据占比和最大值
 * - 包含饼图和进度条双重展示
 */

// 饼图颜色配置，使用 HSL 色彩空间以保持一致的色调
const colors = ['hsl(221, 60%, 75%)', 'hsl(220, 60%, 60%)', 'hsl(220, 60%, 45%)', 'hsl(220, 60%, 30%)', 'hsl(220, 60%, 15%)'];

/**
 * 条件渲染包装器接口
 */
interface OrProps {
    have: boolean                  // 是否启用包装器
    children?: React.ReactNode     // 子组件
}

/**
 * 条件性卡片包装器组件
 * 
 * @param {OrProps} props - 组件属性
 * @param {boolean} props.have - 是否启用卡片包装
 * @param {React.ReactNode} props.children - 子组件
 * 
 * @returns {JSX.Element} 根据条件返回带卡片包装或原始内容
 */
function CardOr({ have, children }: OrProps) {
    if (have) {
        return (
            <Card variant="outlined" sx={{ display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1, height: '100%' }}>
                <CardContent>
                    {children}
                </CardContent>
            </Card>
        )
    }
    return <>{children}</>
}

/**
 * 饼图数据项接口
 */
export interface NormPieChartDataProps {
    id?: number           // 可选的数据项 ID
    label: string         // 数据项标签
    value: number         // 数据项值
}

/**
 * 饼图组件属性接口
 */
export interface NormPieChartProps {
    index: number                     // 图表索引
    title: string                     // 图表标题
    data: NormPieChartDataProps[]     // 图表数据
    have_card?: boolean               // 是否使用卡片包装，默认为 true
    is_horizontal?: boolean           // 是否使用水平布局，默认为 false
}

/**
 * 标准化饼图组件
 * 
 * @param {NormPieChartProps} props - 组件属性
 * 
 * @description
 * 该组件将数据以饼图形式展示，并提供以下功能：
 * 1. 自动计算数据最大值和总和
 * 2. 根据数据量自动调整图表尺寸
 * 3. 支持水平和垂直两种布局方式
 * 4. 为每个数据项提供进度条展示
 * 5. 自动计算并显示数据占比
 * 
 * 样式特点：
 * - 饼图中的文字始终保持白色
 * - 图表支持悬停高亮效果
 * - 进度条根据最大值自动计算比例
 * 
 * @returns {JSX.Element} 返回完整的饼图组件
 */
export default function NormPieChart(props: NormPieChartProps) {
    const temp_max = Math.max(...props.data.map((item) => item.value))
    const temp_sum = props.data.reduce((acc, item) => acc + item.value, 0)
    const chart_length = props.is_horizontal ? Math.max(50 * props.data.length, 260) : 260
    const have_card = typeof props.have_card !== 'undefined' ? props.have_card : true;
    const have_box = props.is_horizontal ? props.is_horizontal : false;
    if (have_box) {
        return (
            <CardOr have={have_card}>
                <Typography component="h2" variant="subtitle2">
                    {props.title}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: 4 }}>
                    <Box sx={{ flex: '0 0 auto', height: '100%', display: 'flex', alignItems: 'center' }}>
                        <PieChart
                            colors={colors}
                            margin={{
                                left: 20,
                                right: 20,
                                top: 80,
                                bottom: 80,
                            }}
                            series={[
                                {
                                    data: props.data,
                                    arcLabel: (item) => `${item.value}`,
                                    arcLabelMinAngle: 20,
                                    highlightScope: { fade: 'global', highlight: 'item' },
                                    innerRadius: 25,
                                    outerRadius: 100,
                                    paddingAngle: 5,
                                    cornerRadius: 5,
                                },
                            ]}
                            height={chart_length}
                            width={chart_length}
                            // 这里没有问题，但是语法提示抽风，用any打法关闭一下
                            slotProps={{
                                legend: { hidden: true } as any
                            }}
                            sx={{
                                [`& .${pieArcLabelClasses.root}`]: {
                                    fill: 'white',
                                    fontSize: 14,
                                },
                            }}
                        />
                    </Box>
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {props.data.map((item, index) => (
                            <Stack key={index} direction="row" sx={{ alignItems: 'center', gap: 2, pb: 2 }}>
                                <Stack sx={{ gap: 1, flexGrow: 1 }}>
                                    <Stack
                                        direction="row"
                                        sx={{
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            gap: 2,
                                        }}
                                    >
                                        <Typography variant="body2" sx={{ fontWeight: '500' }}>
                                            {item.label}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                            当前值:{item.value} / 占比:{((item.value / temp_sum) * 100).toFixed(2)}%
                                        </Typography>
                                    </Stack>
                                    <LinearProgress variant="determinate" value={(item.value / temp_max) * 100} />
                                </Stack>
                            </Stack>
                        ))}
                    </Box>
                </Box>
            </CardOr>
        )
    } else {
        return (
            <CardOr have={have_card}>
                <Typography component="h2" variant="subtitle2">
                    {props.title}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <PieChart
                        colors={colors}
                        margin={{
                            left: 20,
                            right: 20,
                            top: 80,
                            bottom: 80,
                        }}
                        series={[
                            {
                                data: props.data,
                                arcLabel: (item) => `${item.value}`,
                                arcLabelMinAngle: 20,
                                highlightScope: { fade: 'global', highlight: 'item' },
                                innerRadius: 25,
                                outerRadius: 100,
                                paddingAngle: 5,
                                cornerRadius: 5,
                            },
                        ]}
                        height={chart_length}
                        width={chart_length}
                        slotProps={{
                            legend: { hidden: true } as any
                        }}
                        sx={{
                            [`& .${pieArcLabelClasses.root}`]: {
                                fill: 'white',
                                fontSize: 14,
                            },
                        }}
                    />
                </Box>
                {props.data.map((item, index) => (
                    <Stack key={index} direction="row" sx={{ alignItems: 'center', gap: 2, pb: 2 }}>
                        <Stack sx={{ gap: 1, flexGrow: 1 }}>
                            <Stack
                                direction="row"
                                sx={{
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    gap: 2,
                                }}
                            >
                                <Typography variant="body2" sx={{ fontWeight: '500' }}>
                                    {item.label}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    当前值:{item.value} / 占比:{((item.value / temp_sum) * 100).toFixed(2)}%
                                </Typography>
                            </Stack>
                            <LinearProgress variant="determinate" value={(item.value / temp_max) * 100} />
                        </Stack>
                    </Stack>
                ))}
            </CardOr>
        )
    }

}