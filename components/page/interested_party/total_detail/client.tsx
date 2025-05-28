'use client'

import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
    type MRT_Row,
    type MRT_SortingState,
    type MRT_RowVirtualizer,
} from 'material-react-table'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import { mkConfig, generateCsv, download } from 'export-to-csv'
import GetDataTableConfig from '@/components/theme/DataTableConfig'
import UpdateTime from '@/components/UpdateTime'
import { GetTableData } from './server'

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

const csvConfig = mkConfig({
    fieldSeparator: ',',
    decimalSeparator: '.',
    useKeysAsHeaders: true,
})

function DataTable() {
    const columns = React.useMemo<MRT_ColumnDef<DataTableProps>[]>(
        () => [
            {
                accessorKey: 'id',
                header: 'id',
            },
            {
                accessorKey: '修改时间',
                header: '修改时间',
            },
            {
                accessorKey: '申请人姓名',
                header: '申请人姓名',
            },
            {
                accessorKey: '申请人身份证号',
                header: '申请人身份证号',
            },
            {
                accessorKey: '申请人联系电话',
                header: '申请人联系电话',
            },
            {
                accessorKey: '公司名称',
                header: '公司名称',
            },
            {
                accessorKey: '是否签订过安全承诺书',
                header: '是否签订过安全承诺书',
            },
            {
                accessorKey: '随行人数',
                header: '随行人数',
            },
            {
                accessorKey: '是否为作业负责人',
                header: '是否为作业负责人',
            },
            {
                accessorKey: '单据状态',
                header: '单据状态',
            },
            {
                accessorKey: '作业状态',
                header: '作业状态',
            },
            {
                accessorKey: '申请作业时间',
                header: '申请作业时间',
            },
            {
                accessorKey: '计划开工日期',
                header: '计划开工日期',
            },
            {
                accessorKey: '计划开工上下午',
                header: '计划开工上下午',
            },
            {
                accessorKey: '计划完工日期',
                header: '计划完工日期',
            },
            {
                accessorKey: '计划完工上下午',
                header: '计划完工上下午',
            },
            {
                accessorKey: '作业地点',
                header: '作业地点',
            },
            {
                accessorKey: '作业类型',
                header: '作业类型',
            },
            {
                accessorKey: '具体作业内容',
                header: '具体作业内容',
            },
            {
                accessorKey: '项目名称',
                header: '项目名称',
            },
            {
                accessorKey: '车号',
                header: '车号',
            },
            {
                accessorKey: '台位车道',
                header: '台位车道',
            },
            {
                accessorKey: '作业依据',
                header: '作业依据',
            },
            {
                accessorKey: 'NCR开口项设计变更编号',
                header: 'NCR开口项设计变更编号',
            },
            {
                accessorKey: '作业危险性',
                header: '作业危险性',
            },
            {
                accessorKey: '是否危险作业',
                header: '是否危险作业',
            },
            {
                accessorKey: '是否需要监护人',
                header: '是否需要监护人',
            },
            {
                accessorKey: '是否需要作业证',
                header: '是否需要作业证',
            },
            {
                accessorKey: '是否携带危化品',
                header: '是否携带危化品',
            },
            {
                accessorKey: '携带危化品类型',
                header: '携带危化品类型',
            },
            {
                accessorKey: '事业部对接人',
                header: '事业部对接人',
            },
            {
                accessorKey: '事业部对接人姓名',
                header: '事业部对接人姓名',
            },
            {
                accessorKey: '事业部对接人部门',
                header: '事业部对接人部门',
            },
            {
                accessorKey: '事业部对接人工号',
                header: '事业部对接人工号',
            },
        ],
        []
    )
    const rowVirtualizerInstanceRef = React.useRef<MRT_RowVirtualizer>(null)

    const [data, setData] = React.useState<DataTableProps[]>([])
    const [isLoading, setIsLoading] = React.useState(true)
    const [sorting, setSorting] = React.useState<MRT_SortingState>([])

    React.useEffect(() => {
        async function fetchPosts() {
            setData(await GetTableData())
            setIsLoading(false)
        }
        if (typeof window !== 'undefined') {
            fetchPosts()
        }
    }, [])

    React.useEffect(() => {
        try {
            rowVirtualizerInstanceRef.current?.scrollToIndex?.(0)
        } catch (error) {
            console.error(error)
        }
    }, [sorting])

    const handleExportRows = (rows: MRT_Row<DataTableProps>[]) => {
        const rowData = rows.map((row) => row.original)
        const csv = generateCsv(csvConfig)(rowData)
        download(csvConfig)(csv)
    }

    const handleExportData = () => {
        const csv = generateCsv(csvConfig)(data)
        download(csvConfig)(csv)
    }

    const table = useMaterialReactTable({
        columns,
        data,
        enableBottomToolbar: false,
        enableGlobalFilterModes: true,
        enablePagination: false,
        enableRowNumbers: true,
        enableRowVirtualization: true,
        onSortingChange: setSorting,
        state: { isLoading, sorting },
        rowVirtualizerInstanceRef, //optional
        rowVirtualizerOptions: { overscan: 5 }, //optionally customize the row virtualizer
        initialState: {
            density: 'compact',
        },
        enableRowSelection: true,
        columnFilterDisplayMode: 'popover',
        positionToolbarAlertBanner: 'bottom',
        ...GetDataTableConfig(),
        muiTableContainerProps: { sx: { maxHeight: '1000px' } },
        renderTopToolbarCustomActions: ({ table }) => (
            <Box
                sx={{
                    display: 'flex',
                    gap: '16px',
                    padding: '8px',
                    flexWrap: 'wrap',
                }}
            >
                <Button onClick={handleExportData} startIcon={<FileDownloadIcon />}>
                    导出所有数据
                </Button>
                <Button
                    disabled={!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()}
                    onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
                    startIcon={<FileDownloadIcon />}
                >
                    导出所选行
                </Button>
            </Box>
        ),
    })

    return (
        <MaterialReactTable table={table} />
    )
}

export default function InterestedPartyDetail() {
    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            <Typography component="h2" variant="h4" sx={{ mb: 2 }}>
                相关方出入情况明细
            </Typography>
            <UpdateTime name={'calibration_line'} />
            <DataTable />
        </Box>
    )
}
