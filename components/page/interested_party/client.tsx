'use client'

import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { useTheme } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Skeleton from '@mui/material/Skeleton'
import { LineChart } from '@mui/x-charts/LineChart'

import UpdateTime from '@/components/UpdateTime'
import { getLast30Days, getLast12Months } from '@/components/utils'
import CustomDiagram, { CustomDiagramProps } from '@/components/charts/CustomDiagram'
import GetDataTableConfig  from '@/components/theme/DataTableConfig'
import { GetDiagramData } from './server'

export interface Person {
    firstName: string
    lastName: string
    address: string
    city: string
    state: string
    subRows?: Person[] //Each person can have sub rows of more people
}

export const data: Person[] = [
    {
        firstName: 'Dylan',
        lastName: 'Murray',
        address: '261 Erdman Ford',
        city: 'East Daphne',
        state: 'Kentucky',
        subRows: [
            {
                firstName: 'Ervin',
                lastName: 'Reinger',
                address: '566 Brakus Inlet',
                city: 'South Linda',
                state: 'West Virginia',
                subRows: [
                    {
                        firstName: 'Jordane',
                        lastName: 'Homenick',
                        address: '1234 Brakus Inlet',
                        city: 'South Linda',
                        state: 'West Virginia',
                    },
                    {
                        firstName: 'Jordan',
                        lastName: 'Clarkson',
                        address: '4882 Palm Rd',
                        city: 'San Francisco',
                        state: 'California',
                    },
                ],
            },
            {
                firstName: 'Brittany',
                lastName: 'McCullough',
                address: '722 Emie Stream',
                city: 'Lincoln',
                state: 'Nebraska',
            },
        ],
    },
    {
        firstName: 'Raquel',
        lastName: 'Kohler',
        address: '769 Dominic Grove',
        city: 'Columbus',
        state: 'Ohio',
        subRows: [
            {
                firstName: 'Branson',
                lastName: 'Frami',
                address: '32188 Larkin Turnpike',
                city: 'Charleston',
                state: 'South Carolina',
            },
        ],
    },
]



function AreaGradient({ color, id }: { color: string; id: string }) {
    return (
        <defs>
            <linearGradient id={id} x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor={color} stopOpacity={0.5} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
        </defs>
    )
}

interface InterestedPartyProps {
    title: string
    value: number
}

function IndexCard({ title, value }: InterestedPartyProps) {
    return (
        <Card variant="outlined" sx={{ height: '100%', flexGrow: 1 }}>
            <CardContent>
                <Typography component="h2" variant="subtitle2" gutterBottom>
                    {title}
                </Typography>
                <Stack direction="column" sx={{ justifyContent: 'space-between', flexGrow: '1', gap: 1 }}>
                    <Stack sx={{ justifyContent: 'space-between' }}>
                        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h4" component="p">
                                {value}
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    )
}

