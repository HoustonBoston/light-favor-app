import mysql, { ConnectionOptions } from 'mysql2';
import { Dayjob } from "../../src/Objects/Dayjob"

const access: ConnectionOptions = {
    user: 'root',
    database: 'DAYJOB',
    host: 'localhost',
    port: 3306,
};

// TODO: turn this into update function
export async function save_dayjob_info (dayjobObj: Dayjob)
{
    const conn = await mysql.createConnection(access).promise();
    const { date, dayjob_number, dayjob_serial_number, user_id, dayjob_id } = dayjobObj

    if (dayjob_id === null) {  // AKA inserted for the first time ever
        console.log('dayjob_id is null: ', dayjob_id)

        try {
            const sql: string = `INSERT INTO DAYJOB (DAYJOB_DATE, DAYJOB_SERIAL_NUMBER, USER_ID, DAYJOB_NUMBER)
            VALUES (?, ?, ?, ?)`
            const [execResult] = await conn.query<mysql.ResultSetHeader>(sql, [date, dayjob_serial_number, user_id, dayjob_number])
            const dayjob_id = execResult.insertId

            return {
                status: 200,
                success: true,
                dayjob_id: dayjob_id  // ideally this is what we get
            }
        } catch (err) {
            console.error('erroring when inserting dayjob: ', err)
            return {
                status: 500,
                success: false
            }
        } finally {
            conn.end()
        }
    }
    else {
        console.log('dayjob_id is not null: ', dayjob_id)
    }
}

// returns dayjob id from user id
export async function insert_dayjob_once (user_id: number) {
    const conn = await mysql.createConnection(access).promise();
    const sql = `INSERT INTO DAYJOB (USER_ID)
                VALUES (?)`;
    
    try {
        const [execResult] = await conn.query<mysql.ResultSetHeader>(sql, [user_id]);
        const dayjob_id = execResult.insertId;

        return {
            status: 200,
            success: true,
            dayjob_id: dayjob_id
        };
    } catch (err) {
        console.error('erroring when inserting dayjob: ', err);
        return {
            status: 500,
            success: false
        };
    } finally {
        conn.end();
    }
}
