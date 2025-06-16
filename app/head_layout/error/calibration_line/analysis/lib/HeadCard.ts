'use server'
import InitDBConnect from '@/lib/db'
import { formatMinutes } from '@/lib/utils'
import type { NormCardProps } from '@/components/NormCard'

export async function get_data(): Promise<NormCardProps[]> {
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
