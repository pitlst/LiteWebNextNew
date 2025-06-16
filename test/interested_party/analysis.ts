'use server'

import 'server-only'
import log, { LogLevel } from '@/lib/logger'
import { MongoClient } from 'mongodb'

export default async function init_interested_party_analysis(client: MongoClient) {
    try {
        const db = client.db('liteweb')

        const interested_party_node_data = db.collection('interested_party_node_data')
        await interested_party_node_data.deleteMany({})
        await interested_party_node_data.insertMany([
            {
                name: '腾讯外包-入职',
            },
            {
                name: '腾讯外包-离职',
            },
            {
                name: '阿里外包-入职',
            },
            {
                name: '阿里外包-离职',
            },
            {
                name: '百度外包-入职',
            },
            {
                name: '百度外包-离职',
            },
            {
                name: '技术部',
            },
            {
                name: '产品部',
            },
            {
                name: '运营部',
            },
            {
                name: '市场部',
            },
            {
                name: '人力资源部',
            },
        ])

        const interested_party_links_data = db.collection('interested_party_links_data')
        await interested_party_links_data.deleteMany({})
        await interested_party_links_data.insertMany([
            {
                source: '腾讯外包-入职',
                target: '技术部',
                value: 50,
            },
            {
                source: '腾讯外包-入职',
                target: '产品部',
                value: 20,
            },
            {
                source: '腾讯外包-离职',
                target: '技术部',
                value: 15,
            },
            {
                source: '腾讯外包-离职',
                target: '产品部',
                value: 5,
            },
            {
                source: '阿里外包-入职',
                target: '技术部',
                value: 40,
            },
            {
                source: '阿里外包-入职',
                target: '运营部',
                value: 30,
            },
            {
                source: '阿里外包-入职',
                target: '市场部',
                value: 15,
            },
            {
                source: '阿里外包-离职',
                target: '技术部',
                value: 10,
            },
            {
                source: '阿里外包-离职',
                target: '运营部',
                value: 8,
            },
            {
                source: '阿里外包-离职',
                target: '市场部',
                value: 5,
            },
            {
                source: '百度外包-入职',
                target: '技术部',
                value: 35,
            },
            {
                source: '百度外包-入职',
                target: '人力资源部',
                value: 10,
            },
            {
                source: '百度外包-入职',
                target: '运营部',
                value: 25,
            },
            {
                source: '百度外包-离职',
                target: '技术部',
                value: 12,
            },
            {
                source: '百度外包-离职',
                target: '人力资源部',
                value: 3,
            },
            {
                source: '百度外包-离职',
                target: '运营部',
                value: 8,
            },
        ])

        const interested_party_head_card_data = db.collection('interested_party_head_card_data')
        await interested_party_head_card_data.deleteMany({})
        await interested_party_head_card_data.insertMany([
            {
                title: '当前相关方进入事业部人数',
                value: 100,
            },
            {
                title: '当前相关方进入车间人数',
                value: 0,
            },
            {
                title: '当前相关方临时外出人数',
                value: 0,
            },
        ])

        const interested_party_datatime_data = db.collection('interested_party_datatime_data')
        await interested_party_datatime_data.deleteMany({})
        await interested_party_datatime_data.insertMany([
            {
                key: 13277,
                trend: true,
                label: "+35%",
                series: [
                    [300, 900, 600, 1200, 1500, 1800, 2400, 2100, 2700, 3000, 1800, 3300],
                    [500, 900, 700, 1400, 1100, 1700, 2300, 2000, 2600, 2900, 2300, 3200],
                    [1000, 1500, 1200, 1700, 1300, 2000, 2400, 2200, 2600, 2800, 2500, 3000],
                ],
            },
            {
                key: 13277,
                trend: true,
                label: "+35%",
                series: [
                    [
                        300, 900, 600, 1200, 1500, 1800, 2400, 2100, 2700, 3000, 1800, 3300, 3600, 3900, 4200, 4500, 3900, 4800, 5100, 5400, 4800,
                        5700, 6000, 6300, 6600, 6900, 7200, 7500, 7800, 8100,
                    ],
                    [
                        500, 900, 700, 1400, 1100, 1700, 2300, 2000, 2600, 2900, 2300, 3200, 3500, 3800, 4100, 4400, 2900, 4700, 5000, 5300, 5600,
                        5900, 6200, 6500, 5600, 6800, 7100, 7400, 7700, 8000,
                    ],
                    [
                        1000, 1500, 1200, 1700, 1300, 2000, 2400, 2200, 2600, 2800, 2500, 3000, 3400, 3700, 3200, 3900, 4100, 3500, 4300, 4500, 4000,
                        4700, 5000, 5200, 4800, 5400, 5600, 5900, 6100, 6300,
                    ],
                ],
            },
        ])

        const interested_party_center_data = db.collection('interested_party_center_data')
        await interested_party_center_data.deleteMany({})
        await interested_party_center_data.insertMany([
            {
                index: 0,
                title: '本月相关方工作危险源占比',
                data: [
                    {
                        label: '临边作业',
                        value: 12,
                    },
                    {
                        label: '金属切割作业',
                        value: 60,
                    },
                    {
                        label: '配合车辆静、动态调试作业',
                        value: 51,
                    },
                    {
                        label: '有限空间作业',
                        value: 10,
                    },
                    {
                        label: '交叉作业',
                        value: 26,
                    },
                    {
                        label: '临时用电作业',
                        value: 28,
                    },
                    {
                        label: '登高作业',
                        value: 1,
                    },
                    {
                        label: '危化品使用',
                        value: 1,
                    },
                ],
            },
            {
                index: 1,
                title: '本月相关方对接部门占比',
                data: [
                    {
                        label: '质量技术部',
                        value: 60,
                    },
                    {
                        label: '总成车间',
                        value: 68,
                    },
                    {
                        label: '交车车间',
                        value: 1,
                    },
                    {
                        label: '项目工程部',
                        value: 131,
                    },
                ],
            },
            {
                index: 2,
                title: '本月相关方作业依据占比',
                data: [
                    {
                        label: '开口项',
                        value: 57,
                    },
                    {
                        label: 'NCR',
                        value: 60,
                    },
                    {
                        label: '设计变更',
                        value: 10,
                    },
                ],
            },
            {
                index: 3,
                title: '本月相关方作业地点分布',
                data: [
                    {
                        label: '总成车间其他区域',
                        value: 40,
                    },
                    {
                        label: '总成所属交车落车调车区域',
                        value: 45,
                    },
                    {
                        label: '新调试',
                        value: 44,
                    },
                ],
            },
        ])

        const interested_party_type_data = db.collection('interested_party_type_data')
        await interested_party_type_data.deleteMany({})
        await interested_party_type_data.insertMany([
            {
                name: '工装工具相关作业',
                children: [
                    {
                        name: '工装售后维护',
                        value: 10,
                    },
                    {
                        name: '工装送货',
                        value: 7,
                    },
                ],
            },
            {
                name: '基建施工',
                children: [
                    {
                        name: '建筑物及附属设施维护维修',
                        value: 8,
                    },
                ],
            },
            {
                name: '质量返工',
                children: [
                    {
                        name: '来料开口项返工',
                        value: 44,
                    },
                    {
                        name: 'PSI开口项返工',
                        value: 11,
                    },
                    {
                        name: 'Q30开口项返工',
                        value: 11,
                    },
                    {
                        name: '业主开口项返工',
                        value: 4,
                    },
                ],
            },
            {
                name: '现场调研',
                children: [
                    {
                        name: '设备设施调研',
                        value: 4,
                    },
                    {
                        name: '工艺技术调研',
                        value: 1,
                    },
                ],
            },
            {
                name: '配合调试作业',
                children: [
                    {
                        name: '配合静调作业',
                        value: 22,
                    },
                ],
            },
            {
                name: '家具维修及活动策划',
                children: [
                    {
                        name: '家具维修',
                        value: 1,
                    },
                ],
            },
        ])

        const interested_party_project_data = db.collection('interested_party_project_data')
        await interested_party_project_data.deleteMany({})
        await interested_party_project_data.insertMany([
            {
                name: '上海18',
                children: [
                    {
                        name: 'TC1',
                        value: 10,
                    },
                    {
                        name: 'TC2',
                        value: 7,
                    },
                ],
            },
            {
                name: '深圳16二期',
                children: [
                    {
                        name: 'Ts6',
                        value: 10,
                    },
                    {
                        name: 'TC2',
                        value: 7,
                    },
                ],
            },
            {
                name: 'CJ6三级修',
                children: [
                    {
                        name: '0702',
                        value: 10,
                    },
                ],
            },
            {
                name: 'NBML7',
                children: [
                    {
                        name: 'T36',
                        value: 10,
                    },
                    {
                        name: 'T35',
                        value: 10,
                    },
                    {
                        name: 'T34',
                        value: 10,
                    },
                ],
            },
        ])

        log(LogLevel.INFO, '相关方分析测试数据初始化成功！')
    } catch (error) {
        log(LogLevel.CRITICAL, '相关方分析测试数据初始化失败:' + String(error || ''))
        throw error
    }
}
