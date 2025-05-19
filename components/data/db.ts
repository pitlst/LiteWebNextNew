'use server'

import 'server-only'
import { MongoClient, ServerApiVersion } from 'mongodb'

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
export async function InitDBConnect() {
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
        else {
            await initTestDatabase(client);
        }
        console.log("数据库初始化完成！")
        cachedClient = client
    } catch (error) {
        console.error('数据库连接失败:', error)
        throw error
    }
    return cachedClient
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
        const update_time_collection = db.collection("update_time");
        await update_time_collection.deleteMany({});
        await update_time_collection.insertMany([
            {
                name: "calibration_line",
                time: new Date().toLocaleString()
            },
            {
                name: "audit_analysis",
                time: new Date().toLocaleString()
            }
        ]);

        const calibration_line_total_collection = db.collection("calibration_line_total_data");
        await calibration_line_total_collection.deleteMany({});
        await calibration_line_total_collection.insertMany([
            {
                index: 0,
                title: '未响应异常数',
                value: 12,
                request_time: 120,
                average_time: 203.86128747795414
            },
            {
                index: 1,
                title: "一次诊断进行中流程数",
                value: 0,
                request_time: 120,
                average_time: 2067.414374999999
            },
            {
                index: 2,
                title: "二次诊断进行中流程数",
                value: 28,
                request_time: 120,
                average_time: 119.9724358974359
            },
            {
                index: 3,
                title: "返工进行中流程数",
                value: 0,
                request_time: 120,
                average_time: 0
            },
            {
                index: 4,
                title: "验收进行中流程数",
                value: 0,
                request_time: 120,
                average_time: 0
            }
        ]);

        const calibration_line_group_collection = db.collection("calibration_line_group_data");
        await calibration_line_group_collection.deleteMany({});
        await calibration_line_group_collection.insertMany([
            {
                index: 0,
                title: "异常响应及时率",
                trend: false,
                group: [
                    {
                        name: "内装三工位",
                        ontime: 2,
                        total: 3
                    },
                    {
                        name: "电气工程设计组",
                        ontime: 0,
                        total: 3
                    },
                    {
                        name: "调试组",
                        ontime: 19,
                        total: 19
                    },
                    {
                        name: "电工四工位",
                        ontime: 38,
                        total: 54
                    },
                    {
                        name: "电工三工位",
                        ontime: 36,
                        total: 41
                    },
                    {
                        name: "校线一班",
                        ontime: 0,
                        total: 3
                    },
                    {
                        name: "质量保证组",
                        ontime: 7,
                        total: 7
                    },
                    {
                        name: "精益信息化组",
                        ontime: 2,
                        total: 2
                    },
                    {
                        name: "校线二班",
                        ontime: 0,
                        total: 6
                    },
                    {
                        name: "内装一工位",
                        ontime: 2,
                        total: 2
                    },
                    {
                        name: "电工一工位",
                        ontime: 36,
                        total: 61
                    }
                ]
            },
            {
                index: 1,
                title: "一次诊断及时率",
                trend: false,
                group: [
                    {
                        name: "校线二班",
                        ontime: 5,
                        total: 37
                    },
                    {
                        name: "校线一班",
                        ontime: 2,
                        total: 43
                    }
                ]
            },
            {
                index: 2,
                title: "二次诊断及时率",
                trend: false,
                group: [
                    {
                        name: "电气工程设计组",
                        ontime: 0,
                        total: 4
                    },
                    {
                        name: "总成进程组",
                        ontime: 0,
                        total: 19
                    },
                    {
                        name: "调试组",
                        ontime: 3,
                        total: 3
                    },
                    {
                        name: "质量保证组",
                        ontime: 1,
                        total: 1
                    },
                    {
                        name: "电工三工位",
                        ontime: 6,
                        total: 12
                    },
                    {
                        name: "校线一班",
                        ontime: 10,
                        total: 10
                    },
                    {
                        name: "电工四工位",
                        ontime: 4,
                        total: 5
                    },
                    {
                        name: "电气组",
                        ontime: 2,
                        total: 2
                    },
                    {
                        name: "电工一工位",
                        ontime: 20,
                        total: 24
                    }
                ]
            },
            {
                index: 3,
                title: "返工及时率",
                trend: true,
                group: [
                    {
                        name: "校线二班",
                        ontime: 13,
                        total: 13
                    },
                    {
                        name: "校线一班",
                        ontime: 39,
                        total: 39
                    }
                ]
            },
            {
                index: 4,
                title: "验收及时率",
                trend: true,
                group: [
                    {
                        name: "校线二班",
                        ontime: 13,
                        total: 13
                    },
                    {
                        name: "校线一班",
                        ontime: 39,
                        total: 39
                    }
                ]
            }
        ])

        const pie_chart_error_collection = db.collection("pie_chart_error_data");
        await pie_chart_error_collection.deleteMany({});
        await pie_chart_error_collection.insertMany([
            {
                index: 0,
                title: "异常原因整体组成",
                data: [
                    {
                        label: "来料",
                        value: 1
                    },
                    {
                        label: "工艺",
                        value: 2
                    },
                    {
                        label: "下线",
                        value: 7
                    },
                    {
                        label: "布线",
                        value: 7
                    },
                    {
                        label: "接线",
                        value: 7
                    },
                    {
                        label: "计划下达",
                        value: 7
                    },
                    {
                        label: "后续工序",
                        value: 7
                    },
                    {
                        label: "变更执行",
                        value: 7
                    },
                ]
            },
            {
                index: 1,
                title: "来料导致的异常",
                data: [
                    {
                        label: "松动",
                        value: 1
                    },
                    {
                        label: "漏导体",
                        value: 2
                    },
                    {
                        label: "断裂",
                        value: 1
                    },
                    {
                        label: "接口失配",
                        value: 6
                    },
                ]
            },
            {
                index: 2,
                title: "下线导致的异常",
                data: []
            },
            {
                index: 3,
                title: "接线导致的异常",
                data: []
            },
            {
                index: 4,
                title: "布线导致的异常",
                data: []
            },
            {
                index: 5,
                title: "计划下达导致的异常",
                data: []
            },
            {
                index: 6,
                title: "后续工序导致的异常",
                data: []
            },
            {
                index: 7,
                title: "变更执行导致的异常",
                data: []
            },
            {
                index: 8,
                title: "工艺导致的异常",
                data: []
            },
            {
                index: 9,
                title: "设计导致的异常",
                data: []
            }
        ])

        const pie_chart_no_error_collection = db.collection("pie_chart_no_error_data");
        await pie_chart_no_error_collection.deleteMany({});
        await pie_chart_no_error_collection.insertMany([
            {
                index: 0,
                title: "本月异常构型组成",
                data: [
                    {
                        label: "线号",
                        value: 12
                    },
                    {
                        label: " ",
                        value: 60
                    },
                    {
                        label: "终端",
                        value: 51
                    },
                    {
                        label: "插芯",
                        value: 10
                    },
                    {
                        label: "标签",
                        value: 26
                    },
                    {
                        label: "电缆",
                        value: 28
                    },
                    {
                        label: "扎带",
                        value: 1
                    }
                ]
            },
            {
                index: 1,
                title: "本月异常项目占比",
                data: [
                    {
                        label: "SML1EXP4G",
                        value: 1
                    },
                    {
                        label: "MMLRVS2",
                        value: 68
                    },
                    {
                        label: "CSL6",
                        value: 1
                    },
                    {
                        label: "SML18EXP",
                        value: 131
                    }
                ]
            },
            {
                index: 2,
                title: "本月异常责任单位占比",
                data: [
                    {
                        label: "制造班组",
                        value: 57
                    },
                    {
                        label: " ",
                        value: 60
                    },
                    {
                        label: "供应商",
                        value: 10
                    },
                    {
                        label: "机车事业部管线班",
                        value: 10
                    },
                    {
                        label: "电气工艺",
                        value: 15
                    },
                    {
                        label: "物流",
                        value: 2
                    },
                    {
                        label: "默认",
                        value: 4
                    },
                    {
                        label: "项目工程部",
                        value: 2
                    },
                    {
                        label: "无",
                        value: 2
                    },
                    {
                        label: "项目",
                        value: 4
                    },
                    {
                        label: "设计",
                        value: 22
                    }
                ]
            }
        ]);

        console.log('测试数据初始化成功！');
    } catch (error) {
        console.error('测试数据初始化失败:', error);
        throw error;
    }
}