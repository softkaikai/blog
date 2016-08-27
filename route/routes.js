var routes = require('./handlers');

module.exports = function(app) {

    app.get('/', routes.index);
    app.get('/u/:user', routes.user);
    app.post('/post', routes.post);
    app.get('/reg', routes.reg);
    app.post('/reg', routes.doReg);
    app.get('/login', routes.login);
    app.post('/login', routes.doLogin);
    app.get('/logout', routes.logout);
    app.use(routes.do404);
    app.use(routes.do500);
};

