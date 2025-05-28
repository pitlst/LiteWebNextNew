'use server'

import 'server-only'
import { MongoClient, ServerApiVersion } from 'mongodb'
import initTestDatabase from '@/components/data/test_data'


if (!process.env.DB_URI) {
    throw new Error('请在环境变量中设置 DB_URI')
}
const url = process.env.DB_URI
let cachedClient: MongoClient | null = null;



/**
 * 初始化并获取 MongoDB 数据库连接
 * 
 * @async
 * @function DBConnectInit
 * @description
 * 该函数负责管理与 MongoDB 数据库的连接。它使用全局变量来缓存连接实例，
 * 避免在每次调用时创建新的连接。函数会检查现有连接，如果不存在则创建新连接。
 * 
 * @returns {Promise<MongoClient>} 返回 MongoDB 客户端实例
 * 
 * @throws {Error} 当数据库连接失败时抛出错误
 * 
 * @example
 * ```ts
 * const client = await DBConnectInit();
 * const db = client.db("your_database");
 * ```
 */
export default async function InitDBConnect() {
    if (cachedClient) {
        return cachedClient;
    }

    try {
        const client = new MongoClient(url, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        });
        // 连接到数据库服务器（从 v4.7 开始为可选）
        await client.connect();
        // 发送 ping 命令确认连接成功
        await client.db("liteweb").command({ ping: 1 });
        console.log("数据库连接成功！")
        if (process.env.NODE_ENV !== 'development' && process.env.NODE_ENV !== 'test') {
            console.log('当前不是开发或测试环境，跳过测试数据生成');
        }
        // else {
        //     await initTestDatabase(client);
        // }
        console.log("数据库初始化完成！")
        cachedClient = client
    } catch (error) {
        console.error('数据库连接失败:', error)
        throw error
    }
    return cachedClient
}


