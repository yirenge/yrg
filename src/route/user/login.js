const express=require('express');
const mysql=require('mysql');
const myconfig=require('../../../src/myconfig');
const db = mysql.createPool(myconfig.mysql);

module.exports=function (){
  var router=express.Router();
  router.get('/', (req, res)=>{
    res.render('user/login.ejs', {});
  });
  router.post('/', (req, res)=>{
    var username=req.body.username;
    var password=req.body.password;
    db.query(`SELECT * FROM users WHERE username='${username}'`, (err, data)=>{
      if(err){
        console.error(err);
        res.status(500).send('database error').end();
      }else{
        if(data.length==0){
          res.status(400).send('no this user').end();
        }else{
          if(data[0].password==password){
            //成功
            req.session['user_id']=data[0].ID;
            res.redirect(mysql.baseUrl+'/user/');
          }else{
            res.status(400).send('this password is incorrect').end();
          }
        }
      }
    });
  });
  return router;
};
