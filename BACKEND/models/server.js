const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.pathRoutes = {
            auth: '/api/auth',
            tarea: '/api/tarea',
            subtarea: '/api/subtarea',
            categoria: '/api/categoria',
            estado: '/api/estado',
        };

        //Conectar DB
        this.conectarDB();

        //Ejecutar middlewares
        this.middlewares();

        //Ejecutar rutas
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

    }

    routes(){
        this.app.use(this.pathRoutes.auth, require('../routes/auth.routes'));
        this.app.use(this.pathRoutes.tarea, require('../routes/tarea.routes'));
        this.app.use(this.pathRoutes.subtarea, require('../routes/subtarea.routes'));
        this.app.use(this.pathRoutes.categoria, require('../routes/categoria.routes'));
        this.app.use(this.pathRoutes.estado, require('../routes/estados.routes'));
    }


    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidor ejecutandose en el puerto ${this.port}`);
        });
    }

}

module.exports = Server;