'use server'

import 'server-only'
import { MongoClient } from 'mongodb'
import log, { LogLevel } from '@/lib/logger'

export default async function init_link_page(client: MongoClient) {
    try {
        const db = client.db('liteweb')

        const link_page_data = db.collection('link_page_data')
        await link_page_data.deleteMany({})
        await link_page_data.insertMany([
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

        log(LogLevel.INFO, '改善测试数据初始化成功！')
    } catch (error) {
        log(LogLevel.CRITICAL, '改善测试数据初始化失败:' + String(error || ''))
        throw error
    }
}