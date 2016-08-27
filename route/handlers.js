var user = require('../user/mongodb-user');
var credentials = require('./credentials');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
app.use(require('cookie-parser')(credentials.cookieSecret));
app.use(session({
    key: 'blog-session',
    resave: false,
    saveUninitialized: true,
    secret: 'baby',
    cookie: {
        maxAge: 1000*60*20,
        httpOnly: true
    },
    store: new MongoStore({
        url: 'mongodb://localhost/blog'
    })
}));


exports.index = function(req, res) {
    res.render('index', {
        title:'我的博客',
        stylecss: 'index.css'
    })
};
exports.user = function(req, res) {

};
exports.post = function(req, res) {

};
exports.reg = function(req, res) {
    //console.log(req.session.err);
    res.locals.err = req.session.err;
    res.locals.sucess = req.session.sucess;
    delete req.session.err;
    delete req.session.sucess;
    res.render('reg', {
        title: '用户注册',
        stylecss: 'reg.css'
    });
};
exports.doReg = function(req, res) {
    console.log('Have enter to doReg');
    if(req.body.pass != req.body['pass-repeat']) {
        req.session.err = '两次输入密码不一致,请核对后重新输入';
        return res.redirect(303, '/reg');
    }
    var client = new user({
        username: req.body.username,
        password: req.body.pass
    });
    user.findByName(client.username, function(err, data) {
        console.log(data);
        if(data.length > 0) {
            err = 'The username already exist';
        }
        if(err) {
            console.log(err);
            req.session.err = err;
            console.log(req.session.err);
            return res.redirect(303, '/reg');
        }
        client.save(function(err, data) {
            console.log(22);
            if(err) {
                req.session.err = 'User save failed';
                return res.redirect(303, '/reg');
            } else {
                req.session.sucess = 'success 注册成功 ';
                req.session.user = client;
                return res.redirect(303, '/reg');
            }
        });
    });
    //console.log(111);
    //res.redirect(303, '/reg');
};
exports.login = function(req, res) {

};
exports.doLogin = function(req, res) {

};
exports.logout = function(req, res) {

};
exports.do404 = function(req, res, next) {
    res.status(404);
    res.send('404 Not found');
};
exports.do500 = function(err, req, res, next) {
    res.status(500);
    res.send('500 Server error');
};