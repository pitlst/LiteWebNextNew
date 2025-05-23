'use client'

import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import Skeleton from '@mui/material/Skeleton'
import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_Row,
    createMRTColumnHelper,
} from 'material-react-table';
import { mkConfig, generateCsv, download } from 'export-to-csv';
import Button from '@mui/material/Button';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

import GetDataTableConfig from '@/components/theme/DataTableConfig'
import UpdateTime from '@/components/UpdateTime'
import CustomDiagram, { CustomDiagramProps } from '@/components/CustomDiagram'
import NormLineChart, { type NormLineChartProps } from '@/components/NormLineChart'
import { GetDiagramData, GetHeadCardData, GetDatatimeData, GetTaleData } from './server'


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

export type DataTableProps = {
    id: number,
    修改时间: string,
    申请人姓名: string,
    申请人身份证号: string,
    申请人联系电话: string,
    公司名称: string,
    是否签订过安全承诺书: string,
    随行人数: number,
    是否为作业负责人: string,
    单据状态: string,
    作业状态: string,
    申请作业时间: string,
    计划开工日期: string,
    计划开工上下午: string,
    计划完工日期: string,
    计划完工上下午: string,
    作业地点: string,
    作业类型: string,
    具体作业内容: string,
    项目名称: string,
    车号: string,
    台位车道: string,
    作业依据: string,
    NCR开口项设计变更编号: string,
    作业危险性: string,
    是否危险作业: string,
    是否需要监护人: string,
    是否需要作业证: string,
    是否携带危化品: string,
    携带危化品类型: string,
    事业部对接人: string,
    事业部对接人姓名: string,
    事业部对接人部门: string,
    事业部对接人工号: string,
}
const columnHelper = createMRTColumnHelper<DataTableProps>();
const columns = [
    columnHelper.accessor('id', {
        header: 'id',
    }),
    columnHelper.accessor('修改时间', {
        header: '修改时间',
    }),
    columnHelper.accessor('申请人姓名', {
        header: '申请人姓名',
    }),
    columnHelper.accessor('申请人身份证号', {
        header: '申请人身份证号',
    }),
    columnHelper.accessor('申请人联系电话', {
        header: '申请人联系电话',
    }),
    columnHelper.accessor('公司名称', {
        header: '公司名称',
    }),
    columnHelper.accessor('是否签订过安全承诺书', {
        header: '是否签订过安全承诺书',
    }),
    columnHelper.accessor('随行人数', {
        header: '随行人数',
    }),
    columnHelper.accessor('是否为作业负责人', {
        header: '是否为作业负责人',
    }),
    columnHelper.accessor('单据状态', {
        header: '单据状态',
    }),
    columnHelper.accessor('作业状态', {
        header: '作业状态',
    }),
    columnHelper.accessor('申请作业时间', {
        header: '申请作业时间',
    }),
    columnHelper.accessor('计划开工日期', {
        header: '计划开工日期',
    }),
    columnHelper.accessor('计划开工上下午', {
        header: '计划开工上下午',
    }),
    columnHelper.accessor('计划完工日期', {
        header: '计划完工日期',
    }),
    columnHelper.accessor('计划完工上下午', {
        header: '计划完工上下午',
    }),
    columnHelper.accessor('作业地点', {
        header: '作业地点',
    }),
    columnHelper.accessor('作业类型', {
        header: '作业类型',
    }),
    columnHelper.accessor('具体作业内容', {
        header: '具体作业内容',
    }),
    columnHelper.accessor('项目名称', {
        header: '项目名称',
    }),
    columnHelper.accessor('车号', {
        header: '车号',
    }),
    columnHelper.accessor('台位车道', {
        header: '台位车道',
    }),
    columnHelper.accessor('作业依据', {
        header: '作业依据',
    }),
    columnHelper.accessor('NCR开口项设计变更编号', {
        header: 'NCR开口项设计变更编号',
    }),
    columnHelper.accessor('作业危险性', {
        header: '作业危险性',
    }),
    columnHelper.accessor('是否危险作业', {
        header: '是否危险作业',
    }),
    columnHelper.accessor('是否需要监护人', {
        header: '是否需要监护人',
    }),
    columnHelper.accessor('是否需要作业证', {
        header: '是否需要作业证',
    }),
    columnHelper.accessor('是否携带危化品', {
        header: '是否携带危化品',
    }),
    columnHelper.accessor('携带危化品类型', {
        header: '携带危化品类型',
    }),
    columnHelper.accessor('事业部对接人', {
        header: '事业部对接人',
    }),
    columnHelper.accessor('事业部对接人姓名', {
        header: '事业部对接人姓名',
    }),
    columnHelper.accessor('事业部对接人部门', {
        header: '事业部对接人部门',
    }),
    columnHelper.accessor('事业部对接人工号', {
        header: '事业部对接人工号',
    }),
];

