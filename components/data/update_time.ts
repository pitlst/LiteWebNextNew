'use server'
import InitDBConnect from "@/utils/db";

/**
 * 获取数据更新时间的服务端函数
 * 
 * @async
 * @param {UpdateTimeProps} props - 更新时间组件的属性
 * @param {string} props.name - 更新时间记录的标识名称
 * 
 * @description
 * 该函数负责从数据库中获取特定数据集的最后更新时间：
 * 1. 通过 InitDBConnect 建立 MongoDB 数据库连接
 * 2. 在 "liteweb" 数据库的 "update_time" 集合中查询
 * 3. 使用 name 参数作为查询条件，获取对应的时间记录
 * 4. 对查询结果进行处理：
 *    - 如果找到记录：将时间值转换为字符串
 *    - 如果未找到记录：返回默认文本
 * 
 * @example
 * ```tsx
 * // 在组件中使用
 * const lastUpdate = await GetUpdateTime({ name: "data_refresh" });
 * if (lastUpdate !== "暂无更新时间") {
 *   console.log(`数据最后更新于: ${lastUpdate}`);
 * }
 * ```
 * 
 * @returns {Promise<string>} 返回一个 Promise，解析为：
 * - 成功找到记录时：返回时间的字符串表示
 * - 未找到记录时：返回 "暂无更新时间"
 * 
 * @throws {Error} 可能在以下情况抛出错误：
 * - 数据库连接失败
 * - 查询操作异常
 */
export default async function GetUpdateTime(name: string): Promise<string> {
    const client = await InitDBConnect();
    const updateTime_data = await client.db("liteweb").collection("update_time").findOne({ name: name });
    return updateTime_data ? String(updateTime_data.time) : '暂无更新时间';
}