'use client'
import * as React from 'react'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

export interface NormCardProps {
    title: string,
    sub_title: string,
    sub_text: string,
    card_text: string,
    request_value: number,
    request_value_trend: boolean,
}

export default function NormCard(props: NormCardProps) {
    const CardColors = props.request_value_trend ? 'success' : 'error'
    return (
        <Card variant="outlined" sx={{ height: '100%', flexGrow: 1 }}>
            <CardContent>
                <Typography component="h2" variant="subtitle2" gutterBottom>
                    {props.title}
                </Typography>
                <Stack direction="column" sx={{ justifyContent: 'space-between', flexGrow: '1', gap: 1 }}>
                    <Stack sx={{ justifyContent: 'space-between' }}>
                        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h4" component="p">
                                {props.request_value}
                            </Typography>
                            <Chip size="small" color={CardColors} label={props.card_text} />
                        </Stack>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                            {props.sub_title}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                            {props.sub_text}
                        </Typography>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    )
}
