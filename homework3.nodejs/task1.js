//1 задача


const fs= require('fs');

fs.mkdir('myFolder', (err)=>{
    if(err){
        console.error('Не удалось создать папку', err)
        rerurn;
    }
    console.log('Папка успешно создана');
});

fs.rmdir('myFolder', (err)=>{
    if(err){
        console.error('Не удалось удалить папку', err)
        rerurn;
    }
    console.log('Папка успешно удалена');
});


