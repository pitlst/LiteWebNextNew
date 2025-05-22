'use client'
/**
 * @file client.tsx
 * @description 校线异常处理流程页面的客户端组件
 * @author 城轨事业部精益信息化组
 *
 * 该文件实现了校线异常处理流程的可视化展示页面，包含以下主要功能：
 * 1. 数据更新时间显示
 * 2. 总体统计数据展示
 * 3. 无异常原因分析
 * 4. 异常原因占比分析
 * 5. 各组室流程及时率统计
 *
 * 技术特点：
 * - 使用 React 函数式组件和 Hooks
 * - 采用 Material-UI (MUI) 组件库
 * - 实现数据加载状态的骨架屏展示
 * - 支持响应式布局设计
 *
 * 数据流：
 * - 所有数据通过服务端API异步获取
 * - 使用 React.useState 管理组件状态
 * - 使用 React.useEffect 处理数据获取
 *
 * 页面布局：
 * - 采用响应式设计，适配不同屏幕尺寸
 * - 移动端：单列布局
 * - 平板：双列布局
 * - 桌面端：最大宽度1700px的居中布局
 */

import * as React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
import { MaterialReactTable, useMaterialReactTable, type MRT_ColumnDef } from 'material-react-table';

import UpdateTime from '@/components/UpdateTime'
import NormPieChart, { NormPieChartProps } from '@/components/NormPieChart'
import NormCard, { NormCardProps } from '@/components/NormCard'
import NormChart, { NormChartProps } from '@/components/NormChart'
import {
    GetCalibrationLineTotalData,
    GetPieChartNoErrorData,
    GetCalibrationLineGroupData,
    GetCustomNestedPieData,
} from './server'
import CustomNestedPie, { CustomNestedPieDataProps, CustomNestedPieProps } from '@/components/charts/CustomNestedPie'
import GetDataTableConfig from '@/components/theme/DataTableConfig'

/**
 * 头部卡片组件
 *
 * @description
 * 该组件用于显示校线异常处理流程的总体统计数据，包含以下功能：
 * 1. 从服务器获取校线总体数据
 * 2. 在加载过程中显示骨架屏
 * 3. 加载完成后以卡片网格形式展示数据
 *
 * 技术实现：
 * - 使用 React.useState 管理数据状态
 * - 使用 React.useEffect 处理数据获取
 * - 使用 MUI Grid 系统实现响应式布局
 * - 使用 MUI Skeleton 实现加载状态
 *
 * @returns {JSX.Element} 返回包含多个统计卡片的Grid组件
 */
function HeadCard() {
    const [CalibrationLineTotalData, setCalibrationLineTotalData] = React.useState<NormCardProps[] | null>(null)
    React.useEffect(() => {
        async function fetchPosts() {
            const data = await GetCalibrationLineTotalData()
            setCalibrationLineTotalData(data)
        }
        fetchPosts()
    }, [])
    if (CalibrationLineTotalData === null) {
        const temp = Array.from({ length: 5 }, (_, i) => i)
        return (
            <Grid container spacing={2} columns={temp.length} sx={{ mb: (theme) => theme.spacing(2) }}>
                {temp.map((_, index) => (
                    <Grid key={`HeadCard_${index}`} size={{ xs: 12, sm: 6, lg: 1 }}>
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Skeleton key={`HeadCardSkeleton_${i}`} animation="wave" />
                        ))}
                    </Grid>
                ))}
            </Grid>
        )
    } else {
        return (
            <Grid container spacing={2} columns={CalibrationLineTotalData.length} sx={{ mb: (theme) => theme.spacing(2) }}>
                {CalibrationLineTotalData.map((card, index) => (
                    <Grid key={`HeadCardGrid_${index}`} size={{ xs: 12, sm: 6, lg: 1 }}>
                        <NormCard {...card} />
                    </Grid>
                ))}
            </Grid>
        )
    }
}

