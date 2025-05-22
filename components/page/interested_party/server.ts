'use server'

import InitDBConnect from '@/components/data/db'
import type { CustomDiagramProps } from '@/components/charts/CustomDiagram'
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
    const collection = db.collection('interested_party_headcard_data')
    const result = await collection.find({}, { projection: { _id: 0 } }).toArray()

    const data: HeadCardProps[] = result.map((item: any) => {
        return {
            title: String(item.title || ''),
            value: Number(item.value || 0),
        }
    })
    return data
}
