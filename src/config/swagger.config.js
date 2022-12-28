const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs-extra')
const path = require('path');

// Metadata de la API

const routeFiles = fs.readdirSync(path.join(__dirname, '..', 'routes')).filter( (file) => file.endsWith(".js") );
const routes = []

routeFiles.forEach( (file) => {
    //app.use(`/api/${file.split('.')[0]}`, require(path.join(__dirname, 'routes', file)));
    routes.push(path.join(__dirname, '..', 'routes', `${file}.routes.js`))
})

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: "Networking App - Backend Docs",
            version: "1.0.0"
        }
    },
    apis: [
        path.join(__dirname, '..', 'routes', 'auth.routes.js'),
        path.join(__dirname, '..', 'routes', 'categories.routes.js'),
        path.join(__dirname, '..', 'routes', 'changePassword.routes.js'),
        path.join(__dirname, '..', 'routes', 'coupon.routes.js'),
        path.join(__dirname, '..', 'routes', 'createSubscription.routes.js'),
        path.join(__dirname, '..', 'routes', 'history.routes.js'),
        path.join(__dirname, '..', 'routes', 'news.routes.js'),
        path.join(__dirname, '..', 'routes', 'orders.routes.js'),
        path.join(__dirname, '..', 'routes', 'payments.routes.js'),
        path.join(__dirname, '..', 'routes', 'product.routes.js'),
        path.join(__dirname, '..', 'routes', 'qr.routes.js'),
        path.join(__dirname, '..', 'routes', 'subscription.routes.js'),
        path.join(__dirname, '..', 'routes', 'users.routes.js')
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