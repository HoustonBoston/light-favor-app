import mysql, { ConnectionOptions } from "mysql2";
import { Part } from "../../src/Objects/Part";

const access: ConnectionOptions = {
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    password: process.env.DB_PASSWORD
};

export async function update_part(part: Part) { 
    const conn = await mysql.createConnection(access).promise();
    const { part_id, part_number, part_serial_number } = part;
    const sql: string = `UPDATE PARTS SET part_number = ?, part_serial_number = ? WHERE part_id = ?`;
    try {
        const [execResult] = await conn.query<mysql.ResultSetHeader>(sql, [part_number, part_serial_number, part_id]);
        console.log('execResult from updating part: ', execResult);
        return {
            status: 200,
            success: true
        };
    } catch (error) {
        console.error('Error updating part:', error);
        return {
            status: 500,
            success: false
        };
    } finally {
        conn.end();
    }
}
