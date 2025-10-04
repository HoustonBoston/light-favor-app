import mysql, { ConnectionOptions } from 'mysql2';

import 'dotenv/config';

const access: ConnectionOptions = {
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
};

export async function delete_dayjob (dayjob_id: number) {
    const conn = await mysql.createConnection(access).promise();
    const sql: string = `DELETE FROM DAYJOB WHERE DAYJOB_ID = ?`;
    try {
        const [result] = await conn.query(sql, [dayjob_id]);
        return { status: 200, success: true };
    } catch (error: any) {
        console.error('some error with query:', error);
        return { status: 500, success: false };
    } finally {
        await conn.end();
    }
}
