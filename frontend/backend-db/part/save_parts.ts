import mysql, { ConnectionOptions } from "mysql2";

const access: ConnectionOptions = {
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
};

export async function insert_part_once(dayjob_id: number, part_type: string) {
    const conn = await mysql.createConnection(access).promise();
    const sql = `INSERT INTO PARTS (dayjob_id, part_type) VALUES (?, ?)`;
    try {
        const [execResult] = await conn.query<mysql.ResultSetHeader>(sql, [dayjob_id, part_type]);

        return {
            status: 200,
            success: true,
            part_id: execResult.insertId
        }
    } catch (error) {
        console.error('Error saving part:', error);
        return {
            status: 500,
            success: false
        };
    } finally {
        conn.end();
    }
}
