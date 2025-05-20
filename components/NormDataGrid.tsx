import * as React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { GridRowsProp, GridColDef } from '@mui/x-data-grid'

export interface NormDataGridProps {
    rows: GridRowsProp
    columns: GridColDef[]
}

export default function NormDataGrid(props: NormDataGridProps) {
    return (
        <DataGrid
            checkboxSelection
            rows={props.rows}
            columns={props.columns}
            getRowClassName={(params) => (params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd')}
            initialState={{
                pagination: { paginationModel: { pageSize: 20 } },
            }}
            pageSizeOptions={[10, 20, 50]}
            disableColumnResize
            density="compact"
            slotProps={{
                filterPanel: {
                    filterFormProps: {
                        logicOperatorInputProps: {
                            variant: 'outlined',
                            size: 'small',
                        },
                        columnInputProps: {
                            variant: 'outlined',
                            size: 'small',
                            sx: { mt: 'auto' },
                        },
                        operatorInputProps: {
                            variant: 'outlined',
                            size: 'small',
                            sx: { mt: 'auto' },
                        },
                        valueInputProps: {
                            InputComponentProps: {
                                variant: 'outlined',
                                size: 'small',
                            },
                        },
                    },
                },
            }}
        />
    )
}
