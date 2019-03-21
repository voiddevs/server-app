import  Server  from "./classes/server";
import mongoose from 'mongoose';

import cors from 'cors';

import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';

import userRoutes from "./routes/usuario";
import postRoutes from "./routes/post";

const server = new Server();


// Body Parser
server.app.use( bodyParser.urlencoded({ extended: true }));
server.app.use( bodyParser.json() );


// FILE UPLOAD
server.app.use( fileUpload() );


// CONFIGURAR CORS
server.app.use( cors({ origin: true, credentials: true }) );


//Rutas de mi aplicación
server.app.use('/user', userRoutes);
server.app.use('/posts', postRoutes);

//Conectar DB
mongoose.connect('mongodb://localhost:27017/fotosgram', {
    useNewUrlParser: true, useCreateIndex: true
}, (err) => {
    if ( err ) throw err;

    console.log('Base de datos ONLINE');
});

//Levantar express
server.start( () => {
    console.log(`Servidor Corriendo en puerto ${ server.port | 3000 }`);
});