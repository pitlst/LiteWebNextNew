'use server'

import 'server-only'
import { MongoClient } from 'mongodb'

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
export default async function initTestDatabase(client: MongoClient) {
    try {
        const db = client.db('liteweb')
        const update_time_collection = db.collection('update_time')
        await update_time_collection.deleteMany({})
        await update_time_collection.insertMany([
            {
                name: 'calibration_line',
                time: new Date().toLocaleString(),
            },
            {
                name: 'audit_analysis',
                time: new Date().toLocaleString(),
            },
            {
                name: 'interested_party_analysis',
                time: new Date().toLocaleString(),
            },
        ])

        const calibration_line_total_collection = db.collection('calibration_line_total_data')
        await calibration_line_total_collection.deleteMany({})
        await calibration_line_total_collection.insertMany([
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

        const calibration_line_group_collection = db.collection('calibration_line_group_data')
        await calibration_line_group_collection.deleteMany({})
        await calibration_line_group_collection.insertMany([
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

        const pie_chart_error_collection = db.collection('pie_chart_error_data')
        await pie_chart_error_collection.deleteMany({})
        await pie_chart_error_collection.insertMany([
            {
                index: 0,
                title: '异常原因整体组成',
                data: [
                    {
                        label: '来料',
                        value: 1,
                    },
                    {
                        label: '工艺',
                        value: 2,
                    },
                    {
                        label: '下线',
                        value: 7,
                    },
                    {
                        label: '布线',
                        value: 7,
                    },
                    {
                        label: '接线',
                        value: 7,
                    },
                    {
                        label: '计划下达',
                        value: 7,
                    },
                    {
                        label: '后续工序',
                        value: 7,
                    },
                    {
                        label: '变更执行',
                        value: 7,
                    },
                ],
            },
            {
                index: 1,
                title: '来料导致的异常',
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
                    {
                        label: '接口失配',
                        value: 6,
                    },
                ],
            },
            {
                index: 2,
                title: '下线导致的异常',
                data: [],
            },
            {
                index: 3,
                title: '接线导致的异常',
                data: [],
            },
            {
                index: 4,
                title: '布线导致的异常',
                data: [],
            },
            {
                index: 5,
                title: '计划下达导致的异常',
                data: [],
            },
            {
                index: 6,
                title: '后续工序导致的异常',
                data: [],
            },
            {
                index: 7,
                title: '变更执行导致的异常',
                data: [],
            },
            {
                index: 8,
                title: '工艺导致的异常',
                data: [],
            },
            {
                index: 9,
                title: '设计导致的异常',
                data: [],
            },
        ])

        const custom_pie_no_error_collection = db.collection('custom_pie_no_error_data')
        await custom_pie_no_error_collection.deleteMany({})
        await custom_pie_no_error_collection.insertMany([
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

        const custom_dia_interested_party_node_collection = db.collection('custom_dia_interested_party_node_data')
        await custom_dia_interested_party_node_collection.deleteMany({})
        await custom_dia_interested_party_node_collection.insertMany([
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

        const custom_dia_interested_party_link_collection = db.collection('custom_dia_interested_party_link_data')
        await custom_dia_interested_party_link_collection.deleteMany({})
        await custom_dia_interested_party_link_collection.insertMany([
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

        const home_link_collection = db.collection('home_link_data')
        await home_link_collection.deleteMany({})
        await home_link_collection.insertMany([
            {
                title: '城轨事业部首页',
                type: 'navigator',
                url: 'http://10.24.5.13:8090/',
                description: '城轨事业部的首页，有着大部分的常用网址',
            },
            {
                title: '公司内网首页',
                type: 'navigator',
                url: 'http://web.crrczelc.cc/',
                description: '公司首页',
            },
            {
                title: '机车事业部首页',
                type: 'navigator',
                url: 'http://10.29.31.234/',
                description: '机车事业部',
            },
            {
                title: '电气设备分公司首页',
                type: 'navigator',
                url: 'http://10.29.51.2/wy/',
                description: '电气设备分公司',
            },
            {
                title: '中车主数据管理平台',
                type: 'office',
                url: 'http://10.24.1.22:7001/txiservlet',
                description: '中车主数据管理平台',
            },
            {
                title: '远程邮箱',
                type: 'office',
                url: 'https://mail.crrczelc.cc/',
                description: '远程邮箱、显示outlook的那一个',
            },
            {
                title: '中车邮箱',
                type: 'office',
                url: 'http://mail.crrcgc.cc/',
                description: '这是中车集团的邮箱',
            },
            {
                title: 'OA系统-旧',
                type: 'office',
                url: 'http://oa.zj.crrcgc.cc:8081/',
                description: '这是最近更换的OA系统，目前仅供查询历史OA',
            },
            {
                title: 'OA系统-更旧(IE浏览器)',
                type: 'office',
                url: 'http://oa.zelc.csr.com/indishare/office.nsf/(frame)/frame',
                description: '最老的OA系统，需要IE浏览器访问，仅供查询历史OA',
            },
            {
                title: '信创OA系统',
                type: 'office',
                url: 'http://coa.crrcgc.cc/login/',
                description: '这是目前正在使用的OA系统,正式名称为中车办公平台',
            },
            {
                title: 'S-HR系统',
                type: 'office',
                url: 'http://10.24.204.65:8080/eassso/login?service=http%3A%2F%2F10.24.204.65%3A8080%2Fshr%2F',
                description: '注意S-HR系统仅支持中车浏览器，在登陆时需要注意',
            },
            {
                title: '考勤系统',
                type: 'office',
                url: 'http://10.24.7.47:8010/Account/SignIn',
                description: '维护考勤信息、做倒休、加班、补打卡和出差考勤维护在这里',
            },
            {
                title: '智慧财务平台',
                type: 'office',
                url: 'http://10.24.204.241/index.action',
                description: '报销相关的财务流程在这里走',
            },
            {
                title: '云文档',
                type: 'office',
                url: 'https://ecm.crrczelc.com.cn/api/auth/login?returnUrl=https%3A%2F%2Fecm.crrczelc.com.cn%2Findex.html',
                description: 'ECM文档云，一些跨部门沟通的文件在这里传递',
            },
            {
                title: '金蝶云苍穹-正式库',
                type: 'business',
                url: 'http://bim.crrczelc.com.cn:18110/idp/authcenter/ActionAuthChain?entityId=supplierPortal',
                description: '公司的统一创新平台',
            },
            {
                title: '金蝶云苍穹-测试库',
                type: 'business',
                url: 'https://cangqiong.crrczelc.com.cn:6888/ierp/login.html',
                description: '金蝶云苍穹的测试平台',
            },
            {
                title: '耗材柜管理平台',
                type: 'business',
                url: 'http://10.24.5.21:18810/login?redirect=/dashboard/analysis',
                description: '耗材柜管理平台',
            },
            {
                title: '智能立库管理系统',
                type: 'business',
                url: 'http://10.24.5.21:18814/login?redirect=/dashboard/analysis',
                description: '智能立库管理系统',
            },
            {
                title: 'MES系统',
                type: 'business',
                url: 'http://mesty.zelc.crrc.cc:8330/uma-unimax-web/login.action',
                description: '车间工序作业计划、异常等现场作业相关的业务在这里',
            },
            {
                title: 'NCR系统',
                type: 'business',
                url: 'http://yzj.crrczelc.com.cn:6889/ncr/page/html/login.html',
                description: '不合格品管理系统，处理产品质量问题的系统',
            },
            {
                title: 'QMS系统',
                type: 'business',
                url: 'http://10.24.7.136:8888/qms2/login',
                description: '质量相关的业务在这里',
            },
            {
                title: 'WMS系统',
                type: 'business',
                url: 'http://10.24.1.26/mainFrame.html',
                description: '物料和物流相关的业务在这里',
            },
            {
                title: '事业部报修系统',
                type: 'business',
                url: 'http://10.24.1.19:8080/bx/',
                description: '事业部门、灯等相关物品坏了在这里报修',
            },
            {
                title: '设备全生命周期数字化管理平台',
                type: 'business',
                url: 'http://10.24.1.97/zelc-repairing/#/login',
                description: '设备维修、保养等设备全生命周期管理相关的业务在这里',
            },
            {
                title: '生产辅助系统网页版',
                type: 'business',
                url: 'http://10.24.5.154/navn.html',
                description: '生产辅助系统的网页版本',
            },
            {
                title: '数字化项目管理平台',
                type: 'business',
                url: 'http://10.24.204.209/#/Login',
                description: '数字化项目管理平台，用于管理和跟踪公司的数字化转型项目',
            },
            {
                title: '条码系统',
                type: 'business',
                url: 'http://172.18.1.13:6888/barcode/common.jdo?method=forwardToPage&pageName=EASlogin',
                description: '条码系统是用于管理和打印产品条码的系统，主要用于生产过程中的物料和产品追溯',
            },
            {
                title: '工艺研发申报',
                type: 'business',
                url: 'http://10.24.205.25/ProjectHome',
                description: '工艺研发申报系统，用于管理和申报工艺研发相关的项目',
            },
            {
                title: 'EBPM流程管理平台',
                type: 'business',
                url: 'http://10.24.206.233/jz8001011A/index.do',
                description: '画流程的地方',
            },
            {
                title: 'ESB系统',
                type: 'tools',
                url: 'http://esb.zelc.crrc.cc/ESBAdmin/login.action',
                description: '',
            },
            {
                title: '中车安全大厦',
                type: 'tools',
                url: 'https://safety.crrcgc.cc',
                description: '中车集团的系统，重置密码请报IT运维或者联系质保部',
            },
            {
                title: 'IT运维',
                type: 'tools',
                url: 'http://10.24.1.212:9100/cas/login?service=http%3A%2F%2F10.24.1.211%3A8080%2FTecWF%2Fj_spring_cas_security_check%3Bjsessionid%3DAD586A68C7C41006AFB8A07644F284A3',
                description: '如有系统问题可在这里填报IT运维，公司会有专人跟进',
            },
            {
                title: '知网',
                type: 'tools',
                url: 'http://cnki.crrcgc.cc/kns55/',
                description: '公司内网的知网，可以免费下载论文',
            },
            {
                title: '虚拟桌面管理',
                type: 'tools',
                url: 'http://10.24.30.103',
                description: '',
            },
            {
                title: '短信平台',
                type: 'tools',
                url: 'http://172.18.1.230/',
                description: '',
            },
            {
                title: 'EAS密码重置',
                type: 'tools',
                url: 'http://172.18.1.13:6888/barcode/common.jdo?method=forwardToPage&pageName=EASChangePSMain_PC',
                description: 'EAS系统密码不是域密码，重置请访问这里或者企业微信',
            },
            {
                title: '应知应会',
                type: 'tools',
                url: 'https://10.24.204.68:8888/lmsapp/#/Login?redirect=%2F',
                description: '应知应会考试平台，用于员工定期进行安全、质量等相关知识的考核',
            },
            {
                title: '城轨知识库-deepseek',
                type: 'other',
                url: 'http://10.24.108.38:8082/chat/VneGU11fGEK4DkY6',
                description: '这个为AI知识库、使用dify部署、模型由中车信息公司提供',
            },
            {
                title: '城轨知识库-文档',
                type: 'other',
                url: 'http://10.24.5.13:10086/',
                description: '城轨相关的规章制度、质量案例、工艺规范等文件',
            },
            {
                title: '中车信息deepseek',
                type: 'other',
                url: 'http://deepseek.crrcgc.cc/',
                description: '中车信息公司的openwebui',
            },
            {
                title: '公司dify知识库后台',
                type: 'other',
                url: 'https://10.24.108.38:8081/',
                description: 'AI知识库',
            },
            {
                title: '公司Gitlab',
                type: 'other',
                url: 'http://10.24.207.201:2333/users/sign_in',
                description: '内网代码管理平台',
            },
            {
                title: '公司Gitlab',
                type: 'other',
                url: 'http://10.24.207.201:2333/users/sign_in',
                description: '内网代码管理平台',
            },
            {
                title: '数据治理平台-正式库',
                type: 'other',
                url: 'http://10.24.207.90:8768/portal',
                description: '公司数据管理和数据获取的平台',
            },
            {
                title: '数据治理平台-测试库',
                type: 'other',
                url: 'http://10.24.109.7:8768/cas/login?service=http%3A%2F%2F10.24.109.7%3A8768%2Fportal%2FpageView%3FpageId%3Dindex%26console%3D1',
                description: '公司数据管理和数据获取的平台，测试用',
            },
        ])
        
        const interested_party_data_table_collection = db.collection('interested_party_data_table')
        await interested_party_data_table_collection.deleteMany({})
        await interested_party_data_table_collection.insertMany([

        ])


        console.log('测试数据初始化成功！')
    } catch (error) {
        console.error('测试数据初始化失败:', error)
        throw error
    }
}
