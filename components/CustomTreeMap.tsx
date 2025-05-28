'use client'

import * as React from 'react'
import * as echarts from 'echarts'
import { useColorScheme } from '@mui/material/styles'
import { GetThemeColors } from '@/components/theme/EchartsConfig'

export interface CustomTreeMapDataProps {
    name: string
    value?: number
    children?: CustomTreeMapDataProps[]
}

export interface CustomTreeMapProps {
    data: CustomTreeMapDataProps[]
}


export default function CustomTreeMap(props: CustomTreeMapProps) {
    const getOption = (mode: string) => {
        return {
            color: GetThemeColors(),
            backgroundColor: 'transparent',
            series: [
                {
                    type: 'treemap',
                    visibleMin: 300,
                    label: {
                        show: true,
                        formatter: '{b}'
                    },
                    itemStyle: {
                        borderColor: '#fff'
                    },
                    levels: [
                        {
                            itemStyle: {
                                borderWidth: 0,
                                gapWidth: 5
                            }
                        },
                        {
                            itemStyle: {
                                gapWidth: 1
                            }
                        },
                        {
                            colorSaturation: [0.35, 0.5],
                            itemStyle: {
                                gapWidth: 1,
                                borderColorSaturation: 0.6
                            }
                        }
                    ],
                    data: props.data
                }
            ]
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