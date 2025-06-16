'use server'

import 'server-only'
import { MongoClient, ServerApiVersion } from 'mongodb'
import init_test from '@/test/main'

if (!process.env.DB_URI) {
    throw new Error('请在环境变量中设置 DB_URI')
}
const url = process.env.DB_URI
let cachedClient: MongoClient | null = null

export default async function init_connect() {
    if (cachedClient) {
        return cachedClient
    }

    try {
        const client = new MongoClient(url, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            },
        })
        // 连接到数据库服务器（从 v4.7 开始为可选）
        await client.connect()
        // 发送 ping 命令确认连接成功
        await client.db('liteweb').command({ ping: 1 })
        console.log('数据库连接成功！')
        if (process.env.NODE_ENV !== 'development' && process.env.NODE_ENV !== 'test') {
            console.log('当前不是开发或测试环境，跳过测试数据生成')
        } else {
            await init_test(client)
        }
        console.log('数据库初始化完成！')
        cachedClient = client
    } catch (error) {
        console.error('数据库连接失败:', error)
        throw error
    }
    return cachedClient
}
