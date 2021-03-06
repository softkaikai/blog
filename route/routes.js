var routes = require('./handlers');

module.exports = function(app) {

    app.get('/', routes.index);
    app.get('/u/:user', routes.user);
    app.post('/publish', routes.publish);
    app.post('/delete', routes.delete);
    app.get('/reg', routes.reg);
    app.post('/reg', routes.doReg);
    app.get('/login', routes.login);
    app.post('/login', routes.doLogin);
    app.get('/logout', routes.logout);
    app.get('/search', routes.search);
    app.post('/dosearch', routes.dosearch);
    app.use(routes.do404);
    app.use(routes.do500);
};

