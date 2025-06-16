export function formatMinutes(minutes: number): string {
    // 计算小时数（向下取整）
    const hours = Math.floor(minutes / 60)
    // 计算剩余分钟数
    const remainingMinutes = minutes % 60
    // 根据小时和分钟数的情况返回不同格式
    if (hours === 0) {
        return `${remainingMinutes.toFixed(0)}分钟`
    } else if (remainingMinutes === 0) {
        return `${hours}小时`
    } else {
        return `${hours}小时${remainingMinutes.toFixed(0)}分钟`
    }
}
