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
    作业人员姓名: string
    作业人员联系电话: string
    所属相关方: string
    作业地点: string
    台位车道: string
    危险源类型: string
    作业类型: string
    具体作业内容: string
}

const csvConfig = mkConfig({
    fieldSeparator: ',',
    decimalSeparator: '.',
    useKeysAsHeaders: true,
})

function DataTable() {
    const [isReady, setIsReady] = React.useState(false);
    React.useEffect(() => {
        const timer = setTimeout(() => setIsReady(true), 0);
        return () => clearTimeout(timer);
    }, []);
    const columns = React.useMemo<MRT_ColumnDef<DataTableProps>[]>(
        () => [
            {
                accessorKey: '作业人员姓名',
                header: '作业人员姓名',
            },
            {
                accessorKey: '作业人员联系电话',
                header: '作业人员联系电话',
            },
            {
                accessorKey: '所属相关方',
                header: '所属相关方',
            },
            {
                accessorKey: '作业地点',
                header: '作业地点',
            },
            {
                accessorKey: '台位车道',
                header: '台位车道',
            },
            {
                accessorKey: '危险源类型',
                header: '危险源类型',
            },
            {
                accessorKey: '作业类型',
                header: '作业类型',
            },
            {
                accessorKey: '具体作业内容',
                header: '具体作业内容',
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

    if (isReady) {
        return <MaterialReactTable table={table} />;
    }
    else {
        return null;
    }
}

export default function InterestedPartyDetail() {
    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            <Typography component="h2" variant="h4" sx={{ mb: 2 }}>
                当前危险作业人员明细
            </Typography>
            <UpdateTime name={'calibration_line'} />
            <DataTable />
        </Box>
    )
}
