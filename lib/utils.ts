'use server'

import InitDBConnect from '@/lib/db'

export async function format_minutes(minutes: number): Promise<string> {
    // 计算小时数（向下取整）
    const hours = Math.floor(minutes / 60)
    // 计算剩余分钟数
    const remainingMinutes = minutes % 60
    // 根据小时和分钟数的情况返回不同格式
    if (hours === 0) {
        return `${remainingMinutes.toFixed(0)}分钟`
    } else if (remainingMinutes === 0) {
        return `${hours}小时`
    } else {
        return `${hours}小时${remainingMinutes.toFixed(0)}分钟`
    }
}

export async function get_update_time(name: string): Promise<string> {
    const client = await InitDBConnect()
    const updateTime_data = await client.db('liteweb').collection('update_time').findOne({ name: name })
    return updateTime_data ? String(updateTime_data.time) : '暂无更新时间'
}
