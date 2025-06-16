'use server'

import InitDBConnect from '@/utils/db'
import { formatMinutes } from '@/components/utils'
import type { NormCardProps } from '@/components/NormCard'
import type { NormPieChartDataProps, NormPieChartProps } from '@/components/NormPieChart'
import type { NormChartGroupProps, NormChartProps } from '@/components/NormChart'
import type { CustomNestedPieDataProps } from '@/components/CustomNestedPie'

export async function GetTotalData(): Promise<NormCardProps[]> {
    const client = await InitDBConnect()
    const db = client.db('liteweb')
    const collection = db.collection('calibration_line_total_data')
    let result = await collection.find({}, { projection: { _id: 0 } }).toArray()
    result.sort((a: any, b: any) => a.index - b.index)
    result = result.filter((item: any) => item.title?.trim() !== '')

    const res_data: NormCardProps[] = result.map((item: any) => {
        const trend = Number(item.average_time || 0) <= Number(item.request_time || 0)
        const card_text = trend ? '平均用时良好' : '平均用时较长'
        const sub_text = `${formatMinutes(Number(item.average_time || 0))} / ${formatMinutes(Number(item.request_time || 0))}`
        return {
            title: String(item.title || ''),
            sub_title: '本月流程平均用时 / 流程要求时限',
            sub_text: sub_text,
            card_text: card_text,
            request_value: Number(item.value || 0),
            request_value_trend: trend,
        }
    })
    return res_data
}

export async function GetPieReasonData(): Promise<NormPieChartProps[]> {
    const client = await InitDBConnect()
    const db = client.db('liteweb')
    const collection = db.collection('calibration_line_pie_reason_data')
    const result = await collection.find({}, { projection: { _id: 0 } }).toArray()
    let res_data: NormPieChartProps[] = result
        .map((item: any) => {
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
        .sort((a: NormPieChartProps, b: NormPieChartProps) => a.index - b.index)
    res_data.forEach((item) => {
        item.data = item.data.filter((d: NormPieChartDataProps) => d.label.trim() !== '')
    })

    return res_data
}

export async function GetErrorData(): Promise<CustomNestedPieDataProps[]> {
    const client = await InitDBConnect()
    const db = client.db('liteweb')
    const collection = db.collection('calibration_line_error_data')
    const result = await collection.find({}, { projection: { _id: 0 } }).toArray()
    return result as any as CustomNestedPieDataProps[]
}

export async function GetPieErrorData() : Promise<NormPieChartProps[]> {
    const client = await InitDBConnect()
    const db = client.db('liteweb')
    const collection = db.collection('calibration_line_pie_error_data')
    const result = await collection.find({}, { projection: { _id: 0 } }).toArray()
    return result as any as NormPieChartProps[] 
}

export async function GetGroupData(): Promise<NormChartProps[]> {
    const client = await InitDBConnect()
    const db = client.db('liteweb')
    const collection = db.collection('calibration_line_group_data')
    const result = await collection.find({}, { projection: { _id: 0 } }).toArray()
    let res_data: NormChartProps[] = result
        .map((item: any) => {
            const total = item.group.reduce((sum: number, groupItem: any) => sum + Number(groupItem.total || 0), 0)
            const complete = item.group.reduce((sum: number, groupItem: any) => sum + Number(groupItem.ontime || 0), 0)
            return {
                index: typeof item.index !== 'undefined' ? Number(item.index) : 0,
                title: String(item.title || ''),
                trend: Boolean(item.trend || true),
                total: total,
                complete: complete,
                group: item.group
                    .map((groupItem: any): NormChartGroupProps => {
                        const total = Number(groupItem.total || 0)
                        const ontime = Number(groupItem.ontime || 0)
                        const complete = total !== 0 ? Math.floor((ontime / total) * 100) : 100
                        return {
                            name: String(groupItem.name || ''),
                            ontime: ontime,
                            total: total,
                            complete: complete,
                        }
                    })
                    .sort((a: NormChartGroupProps, b: NormChartGroupProps) => b.complete - a.complete),
            }
        })
        .sort((a: NormChartProps, b: NormChartProps) => a.index - b.index)
    return res_data
}
