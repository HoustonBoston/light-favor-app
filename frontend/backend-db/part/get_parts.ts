import mysql, { ConnectionOptions } from 'mysql2';

const access: ConnectionOptions = {
    user: 'root',
    database: 'DAYJOB',
    host: 'localhost',
    port: 3306,
    password: '4779'
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
