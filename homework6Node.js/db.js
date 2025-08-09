import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',     
  user: 'root',          
  password: '59911991MiA', 
  database: 'product_db',    
});

export default pool;