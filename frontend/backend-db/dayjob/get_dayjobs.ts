import mysql, { ConnectionOptions } from 'mysql2';

const access: ConnectionOptions = {
    user: 'root',
    database: 'DAYJOB',
    host: 'localhost',
    port: 3306,
};

export async function get_dayjobs (user_id: number) {
    const conn = await mysql.createConnection(access).promise();
    const sql: string = `SELECT * FROM DAYJOB WHERE USER_ID = ?`;
    try {
        const [rows] = await conn.query(sql, [user_id]);
        return { status: 200, success: true, dayjob_arr: rows };
    } catch (error: any) {
        console.error('some error with query:', error);
        return { status: 500, success: false };
    } finally {
        conn.end();
    }
}
