'use server'

import 'server-only'
import log, { LogLevel } from '@/lib/logger'
import { MongoClient } from 'mongodb'

export default async function init_calibration_line_analysis(client: MongoClient) {
    try {
        const db = client.db('liteweb')

        const calibration_line_total_data = db.collection('calibration_line_total_data')
        await calibration_line_total_data.deleteMany({})
        await calibration_line_total_data.insertMany([
            {
                index: 0,
                title: '未响应异常数',
                value: 12,
                request_time: 120,
                average_time: 203.86128747795414,
            },
            {
                index: 1,
                title: '一次诊断进行中流程数',
                value: 0,
                request_time: 120,
                average_time: 2067.414374999999,
            },
            {
                index: 2,
                title: '二次诊断进行中流程数',
                value: 28,
                request_time: 120,
                average_time: 119.9724358974359,
            },
            {
                index: 3,
                title: '返工进行中流程数',
                value: 0,
                request_time: 120,
                average_time: 0,
            },
            {
                index: 4,
                title: '验收进行中流程数',
                value: 0,
                request_time: 120,
                average_time: 0,
            },
        ])

        const calibration_line_group_data = db.collection('calibration_line_group_data')
        await calibration_line_group_data.deleteMany({})
        await calibration_line_group_data.insertMany([
            {
                index: 0,
                title: '异常响应及时率',
                trend: false,
                group: [
                    {
                        name: '内装三工位',
                        ontime: 2,
                        total: 3,
                    },
                    {
                        name: '电气工程设计组',
                        ontime: 0,
                        total: 3,
                    },
                    {
                        name: '调试组',
                        ontime: 19,
                        total: 19,
                    },
                    {
                        name: '电工四工位',
                        ontime: 38,
                        total: 54,
                    },
                    {
                        name: '电工三工位',
                        ontime: 36,
                        total: 41,
                    },
                    {
                        name: '校线一班',
                        ontime: 0,
                        total: 3,
                    },
                    {
                        name: '质量保证组',
                        ontime: 7,
                        total: 7,
                    },
                    {
                        name: '精益信息化组',
                        ontime: 2,
                        total: 2,
                    },
                    {
                        name: '校线二班',
                        ontime: 0,
                        total: 6,
                    },
                    {
                        name: '内装一工位',
                        ontime: 2,
                        total: 2,
                    },
                    {
                        name: '电工一工位',
                        ontime: 36,
                        total: 61,
                    },
                ],
            },
            {
                index: 1,
                title: '一次诊断及时率',
                trend: false,
                group: [
                    {
                        name: '校线二班',
                        ontime: 5,
                        total: 37,
                    },
                    {
                        name: '校线一班',
                        ontime: 2,
                        total: 43,
                    },
                ],
            },
            {
                index: 2,
                title: '二次诊断及时率',
                trend: false,
                group: [
                    {
                        name: '电气工程设计组',
                        ontime: 0,
                        total: 4,
                    },
                    {
                        name: '总成进程组',
                        ontime: 0,
                        total: 19,
                    },
                    {
                        name: '调试组',
                        ontime: 3,
                        total: 3,
                    },
                    {
                        name: '质量保证组',
                        ontime: 1,
                        total: 1,
                    },
                    {
                        name: '电工三工位',
                        ontime: 6,
                        total: 12,
                    },
                    {
                        name: '校线一班',
                        ontime: 10,
                        total: 10,
                    },
                    {
                        name: '电工四工位',
                        ontime: 4,
                        total: 5,
                    },
                    {
                        name: '电气组',
                        ontime: 2,
                        total: 2,
                    },
                    {
                        name: '电工一工位',
                        ontime: 20,
                        total: 24,
                    },
                ],
            },
            {
                index: 3,
                title: '返工及时率',
                trend: true,
                group: [
                    {
                        name: '校线二班',
                        ontime: 13,
                        total: 13,
                    },
                    {
                        name: '校线一班',
                        ontime: 39,
                        total: 39,
                    },
                ],
            },
            {
                index: 4,
                title: '验收及时率',
                trend: true,
                group: [
                    {
                        name: '校线二班',
                        ontime: 13,
                        total: 13,
                    },
                    {
                        name: '校线一班',
                        ontime: 39,
                        total: 39,
                    },
                ],
            },
        ])

        const calibration_line_pie_reason_data = db.collection('calibration_line_pie_reason_data')
        await calibration_line_pie_reason_data.deleteMany({})
        await calibration_line_pie_reason_data.insertMany([
            {
                index: 0,
                title: '本月异常构型组成',
                data: [
                    {
                        label: '线号',
                        value: 12,
                    },
                    {
                        label: ' ',
                        value: 60,
                    },
                    {
                        label: '终端',
                        value: 51,
                    },
                    {
                        label: '插芯',
                        value: 10,
                    },
                    {
                        label: '标签',
                        value: 26,
                    },
                    {
                        label: '电缆',
                        value: 28,
                    },
                    {
                        label: '扎带',
                        value: 1,
                    },
                ],
            },
            {
                index: 1,
                title: '本月异常项目占比',
                data: [
                    {
                        label: 'SML1EXP4G',
                        value: 1,
                    },
                    {
                        label: 'MMLRVS2',
                        value: 68,
                    },
                    {
                        label: 'CSL6',
                        value: 1,
                    },
                    {
                        label: 'SML18EXP',
                        value: 131,
                    },
                ],
            },
            {
                index: 2,
                title: '本月异常责任单位占比',
                data: [
                    {
                        label: '制造班组',
                        value: 57,
                    },
                    {
                        label: ' ',
                        value: 60,
                    },
                    {
                        label: '供应商',
                        value: 10,
                    },
                    {
                        label: '机车事业部管线班',
                        value: 10,
                    },
                    {
                        label: '电气工艺',
                        value: 15,
                    },
                    {
                        label: '物流',
                        value: 2,
                    },
                    {
                        label: '默认',
                        value: 4,
                    },
                    {
                        label: '项目工程部',
                        value: 2,
                    },
                    {
                        label: '无',
                        value: 2,
                    },
                    {
                        label: '项目',
                        value: 4,
                    },
                    {
                        label: '设计',
                        value: 22,
                    },
                ],
            },
        ])

        const calibration_line_error_data = db.collection('calibration_line_error_data')
        await calibration_line_error_data.deleteMany({})
        await calibration_line_error_data.insertMany([
            {
                name: '来料',
                children: [
                    {
                        name: '松动',
                        value: 1,
                    },
                    {
                        name: '漏导体',
                        value: 2,
                    },
                    {
                        name: '断裂',
                        value: 1,
                    },
                    {
                        name: '接口失配',
                        value: 6,
                    },
                ],
            },
            {
                name: '工艺',
                children: [
                    {
                        name: '变更转化',
                        children: [
                            {
                                name: '接口失配',
                                children: [
                                    {
                                        name: '线号标签表',
                                        value: 1,
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                name: '下线',
                children: [
                    {
                        name: '标签打印',
                        children: [
                            {
                                name: '文字失真',
                                value: 1,
                            },
                        ],
                    },
                    {
                        name: '裁剪',
                        children: [
                            {
                                name: '超差',
                                value: 2,
                            },
                        ],
                    },
                    {
                        name: '线号打印',
                        children: [
                            {
                                name: '文字失真',
                                value: 9,
                            },
                        ],
                    },
                ],
            },
            {
                name: '布线',
                children: [
                    {
                        name: '绑扎',
                        children: [
                            {
                                name: '漏执行',
                                value: 4,
                            },
                            {
                                name: '超差',
                                children: [
                                    {
                                        name: '布线规范',
                                        value: 4,
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                name: '接线',
                children: [
                    {
                        name: '螺纹',
                        children: [
                            {
                                name: '紧固力不足',
                                value: 3,
                            },
                        ],
                    },
                    {
                        name: '收尾',
                        children: [
                            {
                                name: '用料不符图',
                                value: 2,
                            },
                            {
                                name: '漏执行',
                                value: 1,
                            },
                        ],
                    },
                    {
                        name: '嵌入',
                        children: [
                            {
                                name: '漏执行',
                                children: [
                                    {
                                        name: '',
                                        value: 2,
                                    },
                                    {
                                        name: '接线表',
                                        value: 1,
                                    },
                                ],
                            },
                            {
                                name: '点位不符图',
                                value: 7,
                            },
                        ],
                    },
                    {
                        name: '冷压',
                        children: [
                            {
                                name: '压接力不足',
                                value: 1,
                            },
                        ],
                    },
                    {
                        name: '剥护套',
                        children: [
                            {
                                name: '漏导体',
                                value: 1,
                            },
                        ],
                    },
                    {
                        name: '组插',
                        children: [
                            {
                                name: '松动',
                                value: 1,
                            },
                        ],
                    },
                    {
                        name: '剪线',
                        children: [
                            {
                                name: '超差',
                                value: 2,
                            },
                        ],
                    },
                    {
                        name: '收尾',
                        children: [
                            {
                                name: '粘贴破坏',
                                value: 1,
                            },
                        ],
                    },
                ],
            },
            {
                name: '计划下达',
                value: 1,
            },
            {
                name: '后续工序',
                children: [
                    {
                        name: '意外破坏',
                        value: 3,
                    },
                ],
            },
            {
                name: '变更执行',
                children: [
                    {
                        name: '漏执行',
                        value: 1,
                    },
                ],
            },
        ])

        const calibration_line_pie_error_data = db.collection('calibration_line_pie_error_data')
        await calibration_line_pie_error_data.deleteMany({})
        await calibration_line_pie_error_data.insertMany([
            {
                index: 0,
                title: '本月校线异常原因占比',
                data: [
                    {
                        label: '来料',
                        value: 100,
                    },
                    {
                        label: '下线',
                        value: 50,
                    },
                    {
                        label: '变更执行',
                        value: 25,
                    },
                ],
            },
            {
                index: 1,
                title: '来料导致的异常原因占比',
                data: [
                    {
                        label: '松动',
                        value: 1,
                    },
                    {
                        label: '漏导体',
                        value: 2,
                    },
                    {
                        label: '断裂',
                        value: 1,
                    },
                ],
            },
            {
                index: 2,
                title: '下线导致的异常原因占比',
                data: [
                    {
                        label: '标签打印',
                        value: 1,
                    },
                    {
                        label: '裁剪',
                        value: 2,
                    },
                    {
                        label: '线号打印',
                        value: 9,
                    },
                ],
            },
            {
                index: 3,
                title: '变更执行导致的异常原因占比',
                data: [
                    {
                        label: '漏执行',
                        value: 1,
                    },
                    {
                        label: '超差',
                        value: 2,
                    },
                    {
                        label: '用料不符图',
                        value: 2,
                    },
                ],
            },
        ])

        log(LogLevel.INFO, '校线异常分析测试数据初始化成功！')
    } catch (error) {
        log(LogLevel.CRITICAL, '校线异常分析测试数据初始化失败:' + String(error || ''))
        throw error
    }
}
