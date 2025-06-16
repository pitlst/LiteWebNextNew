'use server'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import axios from 'axios'
import { format_minutes } from '@/lib/utils'

import type { set_time_windows_props } from '../page'

// FastAPI 的返回结果
interface calibration_line_total_data_api {
    index: number
    title: string
    value: number
    request_time: number
    average_time: number
}

// 组件渲染需要的数据
interface norm_card_props {
    title: string
    sub_title: string
    sub_text: string
    card_text: string
    request_value: number
    card_color: 'success' | 'error'
}

export default async function HeadCard({ start_time, end_time }: set_time_windows_props) {
    const response = await axios.post(`${process.env.API_URI}/api/error/calibration_line/head_card`, {
        start_time: start_time,
        end_time: end_time,
    })
    const result: calibration_line_total_data_api[] = response.data
    result.sort((a, b) => a.index - b.index)
    const result_filter = result.filter((item) => item.title?.trim() !== '')
    const res_data: norm_card_props[] = await Promise.all(
        result_filter.map(async (item: calibration_line_total_data_api) => {
            const trend = Number(item.average_time || 0) <= Number(item.request_time || 0)
            const card_text = trend ? '平均用时良好' : '平均用时较长'
            const sub_text = `${await format_minutes(Number(item.average_time || 0))} / ${await format_minutes(Number(item.request_time || 0))}`
            return {
                title: String(item.title || ''),
                sub_title: '本月流程平均用时 / 流程要求时限',
                sub_text: sub_text,
                card_text: card_text,
                request_value: Number(item.value || 0),
                card_color: trend ? 'success' : 'error',
            }
        })
    )
    return (
        <Grid container spacing={2} columns={res_data.length} sx={{ mb: (theme) => theme.spacing(2) }}>
            {res_data.map((ch, index) => (
                <Grid key={`${index}`} size={{ xs: 12, sm: 6, lg: 1 }}>
                    <Card variant="outlined" sx={{ height: '100%', flexGrow: 1 }}>
                        <CardContent>
                            <Typography component="h2" variant="subtitle2" gutterBottom>
                                {ch.title}
                            </Typography>
                            <Stack direction="column" sx={{ justifyContent: 'space-between', flexGrow: '1', gap: 1 }}>
                                <Stack sx={{ justifyContent: 'space-between' }}>
                                    <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography variant="h4" component="p">
                                            {ch.request_value}
                                        </Typography>
                                        <Chip size="small" color={ch.card_color} label={ch.card_text} />
                                    </Stack>
                                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                        {ch.sub_title}
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                        {ch.sub_text}
                                    </Typography>
                                </Stack>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    )
}
