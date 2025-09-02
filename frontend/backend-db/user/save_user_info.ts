import mysql, { ConnectionOptions } from "mysql2";

const access: ConnectionOptions = {
    user: 'root',
    database: 'DAYJOB',
    host: 'localhost',
    port: 3306,
    password: '4779'
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
    const sql: string = `INSERT INTO DAYJOB_USER (DAYJOB_USER_EMAIL) VALUES (?) 
    ON DUPLICATE KEY UPDATE 
        DAYJOB_USER_ID = LAST_INSERT_ID(DAYJOB_USER_ID)`

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
