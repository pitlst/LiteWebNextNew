'use client'

import * as React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
import { MaterialReactTable, useMaterialReactTable, type MRT_ColumnDef } from 'material-react-table'

import UpdateTime from '@/components/UpdateTime'
import NormPieChart, { type NormPieChartProps } from '@/components/NormPieChart'
import NormCard, { type NormCardProps } from '@/components/NormCard'
import NormChart, { type NormChartProps } from '@/components/NormChart'
import { GetTotalData, GetErrorData, GetPieErrorData, GetPieReasonData, GetGroupData } from './lib/server'
import CustomNestedPie, { CustomNestedPieDataProps, CustomNestedPieProps } from '@/components/CustomNestedPie'
import GetDataTableConfig from '@/components/theme/DataTableConfig'


// 与 FastAPI 的请求体结构对应，但是这两个参数为python的datetime类型
export interface set_time_windows_props {
    start_time: string
    end_time: string
}



function HeadCard() {
    const [CalibrationLineTotalData, setCalibrationLineTotalData] = React.useState<NormCardProps[] | null>(null)
    React.useEffect(() => {
        async function fetchPosts() {
            const data = await GetTotalData()
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

function ReasonCard() {
    const [PieChartNoErrorData, setPieChartNoErrorData] = React.useState<NormPieChartProps[] | null>(null)
    React.useEffect(() => {
        async function fetchPosts() {
            const data = await GetPieReasonData()
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
                })}
            </Grid>
        )
    }
}

function GroupCard() {
    const [CalibrationLineGroupData, setCalibrationLineGroupData] = React.useState<NormChartProps[] | null>(null)
    React.useEffect(() => {
        async function fetchPosts() {
            const data = await GetGroupData()
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

function DataTable(props: CustomNestedPieProps) {
    const [isReady, setIsReady] = React.useState(false)
    React.useEffect(() => {
        const timer = setTimeout(() => setIsReady(true), 0)
        return () => clearTimeout(timer)
    }, [])
    const columns = React.useMemo<MRT_ColumnDef<CustomNestedPieDataProps>[]>(
        () => [
            {
                accessorKey: 'name',
                header: '异常原因名称',
            },
            {
                accessorKey: 'value',
                header: '异常个数',
            },
        ],
        []
    )

    const data = React.useMemo<CustomNestedPieDataProps[]>(() => {
        const calculateNodeValue = (node: CustomNestedPieDataProps): number => {
            if (node.value !== undefined && node.value !== null) {
                return node.value
            }
            if (node.children?.length) {
                node.value = node.children.reduce((sum: number, child: any) => sum + calculateNodeValue(child), 0)
                return node.value
            }
            return (node.value = 0)
        }
        // 创建深拷贝，避免修改原始数据
        return props.data.map((node) => {
            const newNode = { ...node }
            if (!newNode.value) {
                newNode.value = calculateNodeValue(node)
            }
            return newNode
        })
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
                pageIndex: 0,
                pageSize: 100,
            },
        },
        paginateExpandedRows: false,
        ...GetDataTableConfig(),
    })
    if (isReady) {
        return <MaterialReactTable table={table} />
    } else {
        return null
    }
}

function NestedPie() {
    const [CustomNestedPieData, setCustomNestedPieData] = React.useState<CustomNestedPieProps | null>(null)
    React.useEffect(() => {
        async function fetchPosts() {
            const data = await GetErrorData()
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

function ReasonPieCard() {
    const [PieChartErrorData, setPieChartErrorData] = React.useState<NormPieChartProps[] | null>(null)
    React.useEffect(() => {
        async function fetchPosts() {
            const data = await GetPieErrorData()
            setPieChartErrorData(data)
        }
        fetchPosts()
    }, [])
    if (PieChartErrorData === null) {
        return (
            <Grid container spacing={2} columns={1} sx={{ mb: (theme) => theme.spacing(2) }}>
                <Card variant="outlined" sx={{ display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1, height: '100%' }}>
                    <CardContent>
                        <Typography color="h3" variant="h5" gutterBottom>
                            本月校线异常原因占比
                        </Typography>
                        <Grid container spacing={2} columns={5} sx={{ mb: (theme) => theme.spacing(2) }}>
                            <Grid size={{ xs: 12, sm: 6, lg: 5 }}>
                                {Array.from({ length: 10 }).map((_, i) => (
                                    <Skeleton key={`CalibrationLineNestedPieSkeleton_${i}`} animation="wave" />
                                ))}
                            </Grid>
                            {Array.from({ length: 5 }).map((_, index) => (
                                <Grid key={index} size={{ xs: 12, sm: 6, lg: 1 }}>
                                    {Array.from({ length: 10 }).map((_, i) => (
                                        <Skeleton key={`CalibrationLineNestedPieSkeleton_${i}`} animation="wave" />
                                    ))}
                                </Grid>
                            ))}
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        )
    } else {
        const error_len = Math.min(PieChartErrorData.length, 5)
        return (
            <Grid container spacing={2} columns={1} sx={{ mb: (theme) => theme.spacing(2) }}>
                <Card variant="outlined" sx={{ display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1, height: '100%' }}>
                    <CardContent>
                        <Typography color="h3" variant="h5" gutterBottom>
                            本月校线异常原因占比
                        </Typography>
                        <Grid container spacing={2} columns={error_len} sx={{ mb: (theme) => theme.spacing(2) }}>
                            <Grid size={{ xs: 12, sm: 6, lg: error_len }}>
                                <NormPieChart {...PieChartErrorData[0]} is_horizontal={true} have_card={false} />
                            </Grid>
                            {PieChartErrorData.slice(1).map((card, index) => (
                                <Grid key={index} size={{ xs: 12, sm: 6, lg: 1 }}>
                                    <NormPieChart {...card} have_card={false} />
                                </Grid>
                            ))}
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        )
    }
}

export default function Page() {
    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            <Typography component="h2" variant="h4" sx={{ mb: 2 }}>
                校线异常处理流程情况分析
            </Typography>
            <UpdateTime name={'calibratio_line'} />
            <HeadCard />
            <ReasonCard />
            <NestedPie />
            <ReasonPieCard />
            <GroupCard />
        </Box>
    )
}
