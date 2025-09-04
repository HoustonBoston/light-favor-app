import mysql, { ConnectionOptions } from "mysql2";
import { Part } from "../../src/Objects/Part";

const access: ConnectionOptions = {
    user: 'root',
    database: 'DAYJOB',
    host: 'localhost',
    port: 3306,
    password: '4779'
};

export async function save_parts(parts: Part[]) {
    const conn = await mysql.createConnection(access).promise();

    const toInsert = [];

    for (const part of parts) {
            const { part_type, part_number, part_serial_number, dayjob_id, flag } = part;
            if (flag === "insert") {
                toInsert.push({ part_type, part_number, part_serial_number, dayjob_id });
            }
        }

    if (toInsert.length) {
        try {
        const sql: string = `INSERT INTO PARTS (part_type, part_number, part_serial_number, dayjob_id)
        VALUES (?, ?, ?, ?)`;
            await conn.query(sql, [[toInsert]]);

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
}
