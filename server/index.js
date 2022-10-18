const fs = require('fs');
const path = require('path');
const express = require('express');
const https = require('https');
const cors = require('cors');
const { Server } = require("socket.io");

const ExpressApp = express();
const key = fs.readFileSync(path.resolve(__dirname) + '/key.pem');
const cert = fs.readFileSync(path.resolve(__dirname) + '/cert.pem');
const server = https.createServer({ key: key, cert: cert }, ExpressApp);
let io = new Server(server);
console.log(path.resolve(__dirname) + '../public');
ExpressApp.set('view engine', 'ejs');
ExpressApp.use('/', express.static(path.resolve(__dirname) + '/../public'))

ExpressApp.use(cors());
ExpressApp.set('view engine', 'ejs');
ExpressApp.use('/', express.static(path.resolve(__dirname) + '../public'))
ExpressApp.use((req, res, next) => {
    res.header('Access-Control-Allow-Headers, *, Access-Control-Allow-Origin', 'Origin, X-Requested-with, Content_Type,Accept,Authorization', 'https://www.youtube.com');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
});

// Redirect to HTTPS
ExpressApp.all('*', function (req, res, next) {
    if (req.secure) {
        return next();
    }
    res.redirect('https://' + req.hostname + req.url);
});

// Auto parse JSON request.body
ExpressApp.use(express.json());

exports.io = io;
exports.ExpressApp = ExpressApp;
exports.server = server