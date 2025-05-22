'use client'

/**
 * 自定义桑基图组件
 * 
 * @file CustomDiagram.tsx
 * @description 
 * 该组件使用 ECharts 实现桑基图的展示，具有以下特点：
 * 1. 支持暗色/亮色主题自动切换
 * 2. 响应式布局，自适应容器大小
 * 3. 支持节点间关系的可视化展示
 * 4. 提供流畅的动画效果和交互体验
 * 
 * 技术实现：
 * - 使用 ECharts 作为图表渲染引擎
 * - 使用 React Hooks 管理组件状态和生命周期
 * - 支持主题切换的事件监听机制
 * - 自动处理图表实例的创建和销毁
 */

import * as React from 'react'
import * as echarts from 'echarts'
import { useTheme } from '@mui/material/styles'
import { themeColors } from '@/components/theme/EchartsConfig'

/**
 * 桑基图属性接口定义
 * 
 * @interface CustomDiagramProps
 * @property {Object[]} nodes - 节点数组，定义图表中的各个节点
 * @property {string} nodes[].name - 节点名称
 * @property {Object[]} links - 连接数组，定义节点之间的关系
 * @property {string} links[].source - 源节点名称
 * @property {string} links[].target - 目标节点名称
 * @property {number} links[].value - 连接的权重值
 */
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

/**
 * 自定义桑基图组件
 * 
 * @component
 * @param {CustomDiagramProps} props - 组件属性
 * @returns {JSX.Element} 返回桑基图容器元素
 * 
 * @example
 * ```tsx
 * const nodes = [{ name: '节点1' }, { name: '节点2' }]
 * const links = [{ source: '节点1', target: '节点2', value: 100 }]
 * <CustomDiagram nodes={nodes} links={links} />
 * ```
 */
export default function CustomDiagram(props: CustomDiagramProps) {
    /**
     * 获取图表配置选项
     * 
     * @param {string} mode - 主题模式（'dark'|'light'）
     * @returns {echarts.EChartsOption} ECharts 配置选项
     */
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

    /**
     * 主题变化处理效果
     * 
     * 监听主题变化事件，在主题切换时：
     * 1. 销毁现有图表实例
     * 2. 使用新主题重新初始化图表
     * 3. 应用新的配置选项
     */
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
