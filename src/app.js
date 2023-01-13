const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs-extra');
require('dotenv').config();
const createInitialRoles = require(path.join(__dirname, 'seeds', 'initialRoles'));
const createInitialAdmin = require(path.join(__dirname, 'seeds', 'initialAdmin'));
const createInitialMemberships = require(path.join(__dirname, 'seeds', 'memberships.seed'));
const createInitialCategories = require(path.join(__dirname, 'seeds', 'categories.seed'));
const createNetworking = require(path.join(__dirname, 'seeds', 'networking.seed'));
const InitAgenda = require(path.join(__dirname, 'libs', 'InitAgenda'));

// initialize
require(path.join(__dirname, 'database.js'));
const app = express();
app.use(cors({
    origin: '*'
}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(require(path.join(__dirname, 'config', 'multer.config')));

// configs
InitAgenda();

// seeds
createInitialCategories();
createInitialMemberships();
createInitialRoles();
createInitialAdmin();
createNetworking();

// routes
const routeFiles = fs.readdirSync(path.join(__dirname, 'routes')).filter( (file) => file.endsWith(".js") );

routeFiles.forEach( (file) => {
    app.use(`/api/${file.split('.')[0]}`, require(path.join(__dirname, 'routes', file)));
    console.log(`Route: /api/${file.split('.')[0]} loaded!` );
});

console.log(routeFiles);

module.exports = app; 