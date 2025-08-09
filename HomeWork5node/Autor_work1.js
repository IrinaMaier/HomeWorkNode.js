import http from "http";

const server=http.createServer((req, res)=>{
    console.log('Пришел запрос!');

    const authHeader=req.headers['authorization'];

    if(authHeader===undefined){
        res.writeHead(401,{'Content-Type':'text/plain'});
        res.end('Unauthorized');
        return;
    }

    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Authorization header received');
});

server.listen(3000, () => {
  console.log('Сервер запущен: http://localhost:3000');
});