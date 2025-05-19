'use server'

import { InitDBConnect } from '@/components/data/db'
import { formatMinutes } from '@/components/utils'
import type { NormCardProps } from '@/components/NormCard'
import type { NormPieChartDataProps, NormPieChartProps } from '@/components/NormPieChart'
import type { NormChartGroupProps, NormChartProps } from '@/components/NormChart'
/**
 * 获取校线异常处理流程的统计数据
 *
 * @async
 * @description
 * 该函数从MongoDB数据库中获取校线异常处理流程的统计数据，并进行以下处理：
 * 1. 从数据库获取原始数据
 * 2. 验证数据格式并进行数组类型检查
 * 3. 按index排序并过滤空标题数据
 * 4. 转换数据为标准卡片格式，包含以下处理：
 *    - 计算时间趋势（平均用时与要求时限的比较）
 *    - 格式化时间显示
 *    - 生成卡片文本描述
 *
 * @returns {Promise<NormCardProps[]>} 返回一个Promise，解析为卡片属性数组，每个元素包含：
 * - title: string - 流程标题
 * - sub_title: string - 固定的副标题（流程平均用时 / 流程要求时限）
 * - sub_text: string - 格式化后的时间对比文本
 * - card_text: string - 时间评估结果（'平均用时良好' 或 '平均用时较长'）
 * - request_value: number - 要求时限值
 * - request_value_trend: boolean - 时间趋势（true表示良好，false表示较长）
 *
 * @throws {Error} 当数据库连接失败时可能抛出错误
 */

export async function GetCalibrationLineTotalData() {
    const client = await InitDBConnect()
    const db = client.db('liteweb')
    const collection = db.collection('calibration_line_total_data')
    let result = await collection.find({}).toArray()
    // 确保result是数组类型
    if (!Array.isArray(result)) {
        console.error('查询结果不是数组类型')
        return []
    }
    // 按照index对返回数据排序，并过滤掉title为空的数据
    result.sort((a, b) => a.index - b.index)
    result = result.filter((item) => item.title?.trim() !== '')

    const res_data: NormCardProps[] = result.map((item) => {
        const trend = Number(item.average_time || 0) > Number(item.request_time || 0)
        const card_text = trend ? '平均用时良好' : '平均用时较长'
        const sub_text = `${formatMinutes(Number(item.average_time || 0))} / ${formatMinutes(Number(item.request_time || 0))}`
        return {
            title: String(item.title || ''),
            sub_title: '流程平均用时 / 流程要求时限',
            sub_text: sub_text,
            card_text: card_text,
            request_value: Number(item.request_time || 0),
            request_value_trend: trend,
        }
    })
    return res_data
}

/**
 * 获取无异常饼图数据
 *
 * @async
 * @description
 * 该函数从MongoDB数据库中获取饼图数据，并进行以下处理：
 * 1. 从数据库获取原始数据
 * 2. 验证数据格式并进行数组类型检查
 * 3. 转换数据为标准饼图格式，包含以下处理：
 *    - 将原始数据转换为NormPieChartProps格式
 *    - 根据index设置图表方向（index为0时水平显示）
 *    - 对每个饼图的数据项进行智能排序：
 *      * 优先使用id进行排序（当id存在且不相同时）
 *      * 当id不存在或相同时使用label进行字母顺序排序
 *    - 过滤掉空label的数据项
 * 4. 按照index对整体数据进行排序
 *
 * @returns {Promise<NormPieChartProps[]>} 返回一个Promise，解析为饼图属性数组，每个元素包含：
 * - index: number - 饼图的索引号
 * - title: string - 饼图标题
 * - data: NormPieChartDataProps[] - 饼图数据项数组
 *   * id: number - 数据项ID
 *   * label: string - 数据项标签
 *   * value: number - 数据项值
 * - have_card: boolean - 是否有关联卡片（默认false）
 * - is_horizontal: boolean - 是否水平显示（index为0时为true）
 *
 * @throws {Error} 当数据库连接失败时可能抛出错误
 */
export async function GetPieChartNoErrorData() {
    const client = await InitDBConnect()
    const db = client.db('liteweb')
    const collection = db.collection('pie_chart_no_error_data')
    const result = await collection.find({}).toArray()
    // 确保result是数组类型
    if (!Array.isArray(result)) {
        console.error('查询结果不是数组类型')
        return []
    }
    let res_data: NormPieChartProps[] = result
        .map((item) => {
            return {
                index: typeof item.index !== 'undefined' ? Number(item.index) : 0,
                title: String(item.title || ''),
                data: item.data
                    .map(
                        (groupItem: any): NormPieChartDataProps => ({
                            id: Number(groupItem.id || 0),
                            label: String(groupItem.label || ''),
                            value: Number(groupItem.value || 0),
                        })
                    )
                    .sort((a: NormPieChartDataProps, b: NormPieChartDataProps) => {
                        // 检查id是否存在且不相同
                        if (a.id && b.id && a.id !== b.id) {
                            return a.id - b.id
                        }
                        // 如果id不存在或相同，则使用value排序（从大到小）
                        return b.value - a.value
                    }),
                have_card: true,
                is_horizontal: false,
            }
        })
        .sort((a, b) => a.index - b.index)
    res_data.forEach((item) => {
        item.data = item.data.filter((d: NormPieChartDataProps) => d.label.trim() !== '')
    })
    return res_data
}

