'use client'
import * as React from 'react'
import { useTheme } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Chip from '@mui/material/Chip'
import { LineChart } from '@mui/x-charts/LineChart'

import { GetColorPalette } from '@/components/theme/EchartsConfig'

export interface NormLineChartProps {
    title: string
    descriptions: string
    key_string: string
    x_axis: string[]
    series: {
        id: string
        label: string
        showMark: boolean
        curve: string
        stack: string
        stackOrder: string
        data: number[]
        area: boolean
    }[]
}

function AreaGradient({ color, id }: { color: string; id: string }) {
    return (
        <defs>
            <linearGradient id={id} x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor={color} stopOpacity={0.5} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
        </defs>
    )
}


export default function NormLineChart(data: NormLineChartProps) {
    const theme = useTheme()
    return (
        <Card variant="outlined" sx={{ width: '100%' }}>
            <CardContent>
                <Typography component="h2" variant="subtitle2" gutterBottom>
                    {data.title}
                </Typography>
                <Stack sx={{ justifyContent: 'space-between' }}>
                    <Stack
                        direction="row"
                        sx={{
                            alignContent: { xs: 'center', sm: 'flex-start' },
                            alignItems: 'center',
                            gap: 1,
                        }}
                    >
                        <Typography variant="h4" component="p">
                            {data.key_string}
                        </Typography>
                        <Chip size="small" color="success" label="+35%" />
                    </Stack>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        {data.descriptions}
                    </Typography>
                </Stack>
                <LineChart
                    colors={GetColorPalette()}
                    xAxis={[
                        {
                            scaleType: 'point',
                            data: data.x_axis,
                            tickInterval: (index, i) => (i + 1) % 5 === 0,
                        },
                    ]}
                    series={data.series as any}
                    height={250}
                    margin={{ left: 50, right: 20, top: 20, bottom: 20 }}
                    grid={{ horizontal: true }}
                    sx={{
                        '& .MuiAreaElement-series-organic': {
                            fill: "url('#organic')",
                        },
                        '& .MuiAreaElement-series-referral': {
                            fill: "url('#referral')",
                        },
                        '& .MuiAreaElement-series-direct': {
                            fill: "url('#direct')",
                        },
                    }}
                    slotProps={{
                        legend: { hidden: true } as any,
                    }}
                >
                    <AreaGradient color={theme.palette.primary.dark} id="organic" />
                    <AreaGradient color={theme.palette.primary.main} id="referral" />
                    <AreaGradient color={theme.palette.primary.light} id="direct" />
                </LineChart>
            </CardContent>
        </Card>
    )
}