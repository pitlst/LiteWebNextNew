'use server'

import InitDBConnect from '@/components/data/db'

export default async function GetHomeData() {
    const client = await InitDBConnect()
    const db = client.db('liteweb')
    const collection = db.collection('home_link_data')
    const result = await collection.find({}).toArray()
    // 确保result是数组类型
    if (!Array.isArray(result)) {
        console.error('查询结果不是数组类型')
        return []
    }
    
}