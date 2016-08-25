var express = require('express');
var exphbs = require('express-handlebars');
var exhbs =

app = new express();
//设置端口
app.set('port', process.env.PORT || 8080);
//设置模板引擎
app.engine('handlebars', exphbs({
    layoutDir: 'views',
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
//将public文件夹设置成静态文件
app.use(express.static(__dirname + '/public'));


app.get('/', function(req, res) {
    res.render('index', {
        title:'我的博客',
        stylecss: 'index.css'
    })
});

app.listen(app.get('port'), function() {
    console.log('The server of Blog is runging on the port ' + app.get('port'));
});