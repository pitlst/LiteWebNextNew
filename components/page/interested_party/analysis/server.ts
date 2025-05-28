'use server'

import InitDBConnect from '@/components/data/db'
import type { CustomDiagramProps } from '@/components/CustomDiagram'
import type { CustomTreeMapDataProps } from '@/components/CustomTreeMap'
import type { NormLineChartProps } from '@/components/NormLineChart'
import type { NormPieChartDataProps, NormPieChartProps } from '@/components/NormPieChart'
import type { HeadCardProps } from './client'

async function getLast30Days(): Promise<string[]> {
    const days = []
    const today = new Date()
    for (let i = 29; i >= 0; i--) {
        const date = new Date()
        date.setDate(today.getDate() - i)
        const name = date.toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        })
        days.push(name)
    }
    return days
}

async function getLast12Months(): Promise<string[]> {
    const months = []
    const today = new Date()
    for (let i = 11; i >= 0; i--) {
        const date = new Date()
        date.setMonth(today.getMonth() - i)
        const monthName = date.toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'short',
        })
        months.push(monthName)
    }
    return months
}

export async function GetDiagramData(): Promise<CustomDiagramProps> {
    const client = await InitDBConnect()
    const db = client.db('liteweb')
    const node_collection = db.collection('interested_party_node_data')
    const node_result = await node_collection.find({}, { projection: { _id: 0 } }).toArray()
    const links_collection = db.collection('interested_party_links_data')
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

export async function GetHeadCardData(): Promise<HeadCardProps[]> {
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
    const data: NormLineChartProps[] = [
        {
            title: '每月相关方流动趋势',
            descriptions: '仅显示最近12月',
            key_string: `进入 ${Number(result[0].key || 0).toLocaleString()} 人`,
            trend: Boolean(result[0].trend || true),
            label: String(result[0].label || '+0%'),
            x_axis: await getLast12Months(),
            series: [
                {
                    id: 'direct',
                    label: '进入事业部',
                    showMark: false,
                    curve: 'linear',
                    stack: 'total',
                    area: true,
                    stackOrder: 'ascending',
                    data: result[0].series[0] || [],
                },
                {
                    id: 'referral',
                    label: '临时外出',
                    showMark: false,
                    curve: 'linear',
                    stack: 'total',
                    area: true,
                    stackOrder: 'ascending',
                    data: result[0].series[1] || [],
                },
                {
                    id: 'organic',
                    label: '离开事业部',
                    showMark: false,
                    curve: 'linear',
                    stack: 'total',
                    area: true,
                    stackOrder: 'ascending',
                    data: result[0].series[2] || [],
                },
            ]
        },
        {
            title: '每天相关方流动趋势',
            descriptions: '仅显示最近30天',
            key_string: `进入 ${Number(result[1].key || 0).toLocaleString()} 人`,
            x_axis: await getLast30Days(),
            trend: Boolean(result[0].trend || true),
            label: String(result[0].label || '+0%'),
            series: [
                {
                    id: 'direct',
                    label: '进入事业部',
                    showMark: false,
                    curve: 'linear',
                    stack: 'total',
                    area: true,
                    stackOrder: 'ascending',
                    data: result[1].series[0] || [],
                },
                {
                    id: 'referral',
                    label: '临时外出',
                    showMark: false,
                    curve: 'linear',
                    stack: 'total',
                    area: true,
                    stackOrder: 'ascending',
                    data: result[1].series[1] || [],
                },
                {
                    id: 'organic',
                    label: '离开事业部',
                    showMark: false,
                    curve: 'linear',
                    stack: 'total',
                    area: true,
                    stackOrder: 'ascending',
                    data: result[1].series[2] || [],
                    
                },
            ],
        },
    ]
    return data
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
