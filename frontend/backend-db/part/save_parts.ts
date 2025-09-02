import mysql, { ConnectionOptions } from "mysql2";
import { Part } from "../../src/Objects/Part";

const access: ConnectionOptions = {
    user: 'root',
    database: 'DAYJOB',
    host: 'localhost',
    port: 3306,
    password: '4779'
};

export async function save_parts(part: Part) {
    const conn = await mysql.createConnection(access).promise();
    const { part_number, part_serial_number, dayjob_id } = part;

    try {
        const sql: string = `INSERT INTO PARTS (PART_TYPE, PART_NUMBER, PART_SERIAL_NUMBER, DAYJOB_ID)
        VALUES (?, ?, ?, ?)`;
        await conn.query(sql, [part_type, part_number, part_serial_number, dayjob_id]);

        return {
            status: 200,
            success: true
        };
    } catch (err) {
        console.error('erroring when inserting parts: ', err);
        return {
            status: 500,
            success: false
        };
    } finally {
        conn.end();
    }
}
