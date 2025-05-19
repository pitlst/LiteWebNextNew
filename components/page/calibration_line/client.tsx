'use client'

import * as React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'

import GetUpdateTime from '@/components/data/update_time'
import NormPieChart, { NormPieChartProps } from '@/components/NormPieChart'
import NormCard, { NormCardProps } from '@/components/NormCard'
import NormChart, { NormChartProps } from '@/components/NormChart'
import { GetCalibrationLineTotalData, GetPieChartNoErrorData, GetPieChartErrorData, GetCalibrationLineGroupData } from './server'


function UpdateTime() {
    const [UpdateTimeData, setUpdateTimeData] = React.useState<string | null>(null)
    React.useEffect(() => {
        async function fetchPosts() {
            const data = await GetUpdateTime('calibration_line')
            setUpdateTimeData(data)
        }
        fetchPosts()
    }, [])
    if (UpdateTimeData === null) {
        return (
            <Typography color="textSecondary" sx={{ mb: 2 }}>
                数据非实时更新，后台任务定时刷新，最近更新时间：正在获取......
            </Typography>
        )
    }
    else {
        return (
            <Typography color="textSecondary" sx={{ mb: 2 }}>
                数据非实时更新，后台任务定时刷新，最近更新时间：{UpdateTimeData}
            </Typography>
        )
    }
}

function HeadCard() {
    const [CalibrationLineTotalData, setCalibrationLineTotalData] = React.useState<NormCardProps[] | null>(null)
    React.useEffect(() => {
        async function fetchPosts() {
            const data = await GetCalibrationLineTotalData()
            setCalibrationLineTotalData(data)
        }
        fetchPosts()
    }, [])
    if (CalibrationLineTotalData === null) {
        const temp = Array.from({ length: 5 }, (_, i) => i)
        return (
            <Grid container spacing={2} columns={temp.length} sx={{ mb: (theme) => theme.spacing(2) }}>
                {temp.map((_, index) => (
                    <Grid key={index} size={{ xs: 12, sm: 6, lg: 1 }}>
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Skeleton key={i} animation="wave" />
                        ))}
                    </Grid>
                ))}
            </Grid>
        )
    }
    else {
        return (
            <Grid container spacing={2} columns={CalibrationLineTotalData.length} sx={{ mb: (theme) => theme.spacing(2) }}>
                {CalibrationLineTotalData.map((card, index) => (
                    <Grid key={index} size={{ xs: 12, sm: 6, lg: 1 }}>
                        <NormCard {...card} />
                    </Grid>
                ))}
            </Grid>
        )
    }
}

