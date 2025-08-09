import http from 'http';
import fs from 'fs';


const server = http.createServer((req, res) => {
  try {
    throw new Error('Simulated server error');
  } catch (error) {
    const errorMessage = `[${new Date().toISOString()}] ${error.message}\n`;

    fs.appendFile('errors.log', errorMessage, (err) => {
      if (err) {
        console.error('Ошибка при записи в errors.log:', err.message);
      }
    });

    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Internal Server Error');
  }
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
