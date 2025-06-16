'use server'

import 'server-only'

import init_ameliorate from '@/test/ameliorate'
import init_link_page from '@/test/link_page'
import init_calibration_line_analysis from '@/test/error/calibration_line/analysis'
import init_calibration_line_detail from '@/test/error/calibration_line/detail'
import init_interested_party_analysis from '@/test/interested_party/analysis'
import init_interested_party_detail from '@/test/interested_party/detail'
import { MongoClient } from 'mongodb'

export default async function init_test(client: MongoClient){
    await init_ameliorate(client)
    await init_link_page(client)
    await init_calibration_line_analysis(client)
    await init_calibration_line_detail(client)
    await init_interested_party_analysis(client)
    await init_interested_party_detail(client)
}