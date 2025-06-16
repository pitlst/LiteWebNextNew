'use server'
import InitDBConnect from '@/lib/db'

export default async function GetUpdateTime(name: string): Promise<string> {
    const client = await InitDBConnect()
    const updateTime_data = await client.db('liteweb').collection('update_time').findOne({ name: name })
    return updateTime_data ? String(updateTime_data.time) : '暂无更新时间'
}
