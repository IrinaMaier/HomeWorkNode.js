import db from './db.js';

const createTable = async () => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(10,2) NOT NULL
      )
    `);


    console.log('Таблица успешно создана или уже существует');
  }catch(error){
    console.error('Ошибка при созданиии таблицы:', error.message);
    }finally{
        process.exit();
    }
};
createTable();