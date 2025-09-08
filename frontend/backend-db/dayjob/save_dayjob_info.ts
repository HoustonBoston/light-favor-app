import mysql, { ConnectionOptions } from 'mysql2';

const access: ConnectionOptions = {
    user: 'root',
    database: 'DAYJOB',
    host: 'localhost',
    port: 3306,
};

// TODO: turn this into update function
export async function update_dayjob_info ({ dayjob_number, dayjob_serial_number, dayjob_id }: {
    dayjob_number?: number,
    dayjob_serial_number?: number,
    dayjob_id: number
})
{
    const conn = await mysql.createConnection(access).promise();
    if (dayjob_id === undefined || dayjob_serial_number === undefined || dayjob_number === undefined) {
        console.error('dayjob_id, dayjob_serial_number, or dayjob_number is undefined: ', dayjob_id, dayjob_serial_number, dayjob_number)
        return {
            status: 500,
            success: false,
            message: 'dayjob_id, dayjob_serial_number, or dayjob_number is undefined'
        }
    }

    try {
        const sql: string = `UPDATE DAYJOB SET dayjob_number = ?, dayjob_serial_number = ? WHERE dayjob_id = ?`;
        const [execResult] = await conn.query<mysql.ResultSetHeader>(sql, [dayjob_number, dayjob_serial_number, dayjob_id])
        console.log('execResult from updating dayjob: ', execResult)
        return {
            status: 200,
            success: true,
        }
    } catch (err) {
        console.error('erroring when updating dayjob: ', err)
        return {
            status: 500,
            success: false
        }
    } finally {
        conn.end()
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
