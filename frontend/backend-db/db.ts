import mysql, { PoolOptions } from 'mysql2';
import { Dayjob } from "../src/Objects/Dayjob"
import { Part } from "../src/Objects/Part"

const access: PoolOptions = {
    user: 'root',
    database: 'DAYJOB',
    host: 'localhost',
    port: 3306,
    password: '4779'
};

const conn = mysql.createPool(access);


export function save_dayjob_info(dayjobObj: Dayjob) {
    
}

export function delete_part() {

}

export function update_part() {

}
