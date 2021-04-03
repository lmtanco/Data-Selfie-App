// Código del servidor: index.js
const { response } = require('express');
const express = require('express');
const Datastore = require('nedb');
const app=express();
app.listen(3001, () => console.log('listening at 3001'));   // Arranca el servidor Express 
                                                            // y lo pone a escuachar en 3001
app.use(express.static('public'));                          // Primera función: 
                                                            // servir páginas estáticas: Todo lo que esté en la carpeta public es público
app.use(express.json({limit:'1mb'}));                       // Segunda: parsear json. 

const database = new Datastore('database.db');
database.loadDatabase();

// Ruta para los gets (cliente <- servidor)
app.get('/api',(request,response) =>
{
    console.log('I got a get request!');
    console.log(request.body);
    database.find({}, (err,data) => {
        if (err) {
            console.log("ERROR IN DB")
            response.end();
            return;
        } else {
            response.json(data);
        }
    });
});

// Ruta para los posts (cliente -> servidor)
app.post('/api',(request,response) => 
{
    console.log('I got a post request!');
    console.log(request.body);
    const data = request.body;
    data.timestamp = Date.now();
    database.insert(data);
    response.json({
        status: 'guay',
        data: data,
    });
});

