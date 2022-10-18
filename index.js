const { io, ExpressApp, server } = require('./server');









ExpressApp.get('/dash', (req, res) => {
    res.render('pages/home');
});






// Listen for HTTP
ExpressApp.listen(80, () => {

});

// Listen for HTTPS
server.listen(443, () => {

})