'use client'

import * as React from 'react'
import * as echarts from 'echarts'
import { useTheme } from '@mui/material/styles'
import { themeColors } from '@/components/theme/EchartsConfig'

/**
 * 叶子节点数据接口，用于表示没有子节点的数据项
 * @interface CustomNestedPieLeftDataProps
 * @property {string} name - 数据项名称
 * @property {number} value - 数据项值
 */
interface CustomNestedPieLeftDataProps {
    name: string
    value: number
}

/**
 * 父节点数据接口，用于表示包含子节点的数据项
 * @interface CustomNestedPieRightDataProps
 * @property {string} name - 数据项名称
 * @property {CustomNestedPieDataProps[]} children - 子节点数组
 */
interface CustomNestedPieRightDataProps {
    name: string
    children: CustomNestedPieDataProps[]
}

/**
 * 组合类型，表示数据项可以是叶子节点或父节点
 */
export type CustomNestedPieDataProps = CustomNestedPieLeftDataProps | CustomNestedPieRightDataProps

/**
 * 组件属性接口
 * @interface CustomNestedPieProps
 * @property {CustomNestedPieDataProps[]} data - 嵌套饼图的数据数组
 */
export interface CustomNestedPieProps {
    data: CustomNestedPieDataProps[]
}

/**
 * 自定义嵌套饼图组件
 * @description
 * 该组件使用 ECharts 的 sunburst 图表类型实现多层嵌套的饼图展示。
 * 支持多层数据嵌套，每层都有独立的样式配置。
 * 
 * 特点：
 * 1. 支持深色/浅色主题切换
 * 2. 自动适应容器大小
 * 3. 数据按值大小排序
 * 4. 多层级标签样式配置
 * 
 * @param {CustomNestedPieProps} props - 组件属性
 * @returns {JSX.Element} 返回嵌套饼图组件
 */
export default function CustomNestedPie(props: CustomNestedPieProps) {
    const getOption = (mode: string) => {
        return {
            color: themeColors,
            backgroundColor: 'transparent',
            series: {
                type: 'sunburst',
                data: props.data,
                radius: [0, '95%'],
                sort: (a: any, b: any) => b.value - a.value,
                emphasis: {
                    focus: 'ancestor',
                },

                // 配置每一层的样式
                levels: [
                    {}, // 第一层配置（中心）
                    {
                        r0: '15%',  // 内半径
                        r: '35%',    // 外半径
                        itemStyle: {
                            borderWidth: 2,
                        },
                        label: {
                            rotate: 'tangential',  // 标签切向排布
                            formatter: (params: any) => {
                                return params.name + ':' + params.value
                            },
                        },
                    },
                    // 第二层配置
                    {
                        r0: '35%',
                        r: '55%',
                        label: {
                            align: 'right',  // 标签右对齐
                            formatter: (params: any) => {
                                return params.name + ':' + params.value
                            },
                        },
                    },
                    // 第三层配置
                    {
                        r0: '55%',
                        r: '75%',
                        label: {
                            align: 'right',
                            formatter: (params: any) => {
                                return params.name + ':' + params.value
                            },
                        },
                    },
                    // 最外层配置（装饰环）
                    {
                        r0: '75%',
                        r: '77%',
                        label: {
                            position: 'outside',  // 标签位于外部
                            padding: 3,
                            silent: false,
                            formatter: (params: any) => {
                                return params.name + ':' + params.value
                            },
                        },
                        itemStyle: {
                            borderWidth: 3,
                        },
                    },
                ],
            },
        }
    }

    const theme = useTheme()
    const chartRef = React.useRef<HTMLDivElement | null>(null)

    // 主题变化时重新渲染图表
    React.useEffect(() => {
        const handleThemeChange = (e: CustomEvent<{ mode: string }>) => {
            // 销毁已有的实例
            if (chartRef.current) {
                let myChart = echarts.getInstanceByDom(chartRef.current)
                if (myChart) {
                    myChart.dispose()
                }
            }
            // 重新初始化实例并设置配置
            let myChart = echarts.init(chartRef.current, e.detail.mode)
            const temp_options = getOption(e.detail.mode) as echarts.EChartsOption
            myChart.setOption(temp_options)
        }

        // 初始化图表并监听主题变化
        handleThemeChange(new CustomEvent('themeChange', { detail: { mode: theme.palette.mode } }))
        document.addEventListener('themeChange', handleThemeChange as EventListener)
        
        // 清理事件监听
        return () => {
            document.removeEventListener('themeChange', handleThemeChange as EventListener)
        }
    }, [])

    return <div ref={chartRef} style={{ height: '800px', width: '100%' }}></div>
}
