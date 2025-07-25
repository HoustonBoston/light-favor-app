import * as mysql from "mysql2"

const connection: mysql.Connection = mysql.createConnection({
    "host": "localhost",
    "user": "root",
    "password": ""
})

connection.connect((err: mysql.QueryError | null) => {
    if (err) throw err
    console.log('connected!')
})
