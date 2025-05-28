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
            tooltip: {},
            series: [
                {
                    type: 'treemap',
                    visibleMin: 300,
                    breadcrumb: false,
                    label: {
                        show: true,
                        formatter: function (params: any) {
                            // 获取当前节点的完整路径
                            let path = [];
                            let node = params.data;

                            // 添加当前节点名称
                            path.push(node.name);

                            // 向上查找父节点并添加到路径中
                            let parent = node.parent;
                            while (parent && parent.name) {
                                path.unshift(parent.name);
                                parent = parent.parent;
                            }

                            // 返回完整路径，用'/'连接
                            return path.join('/');
                        }
                    },
                    itemStyle: {
                        borderColor: 'transparent'
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