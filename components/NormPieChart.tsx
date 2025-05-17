'use server'
import * as React from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import LinearProgress from '@mui/material/LinearProgress'
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

const colors = ['hsl(221, 60%, 75%)', 'hsl(220, 60%, 60%)', 'hsl(220, 60%, 45%)', 'hsl(220, 60%, 30%)', 'hsl(220, 60%, 15%)']

interface OrProps {
    have: boolean
    children?: React.ReactNode
}

/**
 * 条件性卡片包装器组件
 * 
 * @async
 * @function CardOr
 * @param {Object} props - 组件属性
 * @param {boolean} props.have_card - 是否需要卡片包装
 * @param {React.ReactNode} props.children - 子组件内容
 * 
 * @description
 * 该组件根据 have_card 属性决定是否将子组件包装在 Material-UI Card 中：
 * - 当 have_card 为 true 时，将子组件包装在带有特定样式的 Card 中
 * - 当 have_card 为 false 时，直接渲染子组件
 * 
 * Card 的样式特点：
 * - 使用 outlined 变体
 * - 弹性布局，垂直方向排列
 * - 8px 的元素间距
 * - 自动增长并占满容器高度
 * 
 * @returns {Promise<JSX.Element>} 返回条件渲染的组件
 * 
 * @example
 * ```tsx
 * <CardOr have_card={true}>
 *   <YourContent />
 * </CardOr>
 * ```
 */
async function CardOr({ have, children }: OrProps) {
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

async function BoxOrChart({ have, children }: OrProps) {
    if (have) {
        return (
            <Box sx={{ flex: '0 0 auto', height: '100%', display: 'flex', alignItems: 'center' }}>
                {children}
            </Box>
        )
    }
    return <>{children}</>
}

async function BoxOrData({ have, children }: OrProps) {
    if (have) {
        return (
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                {children}
            </Box>
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

export default async function NormPieChart(props: NormPieChartProps) {
    const temp_max = Math.max(...props.data.map((item) => item.value))
    const temp_sum = props.data.reduce((acc, item) => acc + item.value, 0)
    const chart_length = props.is_horizontal ? Math.max(50 * props.data.length, 260) : 260
    const have_card = typeof props.have_card !== 'undefined' ? props.have_card : true;
    const have_box = typeof props.is_horizontal !== 'undefined' ? props.is_horizontal : false;
    return (
        <CardOr have={have_card}>
            <Typography component="h2" variant="subtitle2">
                {props.title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <BoxOrChart have={have_box}>
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
                            legend: { hidden: true },
                        }}
                        // 用于规定图表中文字恒定为白色，不跟随亮暗模式切换
                        sx={{
                            [`& .${pieArcLabelClasses.root}`]: {
                                fill: 'white',
                                fontSize: 14,
                            },
                        }}
                    />
                </BoxOrChart>
            </Box>
            <BoxOrData have={have_box}>
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
            </BoxOrData>

        </CardOr>
    )
}

// export async function NormPieChartOrthogonal({ title_name, data, have_card = true }: NormPieChartProps) {
//     const temp_max = Math.max(...data.map((item) => item.value))
//     const temp_sum = data.reduce((acc, item) => acc + item.value, 0)
//     const chart_length = Math.max(50 * data.length, 260)
//     return (
//         <CardOr have_card={have_card}>
//             <Typography component="h2" variant="subtitle2">
//                 {title_name}
//             </Typography>
//             <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: 4 }}>
//                 <Box sx={{ flex: '0 0 auto', height: '100%', display: 'flex', alignItems: 'center' }}>
//                     <PieChart
//                         colors={colors}
//                         margin={{
//                             left: 20,
//                             right: 20,
//                             top: 20,
//                             bottom: 20,
//                         }}
//                         series={[
//                             {
//                                 data: data,
//                                 arcLabel: (item) => `${item.value}`,
//                                 arcLabelMinAngle: 20,
//                                 highlightScope: { fade: 'global', highlight: 'item' },
//                                 innerRadius: 40,
//                                 outerRadius: 120,
//                                 paddingAngle: 5,
//                                 cornerRadius: 5,
//                             },
//                         ]}
//                         height={chart_length}
//                         width={chart_length}
//                         slotProps={{
//                             legend: { hidden: true },
//                         }}
//                         sx={{
//                             [`& .${pieArcLabelClasses.root}`]: {
//                                 fill: 'white',
//                                 fontSize: 14,
//                             },
//                         }}
//                     />
//                 </Box>
//                 <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
//                     {data.map((item, index) => (
//                         <Stack key={index} direction="row" sx={{ alignItems: 'center', gap: 2 }}>
//                             <Stack sx={{ gap: 1, flexGrow: 1 }}>
//                                 <Stack
//                                     direction="row"
//                                     sx={{
//                                         justifyContent: 'space-between',
//                                         alignItems: 'center',
//                                         gap: 2,
//                                     }}
//                                 >
//                                     <Typography variant="body2" sx={{ fontWeight: '500' }}>
//                                         {item.label}
//                                     </Typography>
//                                     <Typography variant="body2" sx={{ color: 'text.secondary' }}>
//                                         当前值:{item.value} / 占比:{((item.value / temp_sum) * 100).toFixed(2)}%
//                                     </Typography>
//                                 </Stack>
//                                 <LinearProgress variant="determinate" value={(item.value / temp_max) * 100} />
//                             </Stack>
//                         </Stack>
//                     ))}
//                 </Box>
//             </Box>
//         </CardOr>
//     )
// }