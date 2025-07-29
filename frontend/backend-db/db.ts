import mysql, { PoolOptions, ConnectionOptions } from 'mysql2';
import { Dayjob } from "../src/Objects/Dayjob"
import { error } from 'console';

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
    const conn = mysql.createConnection(access);
    const {date, dayjob_num, dayjob_serial_num, parts, user_id} = dayjobObj
    const sql: string = `INSERT INTO DAYJOB (DAYJOB_DATE, DAYJOB_SERIAL_NUMBER, USER_ID, DAYJOB_NUMBER)
        VALUES (?, ?, ?, ?)`

    conn.execute(sql, [date, dayjob_serial_num, user_id, dayjob_num],
        (err, result) => {
            if (err) {
                console.error('error from save_dayjob_info: ', err)
            } else {
                console.log('query sent successfully')
                return result
            }
        }
    )
}

export function delete_part() {

}

export function update_part() {

}
