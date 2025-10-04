import mysql, { ConnectionOptions } from 'mysql2';

const access: ConnectionOptions = {
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    password: process.env.DB_PASSWORD
};

export async function get_parts (dayjob_id: number) {
    const conn = await mysql.createConnection(access).promise();
    const sql: string = `SELECT * FROM PARTS WHERE dayjob_id = ?`;
    try {
        const [rows] = await conn.query(sql, [dayjob_id]);
        return { status: 200, success: true, parts_arr: rows };
    } catch (error: any) {
        console.error('some error with query:', error);
        return { status: 500, success: false };
    } finally {
        conn.end();
    }
}