function MonthLineChart() {
    const theme = useTheme()
    const data = getLast12Months()

    const colorPalette = [theme.palette.primary.light, theme.palette.primary.main, theme.palette.primary.dark]

    return (
        <Card variant="outlined" sx={{ width: '100%' }}>
            <CardContent>
                <Typography component="h2" variant="subtitle2" gutterBottom>
                    每月相关方流动趋势
                </Typography>
                <Stack sx={{ justifyContent: 'space-between' }}>
                    <Stack
                        direction="row"
                        sx={{
                            alignContent: { xs: 'center', sm: 'flex-start' },
                            alignItems: 'center',
                            gap: 1,
                        }}
                    >
                        <Typography variant="h4" component="p">
                            进入 13,277 人
                        </Typography>
                        <Chip size="small" color="success" label="+35%" />
                    </Stack>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        仅显示最近12月
                    </Typography>
                </Stack>
                <LineChart
                    colors={colorPalette}
                    xAxis={[
                        {
                            scaleType: 'point',
                            data,
                            tickInterval: (index, i) => (i + 1) % 5 === 0,
                        },
                    ]}
                    series={[
                        {
                            id: 'direct',
                            label: '进入事业部',
                            showMark: false,
                            curve: 'linear',
                            stack: 'total',
                            area: true,
                            stackOrder: 'ascending',
                            data: [300, 900, 600, 1200, 1500, 1800, 2400, 2100, 2700, 3000, 1800, 3300],
                        },
                        {
                            id: 'referral',
                            label: '临时外出',
                            showMark: false,
                            curve: 'linear',
                            stack: 'total',
                            area: true,
                            stackOrder: 'ascending',
                            data: [500, 900, 700, 1400, 1100, 1700, 2300, 2000, 2600, 2900, 2300, 3200],
                        },
                        {
                            id: 'organic',
                            label: '离开事业部',
                            showMark: false,
                            curve: 'linear',
                            stack: 'total',
                            stackOrder: 'ascending',
                            data: [1000, 1500, 1200, 1700, 1300, 2000, 2400, 2200, 2600, 2800, 2500, 3000],
                            area: true,
                        },
                    ]}
                    height={250}
                    margin={{ left: 50, right: 20, top: 20, bottom: 20 }}
                    grid={{ horizontal: true }}
                    sx={{
                        '& .MuiAreaElement-series-organic': {
                            fill: "url('#organic')",
                        },
                        '& .MuiAreaElement-series-referral': {
                            fill: "url('#referral')",
                        },
                        '& .MuiAreaElement-series-direct': {
                            fill: "url('#direct')",
                        },
                    }}
                    slotProps={{
                        legend: { hidden: true } as any,
                    }}
                >
                    <AreaGradient color={theme.palette.primary.dark} id="organic" />
                    <AreaGradient color={theme.palette.primary.main} id="referral" />
                    <AreaGradient color={theme.palette.primary.light} id="direct" />
                </LineChart>
            </CardContent>
        </Card>
    )
}

function DayLineChart() {
    const theme = useTheme()
    const data = getLast30Days()

    const colorPalette = [theme.palette.primary.light, theme.palette.primary.main, theme.palette.primary.dark]

    return (
        <Card variant="outlined" sx={{ width: '100%' }}>
            <CardContent>
                <Typography component="h2" variant="subtitle2" gutterBottom>
                    每天相关方流动趋势
                </Typography>
                <Stack sx={{ justifyContent: 'space-between' }}>
                    <Stack
                        direction="row"
                        sx={{
                            alignContent: { xs: 'center', sm: 'flex-start' },
                            alignItems: 'center',
                            gap: 1,
                        }}
                    >
                        <Typography variant="h4" component="p">
                            进入 13,277 人
                        </Typography>
                        <Chip size="small" color="success" label="+35%" />
                    </Stack>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        仅显示最近30天
                    </Typography>
                </Stack>
                <LineChart
                    colors={colorPalette}
                    xAxis={[
                        {
                            scaleType: 'point',
                            data,
                            tickInterval: (index, i) => (i + 1) % 5 === 0,
                        },
                    ]}
                    series={[
                        {
                            id: 'direct',
                            label: '进入事业部',
                            showMark: false,
                            curve: 'linear',
                            stack: 'total',
                            area: true,
                            stackOrder: 'ascending',
                            data: [
                                300, 900, 600, 1200, 1500, 1800, 2400, 2100, 2700, 3000, 1800, 3300, 3600, 3900, 4200, 4500, 3900, 4800, 5100, 5400,
                                4800, 5700, 6000, 6300, 6600, 6900, 7200, 7500, 7800, 8100,
                            ],
                        },
                        {
                            id: 'referral',
                            label: '临时外出',
                            showMark: false,
                            curve: 'linear',
                            stack: 'total',
                            area: true,
                            stackOrder: 'ascending',
                            data: [
                                500, 900, 700, 1400, 1100, 1700, 2300, 2000, 2600, 2900, 2300, 3200, 3500, 3800, 4100, 4400, 2900, 4700, 5000, 5300,
                                5600, 5900, 6200, 6500, 5600, 6800, 7100, 7400, 7700, 8000,
                            ],
                        },
                        {
                            id: 'organic',
                            label: '离开事业部',
                            showMark: false,
                            curve: 'linear',
                            stack: 'total',
                            stackOrder: 'ascending',
                            data: [
                                1000, 1500, 1200, 1700, 1300, 2000, 2400, 2200, 2600, 2800, 2500, 3000, 3400, 3700, 3200, 3900, 4100, 3500, 4300,
                                4500, 4000, 4700, 5000, 5200, 4800, 5400, 5600, 5900, 6100, 6300,
                            ],
                            area: true,
                        },
                    ]}
                    height={250}
                    margin={{ left: 50, right: 20, top: 20, bottom: 20 }}
                    grid={{ horizontal: true }}
                    sx={{
                        '& .MuiAreaElement-series-organic': {
                            fill: "url('#organic')",
                        },
                        '& .MuiAreaElement-series-referral': {
                            fill: "url('#referral')",
                        },
                        '& .MuiAreaElement-series-direct': {
                            fill: "url('#direct')",
                        },
                    }}
                    slotProps={{
                        legend: { hidden: true } as any,
                    }}
                >
                    <AreaGradient color={theme.palette.primary.dark} id="organic" />
                    <AreaGradient color={theme.palette.primary.main} id="referral" />
                    <AreaGradient color={theme.palette.primary.light} id="direct" />
                </LineChart>
            </CardContent>
        </Card>
    )
}

