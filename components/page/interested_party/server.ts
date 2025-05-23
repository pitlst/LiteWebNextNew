'use server'

import InitDBConnect from '@/components/data/db'
import type { CustomDiagramProps } from '@/components/CustomDiagram'
import type { HeadCardProps, DataTableProps } from './client'
import type { NormLineChartProps } from '@/components/NormLineChart'

export async function GetDiagramData() {
    const client = await InitDBConnect()
    const db = client.db('liteweb')
    const node_collection = db.collection('custom_dia_interested_party_node_data')
    const node_result = await node_collection.find({}, { projection: { _id: 0 } }).toArray()
    const links_collection = db.collection('custom_dia_interested_party_link_data')
    const links_result = await links_collection.find({}, { projection: { _id: 0 } }).toArray()
    const data: CustomDiagramProps = {
        nodes: node_result.map((item: any) => {
            return {
                name: String(item.name || ''),
            }
        }),
        links: links_result.map((item: any) => {
            return {
                source: String(item.source || ''),
                target: String(item.target || ''),
                value: Number(item.value || ''),
            }
        }),
    }
    return data
}

export async function GetHeadCardData() {
    const client = await InitDBConnect()
    const db = client.db('liteweb')
    const collection = db.collection('interested_party_head_card_data')
    const result = await collection.find({}, { projection: { _id: 0 } }).toArray()
    const data: HeadCardProps[] = result.map((item: any) => {
        return {
            title: String(item.title || ''),
            value: Number(item.value || 0),
        }
    })
    return data
}

export async function GetDatatimeData() {
    const client = await InitDBConnect()
    const db = client.db('liteweb')
    const collection = db.collection('interested_party_datatime_data')
    const result = await collection.find({}, { projection: { _id: 0 } }).toArray()
    return result as any as NormLineChartProps[]
}

export async function GetTaleData() {
    const client = await InitDBConnect()
    const db = client.db('liteweb')
    const collection = db.collection('interested_party_detail_data')
    const result = await collection.find({}, { projection: { _id: 0 } }).toArray()
    const res_data: DataTableProps[] = result.map((item) => {
        return {
            id: Number(item.id || 0),
            修改时间: String(item.修改时间 || ''),
            申请人姓名: String(item.申请人姓名 || ''),
            申请人身份证号: String(item.申请人身份证号 || ''),
            申请人联系电话: String(item.申请人联系电话 || ''),
            公司名称: String(item.公司名称 || ''),
            是否签订过安全承诺书: String(item.是否签订过安全承诺书 || ''),
            随行人数: Number(item.随行人数 || 0),
            是否为作业负责人: String(item.是否为作业负责人 || ''),
            单据状态: String(item.单据状态 || ''),
            作业状态: String(item.作业状态 || ''),
            申请作业时间: String(item.申请作业时间 || ''),
            计划开工日期: String(item.计划开工日期 || ''),
            计划开工上下午: String(item.计划开工上下午 || ''),
            计划完工日期: String(item.计划完工日期 || ''),
            计划完工上下午: String(item.计划完工上下午 || ''),
            作业地点: String(item.作业地点 || ''),
            作业类型: String(item.作业类型 || ''),
            具体作业内容: String(item.具体作业内容 || ''),
            项目名称: String(item.项目名称 || ''),
            车号: String(item.车号 || ''),
            台位车道: String(item.台位车道 || ''),
            作业依据: String(item.作业依据 || ''),
            NCR开口项设计变更编号: String(item.NCR开口项设计变更编号 || ''),
            作业危险性: String(item.作业危险性 || ''),
            是否危险作业: String(item.是否危险作业 || ''),
            是否需要监护人: String(item.是否需要监护人 || ''),
            是否需要作业证: String(item.是否需要作业证 || ''),
            是否携带危化品: String(item.是否携带危化品 || ''),
            携带危化品类型: String(item.携带危化品类型 || ''),
            事业部对接人: String(item.事业部对接人 || ''),
            事业部对接人姓名: String(item.事业部对接人姓名 || ''),
            事业部对接人部门: String(item.事业部对接人部门 || ''),
            事业部对接人工号: String(item.事业部对接人工号 || ''),
        }
    })
    return res_data
}