/**
 * 原因分析卡片组件
 *
 * @description
 * 该组件用于显示无异常情况下的数据分析，包含以下功能：
 * 1. 从服务器获取无异常饼图数据
 * 2. 在加载过程中显示骨架屏
 * 3. 加载完成后以饼图形式展示数据分布
 *
 * 技术实现：
 * - 使用自定义 NormPieChart 组件展示数据
 * - 支持数据加载状态的优雅降级
 * - 采用网格布局确保响应式展示
 *
 * @returns {JSX.Element} 返回包含多个饼图的Grid组件
 */
function ReasonCard() {
    const [PieChartNoErrorData, setPieChartNoErrorData] = React.useState<NormPieChartProps[] | null>(null)
    React.useEffect(() => {
        async function fetchPosts() {
            const data = await GetPieChartNoErrorData()
            setPieChartNoErrorData(data)
        }
        fetchPosts()
    }, [])
    if (PieChartNoErrorData === null) {
        const temp = Array.from({ length: 3 }, (_, i) => i)
        return (
            <Grid container spacing={2} columns={temp.length} sx={{ mb: (theme) => theme.spacing(2) }}>
                {temp.map((_, index) => (
                    <Grid key={`ReasonCardTemp_${index}`} size={{ xs: 12, sm: 6, lg: 1 }}>
                        <Card variant="outlined" sx={{ display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1, height: '100%' }}>
                            <CardContent>
                                {Array.from({ length: 10 }).map((_, i) => (
                                    <Skeleton key={`ReasonCardSkeleton_${index}_${i}`} animation="wave" />
                                ))}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        )
    } else {
        return (
            <Grid container spacing={2} columns={PieChartNoErrorData.length} sx={{ mb: (theme) => theme.spacing(2) }}>
                {PieChartNoErrorData.map((card, index) => {
                    return (
                        <Grid key={`ReasonCard_${index}`} size={{ xs: 12, sm: 6, lg: 1 }}>
                            <NormPieChart {...card} />
                        </Grid>
                    )
                }
                )}
            </Grid>
        )
    }
}

/**
 * 组别数据卡片组件
 *
 * @description
 * 该组件用于显示各组室的流程及时转化率，包含以下功能：
 * 1. 从服务器获取组别统计数据
 * 2. 在加载过程中显示骨架屏
 * 3. 加载完成后以柱状图形式展示各组数据
 * 4. 使用分隔线分隔不同组别的数据
 *
 * 数据展示：
 * - 每个组别独立展示
 * - 包含及时率趋势分析
 * - 支持数据对比和排序
 *
 * @returns {JSX.Element} 返回包含组别统计的Card组件
 */
function GroupCard() {
    const [CalibrationLineGroupData, setCalibrationLineGroupData] = React.useState<NormChartProps[] | null>(null)
    React.useEffect(() => {
        async function fetchPosts() {
            const data = await GetCalibrationLineGroupData()
            setCalibrationLineGroupData(data)
        }
        fetchPosts()
    }, [])
    if (CalibrationLineGroupData === null) {
        return (
            <Grid container spacing={2} columns={1} sx={{ mb: (theme) => theme.spacing(2) }}>
                <Card variant="outlined" sx={{ width: '100%' }}>
                    <CardContent>
                        <Typography component="h2" variant="subtitle2" gutterBottom>
                            各组室流程及时转化率
                        </Typography>
                        {Array.from({ length: 5 }).map((_, index) => (
                            <div key={`CalibrationLineGroupDataNull_${index}`}>
                                {index !== 0 ? (
                                    <>
                                        <Divider sx={{ my: 2 }} />
                                        <Stack>
                                            {Array.from({ length: 10 }).map((_, i) => (
                                                <Skeleton key={`CalibrationLineGroupDataSkeleton_${index}_${i}`} animation="wave" />
                                            ))}
                                        </Stack>
                                    </>
                                ) : (
                                    <Stack>
                                        {Array.from({ length: 10 }).map((_, i) => (
                                            <Skeleton key={`CalibrationLineGroupDataSkeleton_${index}_${i}`} animation="wave" />
                                        ))}
                                    </Stack>
                                )}
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </Grid>
        )
    } else {
        return (
            <Grid container spacing={2} columns={1} sx={{ mb: (theme) => theme.spacing(2) }}>
                <Card variant="outlined" sx={{ width: '100%' }}>
                    <CardContent>
                        <Typography component="h2" variant="subtitle2" gutterBottom>
                            各组室流程及时转化率
                        </Typography>
                        {CalibrationLineGroupData.map((card, index) => (
                            <div key={`CalibrationLineGroupData_${index}`}>
                                {index !== 0 ? (
                                    <>
                                        <Divider sx={{ my: 2 }} />
                                        <NormChart {...card} />
                                    </>
                                ) : (
                                    <NormChart {...card} />
                                )}
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </Grid>
        )
    }
}

/**
 * 数据表格组件
 * 
 * @description
 * 该组件用于表格形式展示异常原因数据，实现以下功能：
 * 1. 展示异常原因的层级结构和统计数据
 * 2. 支持数据的展开/折叠操作
 * 3. 自动计算各层级节点的统计值
 * 4. 提供分页和过滤功能
 * 
 * 技术实现：
 * - 使用 Material-React-Table 实现高级表格功能
 * - 使用 React.useMemo 优化性能，避免不必要的重复计算
 * - 支持树形数据结构的展示和操作
 * - 实现数据的本地计算和缓存优化
 * 
 * 数据处理：
 * - 递归计算所有节点的 value 值
 * - 对于有 children 的节点，value 为所有子节点 value 的总和
 * - 对于没有 value 的叶子节点，设置默认值为 0
 * - 使用深拷贝避免修改原始数据
 * 
 * 表格配置：
 * - 默认显示 100 行数据
 * - 支持行展开/折叠功能
 * - 提供中文本地化支持
 * - 自定义样式，移除边框和阴影
 * 
 * @param {CustomNestedPieProps} props - 包含异常原因数据的属性对象
 * @returns {JSX.Element} 返回可交互的数据表格组件
 */
function DataTable(props: CustomNestedPieProps) {
    const columns = React.useMemo<MRT_ColumnDef<CustomNestedPieDataProps>[]>(() => [
        {
            accessorKey: 'name',
            header: '异常原因名称',
        },
        {
            accessorKey: 'value',
            header: '异常个数',
        },
    ],
        [],
    );

    const data = React.useMemo<CustomNestedPieDataProps[]>(() => {
        // 递归计算所有节点的value
        const calculateNodeValue = (node: CustomNestedPieDataProps): number => {
            // 如果节点已经有value，直接返回
            if (node.value !== undefined && node.value !== null) {
                return node.value;
            }
            // 如果节点有children，计算所有子节点value的和
            if (node.children?.length) {  // 使用可选链操作符简化判断
                node.value = node.children.reduce(
                    (sum: number, child: any) => sum + calculateNodeValue(child),
                    0
                );
                return node.value;  // 直接返回计算后的值
            }
            // 如果既没有value也没有children，设置默认值0
            return (node.value = 0);  // 使用赋值表达式简化代码
        }
        // 创建深拷贝，避免修改原始数据
        return props.data.map(node => {
            const newNode = { ...node };
            if (!newNode.value) {
                newNode.value = calculateNodeValue(node);
            }
            return newNode;
        });
    }, [props.data])
    
    const table = useMaterialReactTable({
        columns,
        data,
        enableExpandAll: false, 
        enableExpanding: true,
        filterFromLeafRows: true, 
        getSubRows: (row) => row.children, 
        initialState: {
            density: 'compact',
            pagination: {
                pageIndex: 0, // 设置默认页码为第一页
                pageSize: 100,  // 设置默认每页显示100行
            },
        },
        paginateExpandedRows: false, 
        ...GetDataTableConfig(),
    });
    return <MaterialReactTable table={table} />;
}

/**
 * 校线异常原因旭日图组件
 * 
 * @description
 * 该组件用于展示校线异常原因的层级分布，实现以下功能：
 * 1. 从服务器获取异常原因数据并展示旭日图
 * 2. 同时提供表格形式展示详细数据
 * 3. 支持数据加载状态的骨架屏展示
 * 4. 实现响应式布局，适配不同设备
 * 
 * 技术实现：
 * - 使用 React.useState 管理异常原因数据状态
 * - 使用 React.useEffect 处理异步数据获取
 * - 使用 CustomNestedPie 组件展示旭日图
 * - 使用 DataTable 组件展示表格数据
 * - 使用 MUI Grid 系统实现响应式布局
 * 
 * 数据展示：
 * - 左侧：使用旭日图直观展示异常原因的层级关系
 * - 右侧：使用表格展示详细的异常数据
 * - 支持数据加载时的骨架屏展示
 * 
 * 布局设计：
 * - 移动端：垂直堆叠展示旭日图和表格
 * - 平板/桌面端：左右布局，合理分配空间
 * - 响应式设计确保在各种设备上的良好展示效果
 * 
 * @returns {JSX.Element} 返回包含旭日图和数据表格的卡片组件
 */
function CalibrationLineNestedPie() {
    const [CustomNestedPieData, setCustomNestedPieData] = React.useState<CustomNestedPieProps | null>(null)
    React.useEffect(() => {
        async function fetchPosts() {
            const data = await GetCustomNestedPieData()
            let temp_data = { data: data } as CustomNestedPieProps
            setCustomNestedPieData(temp_data)
        }
        fetchPosts()
    }, [])

    if (CustomNestedPieData === null) {
        return (
            <Grid container spacing={2} columns={1} sx={{ mb: (theme) => theme.spacing(2) }}>
                <Card variant="outlined" sx={{ width: '100%' }}>
                    <CardContent>
                        <Typography component="h2" variant="h4" sx={{ mb: 1 }}>
                            本月校线异常原因占比旭日图
                        </Typography>
                        <Typography color="textSecondary" sx={{ mb: 2 }}>
                            默认为最近30天数据
                        </Typography>
                        {Array.from({ length: 10 }).map((_, i) => (
                            <Skeleton key={`CalibrationLineNestedPieSkeleton_${i}`} animation="wave" />
                        ))}
                    </CardContent>
                </Card>
            </Grid>
        )
    } else {
        return (
            <Grid container spacing={2} columns={1} sx={{ mb: (theme) => theme.spacing(2) }}>
                <Card variant="outlined" sx={{ width: '100%' }}>
                    <CardContent>
                        <Typography component="h2" variant="h4" sx={{ mb: 1 }}>
                            本月校线异常原因占比旭日图
                        </Typography>
                        <Typography color="textSecondary" sx={{ mb: 2 }}>
                            默认为最近30天数据
                        </Typography>
                        <Grid container spacing={2} columns={2} sx={{ mb: (theme) => theme.spacing(2) }}>
                            <Grid size={{ xs: 12, sm: 6, lg: 1 }}>
                                <CustomNestedPie {...CustomNestedPieData} />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6, lg: 1 }}>
                                <DataTable {...CustomNestedPieData} />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        )
    }
}

/**
 * 校线异常处理流程页面主组件
 *
 * @description
 * 该组件是整个页面的根组件，负责组织和布局所有子组件。
 *
 * 组件结构：
 * 1. 页面标题 - 展示当前页面主题
 * 2. 更新时间信息 (UpdateTime) - 显示数据最后更新时间
 * 3. 总体统计卡片 (HeadCard) - 展示关键指标
 * 4. 无异常原因分析 (ReasonCard) - 分析正常流程数据
 * 5. 异常原因占比 (ConfigurationCard) - 分析异常原因
 * 6. 组别数据统计 (GroupCard) - 展示各组室数据
 *
 * 布局设计：
 * - 移动端：单列布局，垂直堆叠
 * - 平板：双列布局，合理分配空间
 * - 桌面端：最大宽度1700px，居中对齐
 *
 * 性能优化：
 * - 组件级别的代码分割
 * - 独立的数据获取逻辑
 * - 骨架屏优化加载体验
 *
 * @returns {JSX.Element} 返回完整的校线异常处理流程页面
 */
export default function CalibrationLine() {
    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            <Typography component="h2" variant="h4" sx={{ mb: 2 }}>
                校线异常处理流程情况
            </Typography>
            <UpdateTime name={'calibratio_line'} />
            <HeadCard />
            <ReasonCard />
            <CalibrationLineNestedPie />
            <GroupCard />
        </Box>
    )
}
