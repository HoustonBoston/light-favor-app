import mysql, { ConnectionOptions } from "mysql2";

const access: ConnectionOptions = {
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    password: process.env.DB_PASSWORD
};

/**
 * 
 * @param user_email 
 * @returns {
 *  user_id: number
 * }
 */
export async function get_user_id (user_email: string)
{
    // single operation to retrieve id even if it doesn't exist
    const conn = await mysql.createConnection(access).promise()
    const sql: string = `INSERT INTO DAYJOB_USER (user_email) VALUES (?) 
    ON DUPLICATE KEY UPDATE 
        user_id = LAST_INSERT_ID(user_id)`

    try {
        const [result] = await conn.query<mysql.ResultSetHeader>(sql, [user_email])
        return { status: 200, success: true, user_id: result.insertId }
    } catch (error: any) {
        console.error('some error with query:', error)
        return { status: 500, success: false }
    } finally {
        conn.end()
    }
}
