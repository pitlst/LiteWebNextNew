'use server'

import 'server-only'
import chalk from 'chalk'
import init_connect from '@/lib/db'

// 定义日志级别枚举
export enum LogLevel {
    DEBUG = 'DEBUG',
    INFO = 'INFO',
    WARNING = 'WARN',
    ERROR = 'ERROR',
    CRITICAL = 'CRITICAL',
}
// 日志数据库是否初始化的标志位
let init_label: boolean = false
// 日志所处的数据库集合名称
const logger_db_name = 'logger'
const logger_coll_name = 'web_logger'

async function init_database() {
    const client = await init_connect()
    const database = client.db(logger_db_name)
    if (!init_label) {
        const collections = await database.listCollections().toArray()
        const collectionNames = collections.map((collection: { name: string }) => collection.name)
        if (!collectionNames.includes(logger_coll_name)) {
            database.createCollection(logger_coll_name)
            database.collection(logger_coll_name).createIndex({ timestamp: 1 })
        }
        init_label = true
    }
    return database.collection(logger_coll_name)
}

export default async function log(level: LogLevel, msg: string) {
    const coll = await init_database()
    switch (level) {
        case LogLevel.INFO:
            console.log(chalk.cyan(msg))
            break
        case LogLevel.WARNING:
            console.log(chalk.yellow(msg))
            break
        case LogLevel.ERROR:
            console.log(chalk.red(msg))
            break
        case LogLevel.CRITICAL:
            console.log(chalk.bgWhite(msg))
            break
        case LogLevel.DEBUG:
        default:
            console.log(msg)
            break
    }
    await coll.insertOne({
        timestamp: new Date(),
        level: LogLevel.DEBUG,
        message: msg,
    })
}

export async function log_debug(msg: string) {
    await log(LogLevel.DEBUG, msg)
}

export async function log_info(msg: string) {
    await log(LogLevel.INFO, msg)
}

export async function log_warn(msg: string) {
    await log(LogLevel.WARNING, msg)
}

export async function log_error(msg: string) {
    await log(LogLevel.ERROR, msg)
}

export async function log_critical(msg: string) {
    await log(LogLevel.CRITICAL, msg)
}
