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

/**
 * NormCard 组件 - 用于显示带有状态指示的数据卡片
 * 
 * @component
 * @param {Object} props - 组件属性
 * @param {string} props.title - 卡片标题
 * @param {string} props.request_value - 主要显示的数值
 * @param {boolean} props.request_value_trend - 数值趋势（true 表示积极/上升，false 表示消极/下降）
 * @param {string} props.card_text - Chip 组件显示的文本
 * @param {string} props.sub_title - 副标题文本
 * @param {string} props.sub_text - 附加说明文本
 * 
 * @returns {JSX.Element} 返回一个 Material-UI Card 组件，包含：
 * - 标题区域（Typography h2）
 * - 主要数值显示（Typography h4）
 * - 状态指示器（Chip，根据 request_value_trend 显示不同颜色）
 * - 副标题和说明文本（Typography caption）
 */
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
