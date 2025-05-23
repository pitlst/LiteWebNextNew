'use client'

import * as React from 'react'
import * as echarts from 'echarts'
import { useColorScheme } from '@mui/material/styles'
import { GetThemeColors } from '@/components/theme/EchartsConfig'


export interface CustomNestedPieDataProps {
    name: string
    value?: number
    children?: CustomNestedPieDataProps[]
}

export interface CustomNestedPieProps {
    data: CustomNestedPieDataProps[]
}

export default function CustomNestedPie(props: CustomNestedPieProps) {
    const getOption = (mode: string) => {
        return {
            color: GetThemeColors(),
            backgroundColor: 'transparent',
            series: {
                type: 'sunburst',
                data: props.data,
                radius: [0, '95%'],
                sort: (a: any, b: any) => b.value - a.value,
                emphasis: {
                    focus: 'ancestor',
                },
                levels: [
                    {},
                    {
                        r0: '15%',
                        r: '35%',
                        itemStyle: {
                            borderWidth: 2,
                        },
                        label: {
                            rotate: 'tangential',
                        },
                    },
                    {
                        r0: '35%',
                        r: '55%',
                        label: {
                            align: 'right',
                        },
                    },
                    {
                        r0: '55%',
                        r: '75%',
                        label: {
                            align: 'right',
                        },
                    },
                    {
                        r0: '75%',
                        r: '77%',
                        label: {
                            position: 'outside',
                            padding: 3,
                            silent: false,
                        },
                        itemStyle: {
                            borderWidth: 3,
                        },
                    },
                ],
            },
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
        // 销毁已有的实例
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

    return <div ref={chartRef} style={{ height: '800px', width: '100%' }}></div>
}
