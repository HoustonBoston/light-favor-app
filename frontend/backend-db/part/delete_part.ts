import mysql, { ConnectionOptions } from "mysql2";

const access: ConnectionOptions = {
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    password: process.env.DB_PASSWORD
};

export async function delete_part (part_id: number) {
    const conn = await mysql.createConnection(access).promise();

    try {
        const sql: string = `DELETE FROM PARTS WHERE part_id = ?`;
        await conn.query(sql, [part_id]);

        return {
            status: 200,
            success: true
        };
    } catch (err) {
        console.error('erroring when deleting part: ', err);
        return {
            status: 500,
            success: false
        };
    } finally {
        conn.end();
    }
}
