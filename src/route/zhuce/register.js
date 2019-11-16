const express = require('express');
const mysql = require('mysql');
const myconfig = require('../../../src/myconfig');
const common = require('../../../src/libs/common');
var db = mysql.createPool(myconfig.mysql);

module.exports = function () {
  var router = express.Router();
  router.get('/', (req, res) => {
    res.render('zhuce/register.ejs', {baseUrl:myconfig.baseUrl});
  });
  router.post('/', (req, res) => {
    //先判断该账号是否存在
    existUser(req, res);
    //添加
  });
  return router;
};


function existUser(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  console.log("[register]password=",password,"after md5=",common.md5(password));
  
  db.query(`select username='${username}' from users`, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('[register]database error').end();
    } else {
      insertOneUser(req, res);
    }
  });
}

function insertOneUser(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  db.query(`INSERT INTO users \
            (username, password)
            VALUES('${username}', '${password}')`, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('database error').end();
    } else {
      res.redirect(myconfig.baseUrl + '',{baseUrl:myconfig.baseUrl});
    }
  });
}