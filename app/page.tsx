'use client'
import * as React from'react'
import NormPieChart, { NormPieChartProps } from '@/components/NormPieChart'


export default function Home() {
    const data_nocard : NormPieChartProps = {
        index: 0,
        title: 'title',
        have_card: false,
        is_horizontal: false,
        data: [
            {
                id: 0,
                label: 'label',
                value: 100,
            },
            {
                id: 1,
                label: 'label',
                value: 100,
            }
        ]
    }
    return (
        <div >
            <NormPieChart {...data_nocard}/>
        </div>
    )
}
