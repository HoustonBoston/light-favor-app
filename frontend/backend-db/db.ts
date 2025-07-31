import mysql, { ConnectionOptions } from 'mysql2';
import { Dayjob } from "../src/Objects/Dayjob"

// const access1: PoolOptions = {
//     user: 'root',
//     database: 'DAYJOB',
//     host: 'localhost',
//     port: 3306,
//     password: '4779'
// };

const access: ConnectionOptions = {
    user: 'root',
    database: 'DAYJOB',
    host: 'localhost',
    port: 3306,
    password: '4779'
};


export async function save_dayjob_info(dayjobObj: Dayjob) {
    const conn = await mysql.createConnection(access).promise();
    const { date, dayjob_num, dayjob_serial_num, parts, user_id, dayjob_id, flag } = dayjobObj

    if (dayjob_id === null) {  // AKA inserted for the first time ever
        console.log('dayjob_id is null: ', dayjob_id)

        try {
            const sql: string = `INSERT INTO DAYJOB (DAYJOB_DATE, DAYJOB_SERIAL_NUMBER, USER_ID, DAYJOB_NUMBER)
            VALUES (?, ?, ?, ?)`
            const [execResult] = await conn.query<mysql.ResultSetHeader>(sql, [date, dayjob_serial_num, user_id, dayjob_num])
            const dayjob_id = execResult.insertId
            const partsArray = []

            for (let i = 0; i < parts.length; ++i) {
                const { part_type, part_num, part_serial_num } = parts[i]
                partsArray.push([part_type, part_num, part_serial_num, dayjob_id])
            }

            try {
                const sql2: string = `INSERT INTO PARTS (PART_TYPE, PART_NUMBER, PART_SERIAL_NUMBER, DAYJOB_ID) VALUES ?`
                if (partsArray.length)  // has 1+ element
                    await conn.query(sql2, [partsArray])
            } catch (err) {
                console.error('erroring when inserting parts: ', err)
                return {
                    status: 500,
                    success: false
                }   
            }

            return {
                status: 200,
                success: true,
                dayjob_id: dayjob_id  // ideally this is what we get
            }
        } catch (err) {
            console.error('errorong when inserting dayjob: ', err)
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

        const partsToInsertArray = []
        const partsToUpdateArray = []

        for (let i = 0; i < parts.length; ++i) {
            const { part_type, part_num, part_serial_num, flag } = parts[i]
            
            // check if flag is insert or update
            if (flag === "insert")
                partsToInsertArray.push([part_type, part_num, part_serial_num, dayjob_id])
            else if (flag === "update")
                partsToUpdateArray.push([part_type, part_num, part_serial_num, dayjob_id])
        }

        try {
            if (partsToInsertArray.length) {
                const sql2: string = `INSERT INTO PARTS (PART_TYPE, PART_NUMBER, PART_SERIAL_NUMBER, DAYJOB_ID) VALUES ?`
                await conn.query(sql2, [partsToInsertArray])
            }

            return {
                status: 200,
                success: true
            }
        } catch (err) {
            console.error('erroring when inserting parts: ', err)
            return {
                status: 500,
                success: false
            }
        }
    }
}

export function delete_part() {

}

export function update_part() {

}