const csvConfig = mkConfig({
    fieldSeparator: ',',
    decimalSeparator: '.',
    useKeysAsHeaders: true,
});

export interface DataTableFunctionProps {
    data: DataTableProps[]
}

function DataTable(props: DataTableFunctionProps) {
    const data = React.useMemo<DataTableProps[]>(() => {
        return props.data;
    }, [props.data]);

    const handleExportRows = (rows: MRT_Row<DataTableProps>[]) => {
        const rowData = rows.map((row) => row.original);
        const csv = generateCsv(csvConfig)(rowData);
        download(csvConfig)(csv);
    };

    const handleExportData = () => {
        const csv = generateCsv(csvConfig)(data);
        download(csvConfig)(csv);
    };

    const table = useMaterialReactTable({
        columns,
        data,
        enableRowSelection: true,
        columnFilterDisplayMode: 'popover',
        paginationDisplayMode: 'pages',
        positionToolbarAlertBanner: 'bottom',
        initialState: {
            density: 'compact',
            pagination: {
                pageIndex: 0,
                pageSize: 20,
            },
        },
        ...GetDataTableConfig(),
        renderTopToolbarCustomActions: ({ table }) => (
            <Box
                sx={{
                    display: 'flex',
                    gap: '16px',
                    padding: '8px',
                    flexWrap: 'wrap',
                }}
            >
                <Button
                    onClick={handleExportData}
                    startIcon={<FileDownloadIcon />}
                >
                    导出所有数据
                </Button>
                <Button
                    disabled={table.getPrePaginationRowModel().rows.length === 0}
                    onClick={() =>
                        handleExportRows(table.getPrePaginationRowModel().rows)
                    }
                    startIcon={<FileDownloadIcon />}
                >
                    导出所有行
                </Button>
                <Button
                    disabled={table.getRowModel().rows.length === 0}
                    onClick={() => handleExportRows(table.getRowModel().rows)}
                    startIcon={<FileDownloadIcon />}
                >
                    导出当前页数据
                </Button>
                <Button
                    disabled={
                        !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
                    }
                    onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
                    startIcon={<FileDownloadIcon />}
                >
                    导出所选行
                </Button>
            </Box>
        ),
    });
    return (
        <MaterialReactTable table={table} />
    )
}


function DataTableCard() {
    const [DataTableData, setDataTableData] = React.useState<DataTableProps[] | null>(null)
    React.useEffect(() => {
        async function fetchPosts() {
            const data = await GetTaleData()
            setDataTableData(data)
        }
        fetchPosts()
    }, [])
    if (DataTableData === null) {
        return (
            <Card variant="outlined" sx={{ width: '100%' }}>
                <CardContent>
                    <Typography component="h2" variant="subtitle2" gutterBottom>
                        相关方出入情况明细
                    </Typography>
                    {Array.from({ length: 10 }).map((_, i) => (
                        <Skeleton key={`CalibrationLineNestedPieSkeleton_${i}`} animation="wave" />
                    ))}
                </CardContent>
            </Card>
        )
    } else {
        <Card variant="outlined" sx={{ width: '100%' }}>
            <CardContent>
                <Typography component="h2" variant="subtitle2" gutterBottom>
                    相关方出入情况明细
                </Typography>
                {/* <DataTable data={DataTableData} /> */}
            </CardContent>
        </Card>
        // <Card variant="outlined" sx={{ width: '100%' }}>
        //     <CardContent>
        //         <Typography component="h2" variant="subtitle2" gutterBottom>
        //             相关方出入情况明细
        //         </Typography>
        //         {Array.from({ length: 10 }).map((_, i) => (
        //             <Skeleton key={`CalibrationLineNestedPieSkeleton_${i}`} animation="wave" />
        //         ))}
        //     </CardContent>
        // </Card>
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

export default function InterestedParty() {
    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            <Typography component="h2" variant="h4" sx={{ mb: 2 }}>
                相关方管理情况分析
            </Typography>
            <UpdateTime name={'interested_party'} />
            <HeadCard />
            <DatatimeCard />
            <NestedPie />
            <DataTableCard />
        </Box>
    )
}
