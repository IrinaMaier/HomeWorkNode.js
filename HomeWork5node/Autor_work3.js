import http from 'http';

const server =http.createServer((req, res)=>{
    console.log(`запрос пришел :${req.method}`);

    if(req.method==='PUT'){
        console.log('Обертка PUT');
        res.writeHead(200,{'Content-Type': 'text/plain' });
        res.end('PUT-запрос обработан');
    }else if(req.method==='DELETE'){
        console.log('DELETE запрос обработан');
        res.writeHead(200,{ 'Content-Type': 'text/plain' });
    res.end('DELETE-запрос обработан');
    }else {
    console.log('Метод не поддерживается:', req.method);
    res.writeHead(405, {'Content-Type': 'text/plain'});
    res.end('Метод не поддерживается');
  }
});
server.listen(3000, () => {
  console.log('Сервер  запущен: http://localhost:3000');
});