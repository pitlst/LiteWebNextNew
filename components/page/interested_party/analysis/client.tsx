'use client'

import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import Skeleton from '@mui/material/Skeleton'
import UpdateTime from '@/components/UpdateTime'
import CustomDiagram, { CustomDiagramProps } from '@/components/CustomDiagram'
import NormLineChart, { type NormLineChartProps } from '@/components/NormLineChart'
import { GetDiagramData, GetHeadCardData, GetDatatimeData } from './server'

function NestedPie() {
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
            <Grid spacing={2} sx={{ mb: (theme) => theme.spacing(2) }}>
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
            </Grid>
        )
    } else {
        return (
            <Grid spacing={2} sx={{ mb: (theme) => theme.spacing(2) }}>
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
            </Grid>
        )
    }
}

export interface HeadCardProps {
    title: string
    value: number
}

function HeadCard() {
    const [InterestedPartyData, setInterestedPartyData] = React.useState<HeadCardProps[] | null>(null)
    React.useEffect(() => {
        async function fetchPosts() {
            const data = await GetHeadCardData()
            setInterestedPartyData(data)
        }
        fetchPosts()
    }, [])
    if (InterestedPartyData === null) {
        return (
            <Grid container spacing={2} columns={3} sx={{ mb: (theme) => theme.spacing(2) }}>
                {Array.from({ length: 3 }).map((_, i) => (
                    <Grid key={i} size={{ xs: 12, sm: 6, lg: 1 }}>
                        <Card variant="outlined" sx={{ height: '100%', flexGrow: 1 }}>
                            <CardContent>
                                {Array.from({ length: 5 }).map((_, i) => (
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
            <Grid container spacing={2} columns={InterestedPartyData.length} sx={{ mb: (theme) => theme.spacing(2) }}>
                {InterestedPartyData.map((card, index) => (
                    <Grid key={index} size={{ xs: 12, sm: 6, lg: 1 }}>
                        <Card variant="outlined" sx={{ height: '100%', flexGrow: 1 }}>
                            <CardContent>
                                <Typography component="h2" variant="subtitle2" gutterBottom>
                                    {card.title}
                                </Typography>
                                <Stack direction="column" sx={{ justifyContent: 'space-between', flexGrow: '1', gap: 1 }}>
                                    <Stack sx={{ justifyContent: 'space-between' }}>
                                        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Typography variant="h4" component="p">
                                                {card.value}
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        )
    }
}

function DatatimeCard() {
    const [DatatimeData, setDatatimeData] = React.useState<NormLineChartProps[] | null>(null)
    React.useEffect(() => {
        async function fetchPosts() {
            const data = await GetDatatimeData()
            setDatatimeData(data)
        }
        fetchPosts()
    }, [])
    if (DatatimeData === null) {
        return (
            <Grid container spacing={2} columns={2} sx={{ mb: (theme) => theme.spacing(2) }}>
                {Array.from({ length: 2 }).map((_, i) => (
                    <Grid key={i} size={{ xs: 12, sm: 6, lg: 1 }}>
                        <Card variant="outlined" sx={{ height: '100%', flexGrow: 1 }}>
                            <CardContent>
                                {Array.from({ length: 5 }).map((_, i) => (
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
            <Grid container spacing={2} columns={DatatimeData.length} sx={{ mb: (theme) => theme.spacing(2) }}>
                {DatatimeData.map((card, index) => (
                    <Grid key={index} size={{ xs: 12, sm: 6, lg: 1 }}>
                        <NormLineChart {...card} />
                    </Grid>
                ))}
            </Grid>
        )
    }
}

export default function InterestedParty() {
    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            <Typography component="h2" variant="h4" sx={{ mb: 2 }}>
                相关方出入情况分析
            </Typography>
            <UpdateTime name={'interested_party'} />
            <HeadCard />
            <DatatimeCard />
            <NestedPie />
        </Box>
    )
}
