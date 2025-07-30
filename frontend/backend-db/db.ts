import mysql, { PoolOptions, ConnectionOptions } from 'mysql2';
import { Dayjob } from "../src/Objects/Dayjob"
import { Part } from "../src/Objects/Part"

const access1: PoolOptions = {
    user: 'root',
    database: 'DAYJOB',
    host: 'localhost',
    port: 3306,
    password: '4779'
};

const access: ConnectionOptions = {
    user: 'root',
    database: 'DAYJOB',
    host: 'localhost',
    port: 3306,
    password: '4779'
};


export async function save_dayjob_info(dayjobObj: Dayjob) {
    const conn = await mysql.createConnection(access).promise();
    const {date, dayjob_num, dayjob_serial_num, parts, user_id} = dayjobObj

    const sql: string = `INSERT INTO DAYJOB (DAYJOB_DATE, DAYJOB_SERIAL_NUMBER, USER_ID, DAYJOB_NUMBER)
        VALUES (?, ?, ?, ?)`

    try {
        const [execResult] = await conn.query<mysql.ResultSetHeader>(sql, [date, dayjob_serial_num, user_id, dayjob_num])

        const dayjob_id = execResult.insertId

        const partsArray = []

        for (let i = 0; i < parts.length; ++i) {
            const { part_type, part_num, part_serial_num } = parts[i]
            partsArray.push([part_type, part_num, part_serial_num, dayjob_id])
        }

        try {
            const sql2: string = `INSERT INTO PARTS (PART_TYPE, PART_NUMBER, PART_SERIAL_NUMBER, DAYJOB_ID) VALUES ?`
            conn.query(sql2, [partsArray])
        } catch (err) {
            console.error('erroring when inserting parts: ', err)
        }
    } catch (err) {
        console.error('errorong when inserting dayjob: ', err)
    }
}

export function delete_part() {

}

export function update_part() {

}
