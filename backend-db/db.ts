import mysql, { PoolOptions } from 'mysql2';

const access: PoolOptions = {
    user: 'root',
    database: 'DAYJOB',
    host: 'localhost',
    port: 3306,
    password: '4779'
};

const conn = mysql.createPool(access);

const sql: string = ''

const result = conn.execute(sql)

// console.log(result.)
