/**
 * 将分钟数转换为可读的时间格式
 *
 * @function formatMinutes
 * @param {number} minutes - 需要格式化的分钟数（必须为非负数）
 *
 * @description
 * 该函数将输入的分钟数转换为更易读的时间格式，支持以下场景：
 * - 当只有分钟时（小于60分钟），返回 "X分钟"
 * - 当只有小时时（能被60整除），返回 "X小时"
 * - 当同时有小时和分钟时，返回 "X小时Y分钟"
 *
 * 处理步骤：
 * 1. 使用 Math.floor 计算小时数
 * 2. 使用取模运算符计算剩余分钟数
 * 3. 根据计算结果选择合适的输出格式
 *
 * @returns {string} 返回格式化后的时间字符串
 *
 * @example
 * ```ts
 * formatMinutes(90)  // 返回 "1小时30分钟"
 * formatMinutes(45)  // 返回 "45分钟"
 * formatMinutes(120) // 返回 "2小时"
 * formatMinutes(0)   // 返回 "0分钟"
 * ```
 *
 * @throws {Error} 如果输入的分钟数为负数，将抛出错误
 */
export function formatMinutes(minutes: number): string {
    // 计算小时数（向下取整）
    const hours = Math.floor(minutes / 60)
    // 计算剩余分钟数
    const remainingMinutes = minutes % 60
    // 根据小时和分钟数的情况返回不同格式
    if (hours === 0) {
        return `${remainingMinutes}分钟`
    } else if (remainingMinutes === 0) {
        return `${hours}小时`
    } else {
        return `${hours}小时${remainingMinutes.toFixed(0)}分钟`
    }
}

/**
 * 获取最近30天的日期列表
 * 
 * @function getLast30Days
 * 
 * @description
 * 该函数生成最近30天的日期列表（包含今天），具有以下特点：
 * 1. 返回一个包含30个日期字符串的数组
 * 2. 日期格式采用中文本地化显示（年、月、日）
 * 3. 日期从最早到最近排序（29天前到今天）
 * 
 * 处理步骤：
 * 1. 获取当前日期作为基准
 * 2. 循环生成前29天的日期
 * 3. 将每个日期转换为本地化字符串格式
 * 
 * @returns {string[]} 返回包含30个日期字符串的数组，格式如："2024年1月1日"
 * 
 * @example
 * ```ts
 * const dates = getLast30Days()
 * // 返回类似 ["2023年12月3日", "2023年12月4日", ..., "2024年1月1日"]
 * ```
 */
export function getLast30Days() {
    const days = []
    const today = new Date()

    for (let i = 29; i >= 0; i--) {
        const date = new Date()
        date.setDate(today.getDate() - i)
        const name = date.toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        })
        days.push(name)
    }
    return days
}


export function getLast12Months() {
    const months = []
    const today = new Date()

    for (let i = 11; i >= 0; i--) {
        const date = new Date()
        date.setMonth(today.getMonth() - i)
        const monthName = date.toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'short',
        })
        months.push(monthName)
    }

    return months
}