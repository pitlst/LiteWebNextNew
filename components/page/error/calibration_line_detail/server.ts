'use server'

import InitDBConnect from '@/components/data/db'
import type { DataTableProps } from './client'


export async function GetTableData() {
    const client = await InitDBConnect()
    const db = client.db('liteweb')
    const collection = db.collection('calibration_line_detail_data')
    const result = await collection.find({}, { projection: { _id: 0 } }).toArray()
    const res_data: DataTableProps[] = result.map((item) => {
        return {
            单据编码: String(item.单据编码 || ''),
            发起单单据状态: String(item.发起单单据状态 || ''),
            处理单单据状态: String(item.处理单单据状态 || ''),
            责任单位: String(item.责任单位 || ''),
            构型分类: String(item.构型分类 || ''),
            项目名称: String(item.项目名称 || ''),
            失效原因_一级: String(item.失效原因_一级 || ''),
            失效原因_二级: String(item.失效原因_二级 || ''),
            响应计算起始时间: String(item.响应计算起始时间 || ''),
            预计及时响应时间: String(item.预计及时响应时间 || ''),
            实际响应时间: String(item.实际响应时间 || ''),
            响应用时: String(item.响应用时 || ''),
            是否及时响应: String(item.是否及时响应 || ''),
            响应所属组室: String(item.响应所属组室 || ''),
            一次诊断计算起始时间: String(item.一次诊断计算起始时间 || ''),
            预计及时一次诊断时间: String(item.预计及时一次诊断时间 || ''),
            实际一次诊断时间: String(item.实际一次诊断时间 || ''),
            一次诊断用时: String(item.一次诊断用时 || ''),
            是否及时一次诊断: String(item.是否及时一次诊断 || ''),
            一次诊断所属组室: String(item.一次诊断所属组室 || ''),
            二次诊断计算起始时间: String(item.二次诊断计算起始时间 || ''),
            预计及时二次诊断时间: String(item.预计及时二次诊断时间 || ''),
            实际二次诊断时间: String(item.实际二次诊断时间 || ''),
            二次诊断用时: String(item.二次诊断用时 || ''),
            是否及时二次诊断: String(item.是否及时二次诊断 || ''),
            二次诊断所属组室: String(item.二次诊断所属组室 || ''),
            返工计算起始时间: String(item.返工计算起始时间 || ''),
            预计及时返工时间: String(item.预计及时返工时间 || ''),
            实际返工时间: String(item.实际返工时间 || ''),
            返工用时: String(item.返工用时 || ''),
            是否及时返工: String(item.是否及时返工 || ''),
            返工所属组室: String(item.返工所属组室 || ''),
            验收计算起始时间: String(item.验收计算起始时间 || ''),
            预计及时验收时间: String(item.预计及时验收时间 || ''),
            实际验收时间: String(item.实际验收时间 || ''),
            验收用时: String(item.验收用时 || ''),
            是否及时验收: String(item.是否及时验收 || ''),
            验收所属组室: String(item.验收所属组室 || ''),
        }
    })
    return res_data
}