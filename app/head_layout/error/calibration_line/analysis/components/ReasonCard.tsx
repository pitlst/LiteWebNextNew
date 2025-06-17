'use server'

import axios from 'axios'

import type { set_time_windows_props } from '../page'

// FastAPI 的返回结果
interface calibration_line_reason_card_data_api {
    label: string
    value: number
}

interface calibration_line_reason_card_api {
    index: number
    title: string
    data: calibration_line_reason_card_data_api[]
}

// 组件渲染需要的数据
interface reason_card_data_props {
    label: string
    value: number
}

interface reason_card_props {
    title: string
    data: reason_card_data_props[]
    data_max: number
    data_sum: number
    chart_length: number
}

export default async function ReasonCard({ start_time, end_time }: set_time_windows_props) {
    const response = await axios.post(`${process.env.API_URI}/api/error/calibration_line/reason_card`, {
        start_time: start_time,
        end_time: end_time,
    })
    const result: calibration_line_reason_card_api[] = response.data
    result.sort((a, b) => a.index - b.index)
    const result_filter = result.filter((item) => item.title?.trim() !== '')
    let first_label = false
    const res_data: reason_card_props[] = await Promise.all(
        result_filter.map(async (item: calibration_line_reason_card_api) => {
            const temp_max = Math.max(...item.data.map((item) => item.value))
            const temp_sum = item.data.reduce((acc, item) => acc + item.value, 0)
            const chart_length = first_label ? Math.max(50 * item.data.length, 260) : 260
            first_label = true
            return {
                title: item.title,
                data: item.data,
                data_max: temp_max,
                data_sum: temp_sum,
                chart_length: chart_length,
            }
        })
    )
}
