'use client'

import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import UpdateTime from '@/components/UpdateTime'
import { GetTotalData, GetErrorData, GetPieErrorData, GetPieReasonData, GetGroupData } from './lib/server'

function HeadCard() {
    const [CalibrationLineTotalData, setCalibrationLineTotalData] = React.useState<NormCardProps[] | null>(null)
    React.useEffect(() => {
        async function fetchPosts() {
            const data = await GetTotalData()
            setCalibrationLineTotalData(data)
        }
        fetchPosts()
    }, [])






    if (CalibrationLineTotalData === null) {
        const temp = Array.from({ length: 5 }, (_, i) => i)
        return (
            <Grid container spacing={2} columns={temp.length} sx={{ mb: (theme) => theme.spacing(2) }}>
                {temp.map((_, index) => (
                    <Grid key={`HeadCard_${index}`} size={{ xs: 12, sm: 6, lg: 1 }}>
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Skeleton key={`HeadCardSkeleton_${i}`} animation="wave" />
                        ))}
                    </Grid>
                ))}
            </Grid>
        )
    } else {
        return (
            <Grid container spacing={2} columns={CalibrationLineTotalData.length} sx={{ mb: (theme) => theme.spacing(2) }}>
                {CalibrationLineTotalData.map((card, index) => (
                    <Grid key={`HeadCardGrid_${index}`} size={{ xs: 12, sm: 6, lg: 1 }}>
                        <NormCard {...card} />
                    </Grid>
                ))}
            </Grid>
        )
    }
}

export default function Page() {
    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            <Typography component="h2" variant="h4" sx={{ mb: 2 }}>
                校线异常处理流程情况分析
            </Typography>
            <UpdateTime name={'calibratio_line'} />
            <HeadCard />
            <ReasonCard />
            <NestedPie />
            <ReasonPieCard />
            <GroupCard />
        </Box>
    )
}   