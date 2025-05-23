'use client'
import * as React from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import LinearProgress from '@mui/material/LinearProgress'
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

const colors = ['hsl(221, 60%, 75%)', 'hsl(220, 60%, 60%)', 'hsl(220, 60%, 45%)', 'hsl(220, 60%, 30%)', 'hsl(220, 60%, 15%)'];

interface OrProps {
    have: boolean
    children?: React.ReactNode
}

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


export interface NormPieChartDataProps {
    id?: number
    label: string
    value: number
}


export interface NormPieChartProps {
    index: number
    title: string
    data: NormPieChartDataProps[]
    have_card?: boolean
    is_horizontal?: boolean
}

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