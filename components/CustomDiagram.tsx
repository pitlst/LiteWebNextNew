'use client'

import * as React from 'react'
import * as echarts from 'echarts'
import { useColorScheme } from '@mui/material/styles'
import { GetThemeColors } from '@/components/theme/EchartsConfig'

export interface CustomDiagramProps {
    nodes: {
        name: string
    }[]
    links: {
        source: string
        target: string
        value: number
    }[]
}


export default function CustomDiagram(props: CustomDiagramProps) {
    const getOption = (mode: string) => {
        return {
            backgroundColor: 'transparent',
            tooltip: {
                trigger: 'item',
                triggerOn: 'mousemove',
            },
            animation: true,
            animationDuration: 200,
            animationEasing: 'cubicOut',
            animationThreshold: 2000,
            color: GetThemeColors(),
            series: [
                {
                    type: 'sankey',
                    data: props.nodes,
                    links: props.links,
                    orient: 'horizontal',
                    nodeAlign: 'left',
                    layoutIterations: 32,
                    label: {
                        show: true,
                        fontStyle: 'normal',
                        fontWeight: 'border',
                        fontSize: 16,
                        color: mode === 'dark' ? '#ffffff' : '#000000',
                        textBorderColor: 'transparent',
                        textShadowColor: 'transparent',
                        textShadowBlur: 0,
                    },
                    edgeLabel: {
                        show: true,
                        color: mode === 'dark' ? '#909090' : '#404040',
                        fontWeight: 'normal',
                        fontSize: 16,
                    },
                    emphasis: {
                        focus: 'adjacency',
                    },
                    lineStyle: {
                        color: 'gradient',
                        curveness: 0.5,
                    },
                },
            ],
        }
    }

    const { mode } = useColorScheme()
    let actualMode: 'light' | 'dark'
    if (mode === 'system' || typeof mode !== 'string') {
        actualMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    } else {
        actualMode = mode
    }
    const chartRef = React.useRef<HTMLDivElement | null>(null)

    React.useEffect(() => {
        if (chartRef.current) {
            let myChart = echarts.getInstanceByDom(chartRef.current)
            if (myChart) {
                myChart.dispose()
            }
        }
        let myChart = echarts.init(chartRef.current, actualMode)
        const temp_options = getOption(actualMode) as echarts.EChartsOption
        myChart.setOption(temp_options)
        myChart.resize()
    }, [actualMode])
    return <div ref={chartRef} style={{ height: '600px', width: '100%' }}></div>
}
