import http from "http";
import fs from "fs";

const server = http.createServer((req, res) => {
  console.log('Пришёл запрос—тестируем ошибку!');

  try {
    throw new Error('Что-то пошло не так!');
  } catch (err) {
    console.log('Поймали ошибку:', err.message);

    
    fs.appendFile('errors.log', `${new Date().toISOString()} - ${err.message}\n`, (fileErr) => {
      if (fileErr) {
        console.error('Ошибка при записи в errors.log:', fileErr.message);
        return;
      }
      console.log('Ошибка записана в errors.log');
    });
  res.writeHead(500, { 'Content-Type': 'text/plain'});
    res.end('Internal Server Error');
  }
});

server.listen(3000, () => {
  console.log('Сервер запущен: http://localhost:3000');
});
