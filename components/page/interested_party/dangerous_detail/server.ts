'use server'

import InitDBConnect from '@/components/data/db'
import type { DataTableProps } from './client'

export async function GetTableData(): Promise<DataTableProps[]> {
    const client = await InitDBConnect()
    const db = client.db('liteweb')
    const collection = db.collection('interested_party_dangerous_detail_data')
    const result = await collection.find({}, { projection: { _id: 0 } }).toArray()
    const res_data: DataTableProps[] = result.map((item: Record<string, any>) => {
        return {
            作业人员姓名: String(item.作业人员姓名 || ''),
            作业人员联系电话: String(item.作业人员联系电话 || ''),
            所属相关方: String(item.所属相关方 || ''),
            作业地点: String(item.作业地点 || ''),
            台位车道: String(item.台位车道 || ''),
            危险源类型: String(item.危险源类型 || ''),
            作业类型: String(item.作业类型 || ''),
            具体作业内容: String(item.具体作业内容 || ''),
        }
    })
    return res_data
}
