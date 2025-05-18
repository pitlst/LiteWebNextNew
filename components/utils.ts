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