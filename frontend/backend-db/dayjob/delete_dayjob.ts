import mysql, { ConnectionOptions } from 'mysql2';

const access: ConnectionOptions = {
    user: 'root',
    database: 'DAYJOB',
    host: 'localhost',
    port: 3306,
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
