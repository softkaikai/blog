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
        maxAge: 1000*60*60*24,
        httpOnly: true
    },
    store: new MongoStore({
        url: 'mongodb://localhost/blog'
    })
}));

exports.index = function(req, res) {

    if(req.session.client) {
        res.locals.username = req.session.client.username;
    }
    res.render('index', {
        title:'我的博客',
        stylecss: 'index.css'
    })
};
// 路由/u/:user
exports.user = function(req, res) {
    if(req.session.client) {
        res.locals.username = req.session.client.username;
    }
    user.myblogModel.findByName(req.session.client.username, function(err, data) {
        if(err) {
            console.log('dont find myblogModel');
        } else {
            //console.log(data);
            res.render('myBlog', {
                title: '我的微博',
                stylecss: 'myBlog.css',
                js: 'myblog.js',
                myblog: data
            });
        }

    });

};
exports.publish = function(req, res) {

    var newBlog = new user.myblogModel({
        username: req.session.client.username,
        title: req.body.publishTitle,
        content: req.body.publishContent
    });
    newBlog.save(function(err, data) {
        if(err) {
            console.log('The newBlog saving failed');
            return res.redirect(303, '/u/' + req.session.client.username);
        }
        console.log('newBlog saving sucessed');
        res.redirect(303, '/u/' + req.session.client.username);
    })
};
exports.delete = function(req, res) {
    console.log(req.body);
    user.myblogModel.remove({
        username: req.session.client.username,
        title: req.body.inputhidden
    }, function(err, data) {
        if(err) {
            console.log('The err of delete is ' + err);
            return res.redirect(303, '/u/' + req.session.client.username);
        }
        console.log('The data of delete is ' + data);
        res.redirect(303, '/u/' + req.session.client.username);
    });

};


exports.reg = function(req, res) {
    //console.log(req.session.err);
    res.locals.err = req.session.err;
    res.locals.sucess = req.session.sucess;
    if(req.session.client) {
        res.locals.username = req.session.client.username;
    }
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
    var client = new user.userModel({
        username: req.body.username,
        password: req.body.pass
    });
    user.userModel.findByName(client.username, function(err, data) {
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
};
exports.login = function(req, res) {
    res.locals.err = req.session.err;
    res.locals.sucess = req.session.sucess;
    if(req.session.client) {
        res.locals.username = req.session.client.username;
    }
    delete req.session.err;
    delete req.session.sucess;
    res.render('login', {
        title: '用户登录',
        stylecss: 'login.css'
    })
};
exports.doLogin = function(req, res) {
    user.userModel.findByName(req.body.username, function(err, data) {
        if(data.length == 0) {
            req.session.err = '该用户名不存在';
            return res.redirect(303, '/login');
        }
        if(req.body.pass != data[0].password) {
            req.session.err = '用户名和密码不匹配';
            return res.redirect(303, '/login');
        }
        req.session.sucess = '登录成功';
        req.session.client = {
            username: req.body.username,
            password: req.body.pass
        };
        return res.redirect(303, '/login');
    })
};
exports.logout = function(req, res) {
    req.session.client = null;
    res.redirect(303, '/');
};
exports.do404 = function(req, res, next) {
    res.status(404);
    res.send('404 Not found');
};
exports.do500 = function(err, req, res, next) {
    res.status(500);
    res.send('500 Server error');
};