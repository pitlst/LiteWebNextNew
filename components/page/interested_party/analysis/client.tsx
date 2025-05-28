'use client'

import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import Skeleton from '@mui/material/Skeleton'
import UpdateTime from '@/components/UpdateTime'
import CustomDiagram, { type CustomDiagramProps } from '@/components/CustomDiagram'
import CustomTreeMap, { type CustomTreeMapProps, CustomTreeMapDataProps } from '@/components/CustomTreeMap'
import NormLineChart, { type NormLineChartProps } from '@/components/NormLineChart'
import NormPieChart, { type NormPieChartProps } from '@/components/NormPieChart'
import { MaterialReactTable, useMaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import GetDataTableConfig from '@/components/theme/DataTableConfig'
import {
    GetDiagramData,
    GetHeadCardData,
    GetDatatimeData,
    GetCenterPirChartData,
    GetTypeData,
    GetProjectData,
} from './server'

function NestedPie() {
    const [DiagramData, setDiagramData] = React.useState<CustomDiagramProps | null>(null)
    React.useEffect(() => {
        async function fetchPosts() {
            const data = await GetDiagramData()
            setDiagramData(data)
        }
        fetchPosts()
    }, [])

    if (DiagramData === null) {
        return (
            <Grid spacing={2} sx={{ mb: (theme) => theme.spacing(2) }}>
                <Card variant="outlined" sx={{ width: '100%' }}>
                    <CardContent>
                        <Typography component="h2" variant="h4" sx={{ mb: 1 }}>
                            相关方出入情况桑基图
                        </Typography>
                        <Typography color="textSecondary" sx={{ mb: 2 }}>
                            默认为最近30天数据
                        </Typography>
                        {Array.from({ length: 20 }).map((_, i) => (
                            <Skeleton key={i} animation="wave" />
                        ))}
                    </CardContent>
                </Card>
            </Grid>
        )
    } else {
        return (
            <Grid spacing={2} sx={{ mb: (theme) => theme.spacing(2) }}>
                <Card variant="outlined" sx={{ width: '100%' }}>
                    <CardContent>
                        <Typography component="h2" variant="h4" sx={{ mb: 1 }}>
                            相关方出入情况桑基图
                        </Typography>
                        <Typography color="textSecondary" sx={{ mb: 2 }}>
                            默认为最近30天数据
                        </Typography>
                        <CustomDiagram {...DiagramData} />
                    </CardContent>
                </Card>
            </Grid>
        )
    }
}

export interface HeadCardProps {
    title: string
    value: number
}

function HeadCard() {
    const [InterestedPartyData, setInterestedPartyData] = React.useState<HeadCardProps[] | null>(null)
    React.useEffect(() => {
        async function fetchPosts() {
            const data = await GetHeadCardData()
            setInterestedPartyData(data)
        }
        fetchPosts()
    }, [])
    if (InterestedPartyData === null) {
        return (
            <Grid container spacing={2} columns={3} sx={{ mb: (theme) => theme.spacing(2) }}>
                {Array.from({ length: 3 }).map((_, i) => (
                    <Grid key={i} size={{ xs: 12, sm: 6, lg: 1 }}>
                        <Card variant="outlined" sx={{ height: '100%', flexGrow: 1 }}>
                            <CardContent>
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Skeleton key={i} animation="wave" />
                                ))}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        )
    } else {
        return (
            <Grid container spacing={2} columns={InterestedPartyData.length} sx={{ mb: (theme) => theme.spacing(2) }}>
                {InterestedPartyData.map((card, index) => (
                    <Grid key={index} size={{ xs: 12, sm: 6, lg: 1 }}>
                        <Card variant="outlined" sx={{ height: '100%', flexGrow: 1 }}>
                            <CardContent>
                                <Typography component="h2" variant="subtitle2" gutterBottom>
                                    {card.title}
                                </Typography>
                                <Stack direction="column" sx={{ justifyContent: 'space-between', flexGrow: '1', gap: 1 }}>
                                    <Stack sx={{ justifyContent: 'space-between' }}>
                                        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Typography variant="h4" component="p">
                                                {card.value}
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        )
    }
}

function DatatimeCard() {
    const [DatatimeData, setDatatimeData] = React.useState<NormLineChartProps[] | null>(null)
    React.useEffect(() => {
        async function fetchPosts() {
            const data = await GetDatatimeData()
            setDatatimeData(data)
        }
        fetchPosts()
    }, [])
    if (DatatimeData === null) {
        return (
            <Grid container spacing={2} columns={2} sx={{ mb: (theme) => theme.spacing(2) }}>
                {Array.from({ length: 2 }).map((_, i) => (
                    <Grid key={i} size={{ xs: 12, sm: 6, lg: 1 }}>
                        <Card variant="outlined" sx={{ height: '100%', flexGrow: 1 }}>
                            <CardContent>
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Skeleton key={i} animation="wave" />
                                ))}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        )
    } else {
        return (
            <Grid container spacing={2} columns={DatatimeData.length} sx={{ mb: (theme) => theme.spacing(2) }}>
                {DatatimeData.map((card, index) => (
                    <Grid key={index} size={{ xs: 12, sm: 6, lg: 1 }}>
                        <NormLineChart {...card} />
                    </Grid>
                ))}
            </Grid>
        )
    }
}

function CenterCard() {
    const [CenterPieChartData, setCenterPieChartData] = React.useState<NormPieChartProps[] | null>(null)
    React.useEffect(() => {
        async function fetchPosts() {
            const data = await GetCenterPirChartData()
            setCenterPieChartData(data)
        }
        fetchPosts()
    }, [])
    if (CenterPieChartData === null) {
        const temp = Array.from({ length: 4 }, (_, i) => i)
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
            <Grid container spacing={2} columns={CenterPieChartData.length} sx={{ mb: (theme) => theme.spacing(2) }}>
                {CenterPieChartData.map((card, index) => {
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

interface DataTableProps {
    data: CustomTreeMapDataProps[]
    columns: MRT_ColumnDef<CustomTreeMapDataProps>[]
}

function DataTable(props: DataTableProps) {
    const data = React.useMemo<CustomTreeMapDataProps[]>(() => {
        const calculateNodeValue = (node: CustomTreeMapDataProps): number => {
            if (node.value !== undefined && node.value !== null) {
                return node.value;
            }
            if (node.children?.length) {
                node.value = node.children.reduce(
                    (sum: number, child: any) => sum + calculateNodeValue(child),
                    0
                );
                return node.value;
            }
            return (node.value = 0);
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
    const columns = props.columns;
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
    });
    return <MaterialReactTable table={table} />;
}

function TypeDataTable(props: CustomTreeMapProps) {
    const columns = React.useMemo<MRT_ColumnDef<CustomTreeMapDataProps>[]>(() => [
        {
            accessorKey: 'name',
            header: '作业类型与内容',
        },
        {
            accessorKey: 'value',
            header: '数量',
        },
    ],
        [],
    );
    return (<DataTable data={props.data} columns={columns} />)
}

function ProjectDataTable(props: CustomTreeMapProps) {
    const columns = React.useMemo<MRT_ColumnDef<CustomTreeMapDataProps>[]>(() => [
        {
            accessorKey: 'name',
            header: '作业项目与车号',
        },
        {
            accessorKey: 'value',
            header: '数量',
        },
    ],
        [],
    );
    return (<DataTable data={props.data} columns={columns} />)
}

function TreeMapTypeCard() {
    const [TreeMapTypeData, setTreeMapTypeData] = React.useState<CustomTreeMapProps | null>(null)
    React.useEffect(() => {
        async function fetchPosts() {
            const data = await GetTypeData()
            const temp_data = { data: data } as CustomTreeMapProps
            setTreeMapTypeData(temp_data)
        }
        fetchPosts()
    }, [])
    if (TreeMapTypeData === null) {
        return (
            <Grid container spacing={2} columns={1} sx={{ mb: (theme) => theme.spacing(2) }}>
                <Card variant="outlined" sx={{ width: '100%' }}>
                    <CardContent>
                        <Typography component="h2" variant="h4" sx={{ mb: 1 }}>
                            本月相关方作业类型与内容旭日图
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
                            本月相关方作业类型与内容旭日图
                        </Typography>
                        <Typography color="textSecondary" sx={{ mb: 2 }}>
                            默认为最近30天数据
                        </Typography>
                        <Grid container spacing={2} columns={2} sx={{ mb: (theme) => theme.spacing(2) }}>
                            <Grid size={{ xs: 12, sm: 6, lg: 1 }}>
                                <CustomTreeMap {...TreeMapTypeData} />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6, lg: 1 }}>
                                <TypeDataTable {...TreeMapTypeData} />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        )
    }
}

function TreeMapProjectCard() {
    const [TreeMapProjectData, setTreeMapProjectData] = React.useState<CustomTreeMapProps | null>(null)
    React.useEffect(() => {
        async function fetchPosts() {
            const data = await GetProjectData()
            const temp_data = { data: data } as CustomTreeMapProps
            setTreeMapProjectData(temp_data)
        }
        fetchPosts()
    }, [])
    if (TreeMapProjectData === null) {
        return (
            <Grid container spacing={2} columns={1} sx={{ mb: (theme) => theme.spacing(2) }}>
                <Card variant="outlined" sx={{ width: '100%' }}>
                    <CardContent>
                        <Typography component="h2" variant="h4" sx={{ mb: 1 }}>
                            本月相关方作业项目与车号旭日图
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
                            本月相关方作业项目与车号旭日图
                        </Typography>
                        <Typography color="textSecondary" sx={{ mb: 2 }}>
                            默认为最近30天数据
                        </Typography>
                        <Grid container spacing={2} columns={2} sx={{ mb: (theme) => theme.spacing(2) }}>
                            <Grid size={{ xs: 12, sm: 6, lg: 1 }}>
                                <CustomTreeMap {...TreeMapProjectData} />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6, lg: 1 }}>
                                <ProjectDataTable {...TreeMapProjectData} />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        )
    }
}


export default function InterestedParty() {
    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            <Typography component="h2" variant="h4" sx={{ mb: 2 }}>
                相关方出入情况分析
            </Typography>
            <UpdateTime name={'interested_party'} />
            <HeadCard />
            <DatatimeCard />
            <CenterCard />
            <TreeMapTypeCard />
            <TreeMapProjectCard />
            <NestedPie />
        </Box>
    )
}
