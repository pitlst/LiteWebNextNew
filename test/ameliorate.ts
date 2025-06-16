'use server'

import 'server-only'
import log, { LogLevel } from '@/lib/logger'
import { MongoClient } from 'mongodb'

export default async function init_ameliorate(client: MongoClient) {
    try {
        const db = client.db('liteweb')

        const ameliorate_analysis_data = db.collection('ameliorate_analysis_data')
        await ameliorate_analysis_data.deleteMany({})

        log(LogLevel.INFO, '改善测试数据初始化成功！')
    } catch (error) {
        log(LogLevel.CRITICAL, '改善测试数据初始化失败:' + String(error || ''))
        throw error
    }
}
