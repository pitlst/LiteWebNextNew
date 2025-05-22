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



export default function DataTable() {
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
        ...GetDataTableConfig<Person>(columns, data),
        getSubRows: (row) => row.subRows, //default
    });
    return <MaterialReactTable table={table} />;
};