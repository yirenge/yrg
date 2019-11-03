var express=require("express");
var path=require("path");
var ejs=require("ejs");

var app=express();
var staticPath=path.join(__dirname,"public");
app.set('views',staticPath);
// app.set('view engine', 'ejs')
// console.log(path.join(__dirname,"../web","public"));
app.use(express.static(staticPath));


app.engine('.html', ejs.__express);


var router = express.Router();
router.get('/', function (req, res, next) {
    console.log("route:/");
  res.send(`
  Hello! welcome to yirenge.

  伊人阁地址：恩施舞阳坝国泰2楼伊人阁

  联系方式：
  手机：15172829949， QQ：648891158，微信：648891158

  简介：专业从事时装设计，定制，展示，销售服务，是一家专业从事服装，时装的公司，期待您的光临。
  `);
})
router.get('/index', function (req, res, next) {
    console.log("route:/index");
  res.render('index.html',{})
});

router.get('*', function (req, res, next) {
    console.log("route:",req.url);
  res.render('index.html',{})
});

app.use(router);


var server=app.listen(5388, function () {
  console.log('Listening on '+server.address().port);
})