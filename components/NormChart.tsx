'use client'
import * as React from 'react'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import { useTheme } from '@mui/material/styles'
import { BarChart } from '@mui/x-charts/BarChart'

export interface NormChartGroupProps {
    name: string,
    ontime: number,
    total: number,
    complete: number
}

export interface NormChartProps {
    index: number,
    title: string,
    trend: boolean,
    total: number,
    complete: number,
    group: NormChartGroupProps[],

}

export default function NormChart(props: NormChartProps) {
    const theme = useTheme()
    const colorPalette = [(theme.vars || theme).palette.primary.dark, (theme.vars || theme).palette.primary.light]
    const labelColors = props.trend? 'success' : 'error'
    const labelTexts = props.trend? '及时率良好' : '及时率较低'
    const title_data = props.group.map((item) => item.name)
    const complete_data = props.group.map((item) => item.complete)
    return (
        <Stack>
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
                        {props.title}
                    </Typography>
                    <Chip size="small" color={labelColors} label={labelTexts} />
                </Stack>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    全部流程数 {props.total} / 及时数 {props.complete} / 超时数 {props.total - props.complete}
                </Typography>
            </Stack>
            <BarChart
                borderRadius={8}
                colors={colorPalette}
                xAxis={
                    [
                        {
                            scaleType: 'band',
                            categoryGapRatio: 0.5,
                            data: title_data,
                        },
                    ] as any
                }
                series={[
                    {
                        id: 'complete',
                        label: '及时率',
                        data: complete_data,
                        stack: 'A',
                    },
                ]}
                height={260}
                margin={{ left: 50, right: 0, top: 20, bottom: 30 }}
                grid={{ horizontal: true }}
                slotProps={{
                    legend: { hidden: true } as any
                }}
                barLabel={(item, context) => {
                    if (item.value === 0) {
                        return ''
                    }
                    return `${item.value?.toString()}%`
                }}
                sx={{
                    '& .MuiBarLabel-root': { 
                        fill: '#ffffff'
                    }
                }}
            >
            </BarChart>
        </Stack>
    )
}