function ReasonCard() {
    const [PieChartNoErrorData, setPieChartNoErrorData] = React.useState<NormPieChartProps[] | null>(null)
    React.useEffect(() => {
        async function fetchPosts() {
            const data = await GetPieChartNoErrorData()
            setPieChartNoErrorData(data)
        }
        fetchPosts()
    }, [])
    if (PieChartNoErrorData === null) {
        const temp = Array.from({ length: 3 }, (_, i) => i)
        return (
            <Grid container spacing={2} columns={temp.length} sx={{ mb: (theme) => theme.spacing(2) }}>
                {temp.map((_, index) => (
                    <Grid key={index} size={{ xs: 12, sm: 6, lg: 1 }}>
                        <Card variant="outlined" sx={{ display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1, height: '100%' }}>
                            <CardContent>
                                {Array.from({ length: 10 }).map((_, i) => (
                                    <Skeleton key={i} animation="wave" />
                                ))}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        )
    } else {
        return (
            <Grid container spacing={2} columns={PieChartNoErrorData.length} sx={{ mb: (theme) => theme.spacing(2) }}>
                {PieChartNoErrorData.map((card, index) => (
                    <Grid key={index} size={{ xs: 12, sm: 6, lg: 1 }}>
                        <NormPieChart {...card} />
                    </Grid>
                ))}
            </Grid>
        )
    }
}

function ConfigurationCard() {
    const [PieChartErrorData, setPieChartErrorData] = React.useState<NormPieChartProps[] | null>(null)
    React.useEffect(() => {
        async function fetchPosts() {
            const data = await GetPieChartErrorData()
            setPieChartErrorData(data)
        }
        fetchPosts()
    }, [])
    if (PieChartErrorData === null) {
        return (
            <Grid container spacing={2} columns={1} sx={{ mb: (theme) => theme.spacing(2) }}>
                <Card variant="outlined" sx={{ display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1, height: '100%' }}>
                    <CardContent>
                        <Typography color="h3" variant="h5" gutterBottom>
                            本月校线异常原因占比
                        </Typography>
                        <Grid container spacing={2} columns={3} sx={{ mb: (theme) => theme.spacing(2) }}>
                            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                                {Array.from({ length: 10 }).map((_, i) => (
                                    <Skeleton key={i} animation="wave" />
                                ))}
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                                <Divider />
                            </Grid>
                            {Array.from({ length: 3 }).map((_, index) => (
                                <Grid key={index} size={{ xs: 12, sm: 6, lg: 1 }}>
                                    {Array.from({ length: 10 }).map((_, i) => (
                                        <Skeleton key={i} animation="wave" />
                                    ))}
                                </Grid>
                            ))}
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        )
    } else {
        return (
            <Grid container spacing={2} columns={1} sx={{ mb: (theme) => theme.spacing(2) }}>
                <Card variant="outlined" sx={{ display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1, height: '100%' }}>
                    <CardContent>
                        <Typography color="h3" variant="h5" gutterBottom>
                            本月校线异常原因占比
                        </Typography>
                        <Grid container spacing={2} columns={3} sx={{ mb: (theme) => theme.spacing(2) }}>
                            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                                <NormPieChart {...PieChartErrorData[0]} />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                                <Divider />
                            </Grid>
                            {PieChartErrorData.slice(1).map((card, index) => (
                                <Grid key={index} size={{ xs: 12, sm: 6, lg: 1 }}>
                                    <NormPieChart {...card} />
                                </Grid>
                            ))}
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        )
    }
}

function GroupCard() {
    const [CalibrationLineGroupData, setCalibrationLineGroupData] = React.useState<NormChartProps[] | null>(null)
    React.useEffect(() => {
        async function fetchPosts() {
            const data = await GetCalibrationLineGroupData()
            setCalibrationLineGroupData(data)
        }
        fetchPosts()
    }, [])
    if (CalibrationLineGroupData === null) {
        return (
            <Grid size={{ xs: 12, sm: 6 }}>
                <Card variant="outlined" sx={{ width: '100%' }}>
                    <CardContent>
                        <Typography component="h2" variant="subtitle2" gutterBottom>
                            各组室流程及时转化率
                        </Typography>
                        {Array.from({ length: 5 }).map((_, index) => (
                            <div key={index}>
                                {index !== 0 ? (
                                    <>
                                        <Divider sx={{ my: 2 }} />
                                        <Stack>
                                            {Array.from({ length: 10 }).map((_, i) => (
                                                <Skeleton key={i} animation="wave" />
                                            ))}
                                        </Stack>
                                    </>
                                ) : (
                                    <Stack>
                                        {Array.from({ length: 10 }).map((_, i) => (
                                            <Skeleton key={i} animation="wave" />
                                        ))}
                                    </Stack>
                                )}
                            </div>

                        ))}
                    </CardContent>
                </Card>
            </Grid>
        )
    } else {
        return (
            <Grid size={{ xs: 12, sm: 6 }}>
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
        </Grid>
        )
    }
}
export default function CalibrationLine() {
    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            <Typography component="h2" variant="h4" sx={{ mb: 2 }}>
                校线异常处理流程情况
            </Typography>
            <UpdateTime />
            <HeadCard />
            <ReasonCard />
            <ConfigurationCard />
            <GroupCard/>
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
