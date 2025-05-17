'use server'

import 'server-only'
import { MongoClient, ServerApiVersion } from 'mongodb'

if (!process.env.DB_URI) {
    throw new Error('请在环境变量中设置 DB_URI')
}
const url = process.env.DB_URI

// 使用全局变量来缓存数据库连接
// 主要是开发时使用，避免每次请求都连接数据库
declare global {
    var isConnected: boolean | undefined
    var client: MongoClient | undefined
}


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
export async function InitDBConnect() {
    const client = global.client || new MongoClient(url, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    })

    if (!global.isConnected) {
        try {
            // 连接到数据库服务器（从 v4.7 开始为可选）
            await client.connect();
            // 发送 ping 命令确认连接成功
            await client.db("admin").command({ ping: 1 });
            console.log("数据库连接成功！")
            // 创建默认数据库
            await client.db("liteweb").command({ ping: 1 });
            if (process.env.NODE_ENV !== 'development' && process.env.NODE_ENV !== 'test') {
                console.log('当前不是开发或测试环境，跳过测试数据生成');
            }
            else {
                await initTestDatabase(client);
            }
            console.log("数据库初始化完成！")
        } catch (error) {
            console.error('数据库连接失败:', error)
            throw error
        } finally {
            // 确保在完成/出错时关闭客户端连接
            await client.close();
        }
        global.isConnected = true
        global.client = client
    }
    return client
}


/**
 * 初始化测试环境的数据库集合和测试数据
 * 
 * @async
 * @function initTestDatabase
 * @description
 * 该函数用于在开发或测试环境中初始化数据库集合和测试数据。
 * 只在 NODE_ENV 为 'development' 或 'test' 时执行。
 * 
 * @throws {Error} 当数据库操作失败时抛出错误
 */
export async function initTestDatabase(client: MongoClient) {
    try {
        const db = client.db("liteweb");
        const updateTimeCollection = db.collection("update_time");
        await updateTimeCollection.deleteMany({});
        await updateTimeCollection.insertMany([
            { name: "data_refresh", time: new Date().toLocaleString() },
            { name: "system_status", time: new Date().toLocaleString() }
        ]);

        const statusCollection = db.collection("system_status");
        await statusCollection.deleteMany({});
        await statusCollection.insertMany([
            {
                name: "cpu_usage",
                value: 45,
                trend: true,
                updated_at: new Date()
            },
            {
                name: "memory_usage",
                value: 60,
                trend: false,
                updated_at: new Date()
            }
        ]);

        console.log('测试数据初始化成功！');
    } catch (error) {
        console.error('测试数据初始化失败:', error);
        throw error;
    }
}