/**
 * 获取饼图异常数据
 * 
 * @async
 * @description
 * 该函数从MongoDB数据库中获取饼图异常数据，并进行以下处理：
 * 1. 从数据库获取原始数据
 * 2. 验证数据格式并进行数组类型检查
 * 3. 转换数据为标准饼图格式，包含以下处理：
 *    - 将原始数据转换为NormPieChartProps格式
 *    - 根据index设置图表方向（index为0时水平显示）
 *    - 对每个饼图的数据项进行智能排序：
 *      * 优先使用id进行排序（当id存在且不相同时）
 *      * 当id不存在或相同时使用value进行排序（从大到小）
 *    - 过滤掉空label的数据项
 * 4. 按照index对整体数据进行排序
 * 
 * @returns {Promise<NormPieChartProps[]>} 返回一个Promise，解析为饼图属性数组，每个元素包含：
 * - index: number - 饼图的索引号
 * - title: string - 饼图标题
 * - data: NormPieChartDataProps[] - 饼图数据项数组
 *   * id: number - 数据项ID
 *   * label: string - 数据项标签
 *   * value: number - 数据项值
 * - have_card: boolean - 是否有关联卡片（默认false）
 * - is_horizontal: boolean - 是否水平显示（index为0时为true）
 * 
 * @throws {Error} 当数据库连接失败时可能抛出错误
 */
export async function GetPieChartErrorData() {
    const client = await InitDBConnect()
    const db = client.db('liteweb')
    const collection = db.collection('pie_chart_error_data')
    const result = await collection.find({}).toArray()
    // 确保result是数组类型
    if (!Array.isArray(result)) {
        console.error('查询结果不是数组类型')
        return []
    }
    let res_data: NormPieChartProps[] = result
        .map((item) => {
            const index = typeof item.index !== 'undefined' ? Number(item.index) : 0
            const is_horizontal = index === 0 ? true : false
            return {
                index: index,
                title: String(item.title || ''),
                data: item.data
                    .map(
                        (groupItem: any): NormPieChartDataProps => ({
                            id: Number(groupItem.id || 0),
                            label: String(groupItem.label || ''),
                            value: Number(groupItem.value || 0),
                        })
                    )
                    .sort((a: NormPieChartDataProps, b: NormPieChartDataProps) => {
                        // 检查id是否存在且不相同
                        if (a.id && b.id && a.id !== b.id) {
                            return a.id - b.id
                        }
                        // 如果id不存在或相同，则使用value排序（从大到小）
                        return b.value - a.value
                    }),
                have_card: false,
                is_horizontal: is_horizontal,
            }
        })
        .sort((a, b) => a.index - b.index)
    res_data.forEach((item) => {
        item.data = item.data.filter((d: NormPieChartDataProps) => d.label.trim() !== '')
    })
    return res_data
}

/**
 * 获取校线组别数据
 * 
 * @async
 * @description
 * 该函数从MongoDB数据库中获取校线组别数据，并进行以下处理：
 * 1. 从数据库获取原始数据
 * 2. 验证数据格式并进行数组类型检查
 * 3. 转换数据为标准图表格式，包含以下处理：
 *    - 计算每个组的总数和及时完成数
 *    - 计算整体完成率和趋势
 *    - 对组别数据进行排序（按完成率从高到低）
 * 4. 按照index对整体数据进行排序
 * 
 * @returns {Promise<NormChartProps[]>} 返回一个Promise，解析为图表属性数组，每个元素包含：
 * - index: number - 图表的索引号
 * - title: string - 图表标题
 * - trend: boolean - 趋势（true表示良好，false表示较差）
 * - total: number - 总数
 * - complete: number - 完成率（百分比）
 * - group: NormChartGroupProps[] - 组别数据数组
 *   * name: string - 组别名称
 *   * ontime: number - 及时完成数
 *   * total: number - 总数
 *   * complete: number - 完成率（百分比）
 * 
 * @throws {Error} 当数据库连接失败时可能抛出错误
 */
export async function GetCalibrationLineGroupData() {
    const client = await InitDBConnect()
    const db = client.db('liteweb')
    const collection = db.collection('calibration_line_group_data')
    const result = await collection.find({}).toArray()
    // 确保result是数组类型
    if (!Array.isArray(result)) {
        console.error('查询结果不是数组类型')
        return []
    }
    let res_data: NormChartProps[] = result.map((item) => {
        const trend = Number(item.average_time || 0) > Number(item.request_time || 0)
        const total = item.group.reduce((sum: number, groupItem: any) => sum + Number(groupItem.total || 0), 0)
        const ontime = item.group.reduce((sum: number, groupItem: any) => sum + Number(groupItem.ontime || 0), 0)
        const complete = Math.floor(ontime / total * 100)
        return {
            index: typeof item.index !== 'undefined' ? Number(item.index) : 0,
            title: String(item.title || ''),
            trend: trend,
            total: total,
            complete: complete,
            group: item.group.map(
                (groupItem: any): NormChartGroupProps => ({
                    name: String(groupItem.name || ''),
                    ontime: Number(groupItem.value || 0),
                    total: Number(groupItem.total || 0),
                    complete: Math.floor(Number(groupItem.ontime || 0) / Number(groupItem.total || 0) * 100),
                })
            ).sort((a: NormChartGroupProps, b: NormChartGroupProps) => b.complete - a.complete),
        }
    }).sort((a, b) => a.index - b.index)
    return res_data
}
