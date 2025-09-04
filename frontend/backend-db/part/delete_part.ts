import mysql, { ConnectionOptions } from "mysql2";

const access: ConnectionOptions = {
    user: 'root',
    database: 'DAYJOB',
    host: 'localhost',
    port: 3306,
};

export async function delete_part (part_id: number) {
    const conn = await mysql.createConnection(access).promise();

    try {
        const sql: string = `DELETE FROM PARTS WHERE id = ?`;
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
