'use server'

import 'server-only'
import chalk from 'chalk'
import { MongoClient } from 'mongodb'

export default async function init_ameliorate(client: MongoClient) {
    try {
        const ameliorate_analysis_data = client.db('liteweb').collection('ameliorate_analysis_data')
        await ameliorate_analysis_data.deleteMany({})

        console.log('改善测试数据初始化成功！')
    } catch (error) {
        console.error(chalk.red('改善测试数据初始化失败:', error))
        throw error
    }
}