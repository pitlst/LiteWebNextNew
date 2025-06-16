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

export default async function ReasonCard({ start_time, end_time }: set_time_windows_props) {
    const response = await axios.post(`${process.env.API_URI}/api/error/calibration_line/reason_card`, {
        start_time: start_time,
        end_time: end_time,
    })
    const result: calibration_line_reason_card_api[] = response.data
    result.sort((a, b) => a.index - b.index)
    const result_filter = result.filter((item) => item.title?.trim() !== '')
}