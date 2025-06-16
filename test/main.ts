'use server'

import 'server-only'
import { MongoClient } from 'mongodb'

import init_ameliorate from '@/test/ameliorate'
import init_link_page from '@/test/link_page'

export default async function init_test(client: MongoClient){
    await init_ameliorate(client)
    await init_link_page(client)
}