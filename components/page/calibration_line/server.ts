'use server'

import { InitDBConnect } from "@/components/data/db";
import { formatMinutes } from '@/components/utils'
import type { NormCardProps } from "@/components/NormCard";

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

export default async function GetCalibrationLineTotalData() {
    const client = await InitDBConnect();
    const db = client.db("liteweb");
    const collection = db.collection("calibration_line_total_data");
    let result = await collection.find({}).toArray();
    // 确保result是数组类型
    if (!Array.isArray(result)) {
        console.error('查询结果不是数组类型');
        return [];
    }
    // 按照index对返回数据排序，并过滤掉title为空的数据
    result.sort((a, b) => a.index - b.index);
    result = result.filter(item => item.title?.trim() !== '');

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
            request_value_trend: trend
        }
    })
    return res_data;
}
