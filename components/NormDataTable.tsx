import * as React from 'react'
import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
} from 'material-react-table';
import { MRT_Localization_ZH_HANS } from 'material-react-table/locales/zh-Hans';

export interface Person {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    subRows?: Person[]; //Each person can have sub rows of more people
};

export const data: Person[] = [
    {
        firstName: 'Dylan',
        lastName: 'Murray',
        address: '261 Erdman Ford',
        city: 'East Daphne',
        state: 'Kentucky',
        subRows: [
            {
                firstName: 'Ervin',
                lastName: 'Reinger',
                address: '566 Brakus Inlet',
                city: 'South Linda',
                state: 'West Virginia',
                subRows: [
                    {
                        firstName: 'Jordane',
                        lastName: 'Homenick',
                        address: '1234 Brakus Inlet',
                        city: 'South Linda',
                        state: 'West Virginia',
                    },
                    {
                        firstName: 'Jordan',
                        lastName: 'Clarkson',
                        address: '4882 Palm Rd',
                        city: 'San Francisco',
                        state: 'California',
                    },
                ],
            },
            {
                firstName: 'Brittany',
                lastName: 'McCullough',
                address: '722 Emie Stream',
                city: 'Lincoln',
                state: 'Nebraska',
            },
        ],
    },
    {
        firstName: 'Raquel',
        lastName: 'Kohler',
        address: '769 Dominic Grove',
        city: 'Columbus',
        state: 'Ohio',
        subRows: [
            {
                firstName: 'Branson',
                lastName: 'Frami',
                address: '32188 Larkin Turnpike',
                city: 'Charleston',
                state: 'South Carolina',
            },
        ],
    },
];

export default function NormDataTable() {
    const columns = React.useMemo<MRT_ColumnDef<Person>[]>(() => [
            {
                accessorKey: 'firstName',
                header: 'First Name',
            },
            {
                accessorKey: 'lastName',
                header: 'Last Name',
            },

            {
                accessorKey: 'address',
                header: 'Address',
            },
            {
                accessorKey: 'city',
                header: 'City',
            },

            {
                accessorKey: 'state',
                header: 'State',
            },
        ],
        [],
        //end
    );

    const table = useMaterialReactTable({
        columns,
        data,
        enableExpandAll: false, //hide expand all double arrow in column header
        enableExpanding: true,
        filterFromLeafRows: true, //apply filtering to all rows instead of just parent rows
        getSubRows: (row) => row.subRows, //default
        initialState: {
            density: 'compact',
        }, //expand all rows by default
        paginateExpandedRows: false, //When rows are expanded, do not count sub-rows as number of rows on the page towards pagination
        localization: MRT_Localization_ZH_HANS,

        muiTablePaperProps: {
            elevation: 0,  // 设置为0以移除阴影
            sx: {
                border: 'none',
            }
        },
        // 添加以下配置来移除按钮边框
        muiTableHeadCellProps: {
            sx: {
                '& .MuiButtonBase-root': {
                    border: 'none'
                }
            }
        },
        muiTopToolbarProps: {
            sx: {
                '& .MuiButtonBase-root': {
                    border: 'none'
                }
            }
        },
        muiTableBodyCellProps: {
            sx: {
                '& .MuiButtonBase-root': {
                    border: 'none'
                }
            }
        },
        muiBottomToolbarProps: {
            sx: {
                '& .MuiButtonBase-root': {
                    border: 'none'
                },
                '& .MuiInputBase-root': {
                    border: 'none'
                }
            }
        },
    });

    return <MaterialReactTable table={table} />;
};