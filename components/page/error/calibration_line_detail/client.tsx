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
    单据编码: string
    发起单单据状态: string
    处理单单据状态: string
    责任单位: string
    构型分类: string
    项目名称: string
    失效原因_一级: string
    失效原因_二级: string
    响应计算起始时间: string
    预计及时响应时间: string
    实际响应时间: string
    响应用时: string
    是否及时响应: string
    响应所属组室: string
    一次诊断计算起始时间: string
    预计及时一次诊断时间: string
    实际一次诊断时间: string
    一次诊断用时: string
    是否及时一次诊断: string
    一次诊断所属组室: string
    二次诊断计算起始时间: string
    预计及时二次诊断时间: string
    实际二次诊断时间: string
    二次诊断用时: string
    是否及时二次诊断: string
    二次诊断所属组室: string
    返工计算起始时间: string
    预计及时返工时间: string
    实际返工时间: string
    返工用时: string
    是否及时返工: string
    返工所属组室: string
    验收计算起始时间: string
    预计及时验收时间: string
    实际验收时间: string
    验收用时: string
    是否及时验收: string
    验收所属组室: string
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
                accessorKey: '单据编码',
                header: '单据编码',
            },
            {
                accessorKey: '发起单单据状态',
                header: '发起单单据状态',
            },
            {
                accessorKey: '处理单单据状态',
                header: '处理单单据状态',
            },
            {
                accessorKey: '责任单位',
                header: '责任单位',
            },
            {
                accessorKey: '构型分类',
                header: '构型分类',
            },
            {
                accessorKey: '项目名称',
                header: '项目名称',
            },
            {
                accessorKey: '失效原因_一级',
                header: '失效原因_一级',
            },
            {
                accessorKey: '失效原因_二级',
                header: '失效原因_二级',
            },
            {
                accessorKey: '响应计算起始时间',
                header: '响应计算起始时间',
            },
            {
                accessorKey: '预计及时响应时间',
                header: '预计及时响应时间',
            },
            {
                accessorKey: '实际响应时间',
                header: '实际响应时间',
            },
            {
                accessorKey: '响应用时',
                header: '响应用时',
            },
            {
                accessorKey: '是否及时响应',
                header: '是否及时响应',
            },
            {
                accessorKey: '响应所属组室',
                header: '响应所属组室',
            },
            {
                accessorKey: '一次诊断计算起始时间',
                header: '一次诊断计算起始时间',
            },
            {
                accessorKey: '预计及时一次诊断时间',
                header: '预计及时一次诊断时间',
            },
            {
                accessorKey: '实际一次诊断时间',
                header: '实际一次诊断时间',
            },
            {
                accessorKey: '一次诊断用时',
                header: '一次诊断用时',
            },
            {
                accessorKey: '是否及时一次诊断',
                header: '是否及时一次诊断',
            },
            {
                accessorKey: '一次诊断所属组室',
                header: '一次诊断所属组室',
            },
            {
                accessorKey: '二次诊断计算起始时间',
                header: '二次诊断计算起始时间',
            },
            {
                accessorKey: '预计及时二次诊断时间',
                header: '预计及时二次诊断时间',
            },
            {
                accessorKey: '实际二次诊断时间',
                header: '实际二次诊断时间',
            },
            {
                accessorKey: '二次诊断用时',
                header: '二次诊断用时',
            },
            {
                accessorKey: '是否及时二次诊断',
                header: '是否及时二次诊断',
            },
            {
                accessorKey: '二次诊断所属组室',
                header: '二次诊断所属组室',
            },
            {
                accessorKey: '返工计算起始时间',
                header: '返工计算起始时间',
            },
            {
                accessorKey: '预计及时返工时间',
                header: '预计及时返工时间',
            },
            {
                accessorKey: '实际返工时间',
                header: '实际返工时间',
            },
            {
                accessorKey: '返工用时',
                header: '返工用时',
            },
            {
                accessorKey: '是否及时返工',
                header: '是否及时返工',
            },
            {
                accessorKey: '返工所属组室',
                header: '返工所属组室',
            },
            {
                accessorKey: '验收计算起始时间',
                header: '验收计算起始时间',
            },
            {
                accessorKey: '预计及时验收时间',
                header: '预计及时验收时间',
            },
            {
                accessorKey: '实际验收时间',
                header: '实际验收时间',
            },
            {
                accessorKey: '验收用时',
                header: '验收用时',
            },
            {
                accessorKey: '是否及时验收',
                header: '是否及时验收',
            },
            {
                accessorKey: '验收所属组室',
                header: '验收所属组室',
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

export default function CalibrationLineDetail() {
    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            <Typography component="h2" variant="h4" sx={{ mb: 2 }}>
                校线异常处理流程情况明细
            </Typography>
            <UpdateTime name={'calibration_line'} />
            <DataTable />
        </Box>
    )
}
