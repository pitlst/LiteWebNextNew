'use client'

import * as React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton'
import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_Row,
    createMRTColumnHelper,
} from 'material-react-table';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { mkConfig, generateCsv, download } from 'export-to-csv';
import GetDataTableConfig  from '@/components/theme/DataTableConfig'
import UpdateTime from '@/components/UpdateTime'
import { GetTableData } from './server'

export type DataTableProps = {
    单据编码: string,
    发起单单据状态: string,
    处理单单据状态: string,
    责任单位: string,
    构型分类: string,
    项目名称: string,
    失效原因_一级: string,
    失效原因_二级: string,
    响应计算起始时间: string,
    预计及时响应时间: string,
    实际响应时间: string,
    响应用时: string,
    是否及时响应: string,
    响应所属组室: string,
    一次诊断计算起始时间: string,
    预计及时一次诊断时间: string,
    实际一次诊断时间: string,
    一次诊断用时: string,
    是否及时一次诊断: string,
    一次诊断所属组室: string,
    二次诊断计算起始时间: string,
    预计及时二次诊断时间: string,
    实际二次诊断时间: string,
    二次诊断用时: string,
    是否及时二次诊断: string,
    二次诊断所属组室: string,
    返工计算起始时间: string,
    预计及时返工时间: string,
    实际返工时间: string,
    返工用时: string,
    是否及时返工: string,
    返工所属组室: string,
    验收计算起始时间: string,
    预计及时验收时间: string,
    实际验收时间: string,
    验收用时: string,
    是否及时验收: string,
    验收所属组室: string,
}

export interface DataTableFunctionProps {
    data: DataTableProps[]
}
const columnHelper = createMRTColumnHelper<DataTableProps>();

const columns = [
    columnHelper.accessor('单据编码', {
        header: '单据编码',
    }),
    columnHelper.accessor('发起单单据状态', {
        header: '发起单单据状态',
    }),
    columnHelper.accessor('处理单单据状态', {
        header: '处理单单据状态',
    }),
    columnHelper.accessor('责任单位', {
        header: '责任单位',
    }),
    columnHelper.accessor('构型分类', {
        header: '构型分类',
    }),
    columnHelper.accessor('项目名称', {
        header: '项目名称',
    }),
    columnHelper.accessor('失效原因_一级', {
        header: '失效原因_一级',
    }),
    columnHelper.accessor('失效原因_二级', {
        header: '失效原因_二级',
    }),
    columnHelper.accessor('响应计算起始时间', {
        header: '响应计算起始时间',
    }),
    columnHelper.accessor('预计及时响应时间', {
        header: '预计及时响应时间',
    }),
    columnHelper.accessor('实际响应时间', {
        header: '实际响应时间',
    }),
    columnHelper.accessor('响应用时', {
        header: '响应用时',
    }),
    columnHelper.accessor('是否及时响应', {
        header: '是否及时响应',
    }),
    columnHelper.accessor('响应所属组室', {
        header: '响应所属组室',
    }),
    columnHelper.accessor('一次诊断计算起始时间', {
        header: '一次诊断计算起始时间',
    }),
    columnHelper.accessor('预计及时一次诊断时间', {
        header: '预计及时一次诊断时间',
    }),
    columnHelper.accessor('实际一次诊断时间', {
        header: '实际一次诊断时间',
    }),
    columnHelper.accessor('一次诊断用时', {
        header: '一次诊断用时',
    }),
    columnHelper.accessor('是否及时一次诊断', {
        header: '是否及时一次诊断',
    }),
    columnHelper.accessor('一次诊断所属组室', {
        header: '一次诊断所属组室',
    }),
    columnHelper.accessor('二次诊断计算起始时间', {
        header: '二次诊断计算起始时间',
    }),
    columnHelper.accessor('预计及时二次诊断时间', {
        header: '预计及时二次诊断时间',
    }),
    columnHelper.accessor('实际二次诊断时间', {
        header: '实际二次诊断时间',
    }),
    columnHelper.accessor('二次诊断用时', {
        header: '二次诊断用时',
    }),
    columnHelper.accessor('是否及时二次诊断', {
        header: '是否及时二次诊断',
    }),
    columnHelper.accessor('二次诊断所属组室', {
        header: '二次诊断所属组室',
    }),
    columnHelper.accessor('返工计算起始时间', {
        header: '返工计算起始时间',
    }),
    columnHelper.accessor('预计及时返工时间', {
        header: '预计及时返工时间',
    }),
    columnHelper.accessor('实际返工时间', {
        header: '实际返工时间',
    }),
    columnHelper.accessor('返工用时', {
        header: '返工用时',
    }),
    columnHelper.accessor('是否及时返工', {
        header: '是否及时返工',
    }),
    columnHelper.accessor('返工所属组室', {
        header: '返工所属组室',
    }),
    columnHelper.accessor('验收计算起始时间', {
        header: '验收计算起始时间',
    }),
    columnHelper.accessor('预计及时验收时间', {
        header: '预计及时验收时间',
    }),
    columnHelper.accessor('实际验收时间', {
        header: '实际验收时间',
    }),
    columnHelper.accessor('验收用时', {
        header: '验收用时',
    }),
    columnHelper.accessor('是否及时验收', {
        header: '是否及时验收',
    }),
    columnHelper.accessor('验收所属组室', {
        header: '验收所属组室',
    }),
];

const csvConfig = mkConfig({
    fieldSeparator: ',',
    decimalSeparator: '.',
    useKeysAsHeaders: true,
});

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
                pageIndex: 0, // 设置默认页码为第一页
                pageSize: 20,  // 设置默认每页显示100行
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

export default function CalibrationLineDetail() {
    const [DataTableData, setDataTableData] = React.useState<DataTableProps[] | null>(null)
    React.useEffect(() => {
        async function fetchPosts() {
            const data = await GetTableData()
            setDataTableData(data)
        }
        fetchPosts()
    }, [])
    if (DataTableData === null) {
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            <Typography component="h2" variant="h4" sx={{ mb: 2 }}>
                校线异常处理流程情况明细
            </Typography>
            <UpdateTime name={'calibratio_line'} />
            <Grid container spacing={2} columns={1} sx={{ mb: (theme) => theme.spacing(2) }}>
                <Card variant="outlined" sx={{ width: '100%' }}>
                    <CardContent>
                        {Array.from({ length: 100 }).map((_, i) => (
                            <Skeleton key={`CalibrationLineDetail_${i}`} animation="wave" />
                        ))}
                    </CardContent>
                </Card>
            </Grid>
        </Box>
    }
    else {
        return (
            <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
                <Typography component="h2" variant="h4" sx={{ mb: 2 }}>
                    校线异常处理流程情况明细
                </Typography>
                <UpdateTime name={'calibration_line'} />
                <Grid container spacing={2} columns={1} sx={{ mb: (theme) => theme.spacing(2) }}>
                    <DataTable data={DataTableData} />
                </Grid>
            </Box>
        )
    }

}