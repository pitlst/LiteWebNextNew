'use server'

import * as React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

import UpdateTime from '@/components/UpdateTime'
import NormPieChart, { NormPieChartProps } from '@/components/NormPieChart'
import NormCard, { NormCardProps } from '@/components/NormCard'
import { InitDBConnect } from "@/components/utils/db";
import { formatMinutes } from '@/components/utils/utils'

async function ransCalibrationLineTotalData() {
    const client = await InitDBConnect();
    const db = client.db("liteweb");
    const collection = db.collection("calibration_line_total_data");
    let data = await collection.find({}).toArray();
    // 按照index对返回数据排序，并过滤掉title为空的数据
    data.sort((a, b) => a.index - b.index)
    data = data.filter(item => item.title.trim() !== '')

    const res_data = data.map((item) => {
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
    return res_data
}

export default async function CalibrationLine() {
    const CalibrationLineTotalData = await ransCalibrationLineTotalData()
    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            <Typography component="h2" variant="h4" sx={{ mb: 2 }}>
                校线异常处理流程情况
            </Typography>
            <UpdateTime name={'CalibrationLine'} />
            <Grid container spacing={2} columns={CalibrationLineTotalData.length} sx={{ mb: (theme) => theme.spacing(2) }}>
                {CalibrationLineTotalData.map((card, index) => (
                    <Grid key={index} size={{ xs: 12, sm: 6, lg: 1 }}>
                        <NormCard {...card} />
                    </Grid>
                ))}
            </Grid>
            {/* <Grid container spacing={2} columns={PieChartNoErrorData.length} sx={{ mb: (theme) => theme.spacing(2) }}>
                {PieChartNoErrorData.map((card, index) => (
                    <Grid key={index} size={{ xs: 12, sm: 6, lg: 1 }}>
                        <NormPieChart {...card} />
                    </Grid>
                ))}
            </Grid> */}
            {/* <Grid container spacing={2} columns={1} sx={{ mb: (theme) => theme.spacing(2) }}>
                <Card variant="outlined" sx={{ display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1, height: '100%' }}>
                    <CardContent>
                        <Typography color="h3" variant="h5" gutterBottom>
                            本月校线异常原因占比
                        </Typography>
                        <Grid container spacing={2} columns={3} sx={{ mb: (theme) => theme.spacing(2) }}>
                            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                                <NormPieChartOrthogonal {...PieChartErrorData[0]} have_card={false} />
                            </Grid>
                            {PieChartErrorData.slice(1).map((card, index) => (
                                <Grid key={index} size={{ xs: 12, sm: 6, lg: 1 }}>
                                    <NormPieChart {...card} have_card={false} />
                                </Grid>
                            ))}
                        </Grid>
                    </CardContent>
                </Card>
            </Grid> */}
            {/* <Grid size={{ xs: 12, sm: 6 }}>
                <Card variant="outlined" sx={{ width: '100%' }}>
                    <CardContent>
                        <Typography component="h2" variant="subtitle2" gutterBottom>
                            各组室流程及时转化率
                        </Typography>
                        {CalibrationLineGroupData.map((card, index) => (
                            <div key={index}>
                                {index !== 0 ? (
                                    <>
                                        <Divider sx={{ my: 2 }} />
                                        <NormChart {...card} />
                                    </>
                                ) : (
                                    <NormChart {...card} />
                                )}
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </Grid> */}
        </Box>
    )
}