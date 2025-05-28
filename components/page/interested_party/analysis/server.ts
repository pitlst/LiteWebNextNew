'use server'

import InitDBConnect from '@/components/data/db'
import type { CustomDiagramProps } from '@/components/CustomDiagram'
import type { CustomTreeMapDataProps } from '@/components/CustomTreeMap'
import type { NormLineChartProps } from '@/components/NormLineChart'
import type { NormPieChartDataProps, NormPieChartProps } from '@/components/NormPieChart'
import type { HeadCardProps } from './client'

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

export async function GetHeadCardData() {
    const client = await InitDBConnect()
    const db = client.db('liteweb')
    const collection = db.collection('interested_party_head_card_data')
    const result = await collection.find({}, { projection: { _id: 0 } }).toArray()
    const data: HeadCardProps[] = result.map((item: any) => {
        return {
            title: String(item.title || ''),
            value: Number(item.value || 0),
        }
    })
    return data
}

export async function GetDatatimeData(): Promise<NormLineChartProps[]> {
    const client = await InitDBConnect()
    const db = client.db('liteweb')
    const collection = db.collection('interested_party_datatime_data')
    const result = await collection.find({}, { projection: { _id: 0 } }).toArray()
    return result as any as NormLineChartProps[]
}

export async function GetCenterPirChartData(): Promise<NormPieChartProps[]> {
    const client = await InitDBConnect()
    const db = client.db('liteweb')
    const collection = db.collection('interested_party_center_data')
    const result = await collection.find({}, { projection: { _id: 0 } }).toArray()
    let res_data: NormPieChartProps[] = result
        .map((item) => {
            return {
                index: typeof item.index !== 'undefined' ? Number(item.index) : 0,
                title: String(item.title || ''),
                data: (item.data || [])
                    .map(
                        (groupItem: any): NormPieChartDataProps => ({
                            id: typeof groupItem.id !== 'undefined' ? Number(groupItem.id) : 0,
                            label: String(groupItem.label || ''),
                            value: Number(groupItem.value || 0),
                        })
                    )
                    .sort((a: NormPieChartDataProps, b: NormPieChartDataProps) => {
                        if (a.id && b.id && a.id !== b.id) {
                            return a.id - b.id
                        }
                        return b.value - a.value
                    }),
                have_card: true,
                is_horizontal: false,
            }
        })
        .sort((a, b) => a.index - b.index)
    res_data.forEach((item) => {
        item.data = item.data.filter((d: NormPieChartDataProps) => d.label.trim() !== '')
    })

    return res_data
}


export async function GetTypeData(): Promise<CustomTreeMapDataProps[]> {
    const client = await InitDBConnect()
    const db = client.db('liteweb')
    const collection = db.collection('interested_party_type_data')
    const result = await collection.find({}, { projection: { _id: 0 } }).toArray()
    return result as any as CustomTreeMapDataProps[]
}

export async function GetProjectData(): Promise<CustomTreeMapDataProps[]> {
    const client = await InitDBConnect()
    const db = client.db('liteweb')
    const collection = db.collection('interested_party_project_data')
    const result = await collection.find({}, { projection: { _id: 0 } }).toArray()
    return result as any as CustomTreeMapDataProps[]
}