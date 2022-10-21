const { io, ExpressApp, server } = require('./server');


ExpressApp.get('/dash', (req, res) => {
    io.sockets.emit('aconnection');
    res.render('pages/home');
});


// Listen for HTTP
ExpressApp.listen(80)
// Listen for HTTPS
server.listen(443)