function InterestedPartyNestedPie() {
    const [DiagramData, setDiagramData] = React.useState<CustomDiagramProps | null>(null)
    React.useEffect(() => {
        async function fetchPosts() {
            const data = await GetDiagramData()
            setDiagramData(data)
        }
        fetchPosts()
    }, [])

    if (DiagramData === null) {
        return (
            <Card variant="outlined" sx={{ width: '100%' }}>
                <CardContent>
                    <Typography component="h2" variant="h4" sx={{ mb: 1 }}>
                        相关方出入情况桑基图
                    </Typography>
                    <Typography color="textSecondary" sx={{ mb: 2 }}>
                        默认为最近30天数据
                    </Typography>
                    {Array.from({ length: 20 }).map((_, i) => (
                        <Skeleton key={i} animation="wave" />
                    ))}
                </CardContent>
            </Card>
        )
    } else {
        return (
            <Card variant="outlined" sx={{ width: '100%' }}>
                <CardContent>
                    <Typography component="h2" variant="h4" sx={{ mb: 1 }}>
                        相关方出入情况桑基图
                    </Typography>
                    <Typography color="textSecondary" sx={{ mb: 2 }}>
                        默认为最近30天数据
                    </Typography>
                    <CustomDiagram {...DiagramData} />
                </CardContent>
            </Card>
        )
    }
}


function InterestedPartyDataTable() {
    return (
        <Card variant="outlined" sx={{ width: '100%' }}>
            <CardContent>
                <Typography component="h2" variant="subtitle2" gutterBottom>
                    相关方出入情况明细
                </Typography>
                {/* {Array.from({ length: 10 }).map((_, i) => (
                    <Skeleton key={`CalibrationLineNestedPieSkeleton_${i}`} animation="wave" />
                ))} */}
                {/* <NormDataTable /> */}
            </CardContent>
        </Card>
    )
}

function HeadCard(){
    
}




export default function InterestedParty() {
    const InterestedPartyData = [
        {
            title: '当前相关方进入事业部人数',
            value: 100,
        },
        {
            title: '当前相关方进入车间人数',
            value: 0,
        },
        {
            title: '当前相关方临时外出人数',
            value: 0,
        },
    ]

    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            <Typography component="h2" variant="h4" sx={{ mb: 2 }}>
                相关方管理情况分析
            </Typography>
            <UpdateTime name={'interested_party'} />
            <Grid container spacing={2} columns={6} sx={{ mb: (theme) => theme.spacing(2) }}>
                {InterestedPartyData.map((card, index) => (
                    <Grid key={index} size={{ xs: 12, sm: 6, lg: 2 }}>
                        <IndexCard {...card} />
                    </Grid>
                ))}
                <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                    <MonthLineChart />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                    <DayLineChart />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, lg: 6 }}>
                    <InterestedPartyNestedPie />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, lg: 6 }}>
                    <InterestedPartyDataTable />
                </Grid>
            </Grid>
        </Box>
    )
}
