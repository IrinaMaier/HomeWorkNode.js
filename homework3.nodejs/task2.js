const fs=require('fs');

fs.writeFile('info.txt', 'Node.js is awesome!', (err)=>{
    if(err){
        console.error('Ошибка записи файла', err);
        return;
    }
    console.log('Файл info.txt успешно создан и записан!');

    fs.readFile('info.txt', 'utf8', (err, data)=>{
        if(err){
            console.error('Не удалось прочитать файл', err);
            return;
        }
        console.log('Содержимое файла info.txt:');
        console.log(data);
    });
});