'use server'

import InitDBConnect from '@/components/data/db'
import type { CustomDiagramProps } from '@/components/charts/CustomDiagram'

export async function GetDiagramData() {
    const client = await InitDBConnect()
    const db = client.db('liteweb')
    const node_collection = db.collection('custom_dia_interested_party_node_data')
    const node_result = await node_collection.find({}, { projection: { _id: 0 } }).toArray()
    const links_collection = db.collection('custom_dia_interested_party_link_data')
    const links_result = await links_collection.find({}, { projection: { _id: 0 } }).toArray()

    const data: CustomDiagramProps = {
        nodes: node_result.map((item: any) => {
            return {
                name: String(item.name || ''),
            }
        }),
        links: links_result.map((item: any) => {
            return {
                source: String(item.source || ''),
                target: String(item.target || ''),
                value: Number(item.value || ''),
            }
        }),
    }
    return data
}

export interface Person {
    firstName: string
    lastName: string
    address: string
    city: string
    state: string
    subRows?: Person[] //Each person can have sub rows of more people
}

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
]
