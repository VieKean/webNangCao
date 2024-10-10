import mysql2 from 'mysql2';

const pool = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    database: 'webnangcao_node',
    password: ''
});
const connection = pool.promise();
export default connection