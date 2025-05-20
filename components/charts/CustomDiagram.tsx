'use client'

import * as React from 'react'
import * as echarts from 'echarts'
import { useTheme } from '@mui/material/styles'
import { themeColors } from '@/components/theme/EchartsConfig'

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
            // 添加动画配置
            animation: true,
            animationDuration: 200,
            animationEasing: 'cubicOut',
            animationThreshold: 2000,
            // 设置全局颜色
            color: themeColors,
            series: [
                {
                    type: 'sankey',
                    data: props.nodes,
                    links: props.links,
                    orient: 'horizontal', // 设置水平方向
                    nodeAlign: 'left', // 改为左对齐以便控制位置
                    layoutIterations: 32, // 增加布局迭代次数，使布局更加均匀
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
    const theme = useTheme()
    const chartRef = React.useRef<HTMLDivElement | null>(null)
    React.useEffect(() => {
        const handleThemeChange = (e: CustomEvent<{ mode: string }>) => {
            // 获取已有的实例
            if (chartRef.current) {
                let myChart = echarts.getInstanceByDom(chartRef.current)
                if (myChart) {
                    myChart.dispose()
                }
            }
            // 重新初始化实例
            let myChart = echarts.init(chartRef.current, e.detail.mode)
            const temp_options = getOption(e.detail.mode) as echarts.EChartsOption
            myChart.setOption(temp_options)
        }

        handleThemeChange(new CustomEvent('themeChange', { detail: { mode: theme.palette.mode } }))
        document.addEventListener('themeChange', handleThemeChange as EventListener)
        return () => {
            document.removeEventListener('themeChange', handleThemeChange as EventListener)
        }
    }, [])
    return <div ref={chartRef} style={{ height: '600px', width: '100%' }}></div>
}
