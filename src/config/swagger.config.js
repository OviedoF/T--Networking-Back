const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

// Metadata de la API

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: "Networking App - Backend Docs",
            version: "1.0.0"
        }
    },
    apis: [
        path.join(__dirname, 'database.js')
    ]
}

// Documentacion en formato JSON

const swaggerSpec = swaggerJSDoc(options);

// Seteamos nuestra documentación 

const swaggerDocs = (app, port) => {
    app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    app.get('/docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });

    console.log(`[SWAGGER] 📖📃 Version ${options.definition.info.version} docs is available on http://localhost:${port}`)
}

module.exports = {
    swaggerDocs
};