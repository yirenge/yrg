const express=require('express');
const myconfig=require('../../../src/myconfig');
const common=require('../../../src/libs/common');
const mysql=require('mysql');
const db = mysql.createPool(myconfig.mysql);
module.exports=function (){
  var router=express.Router();
  router.get('/', (req, res)=>{
    res.render('admin/login.ejs', {baseUrl:myconfig.baseUrl});
  });
  router.post('/', (req, res)=>{
    var username=req.body.username;

    console.log("-------username-",username);
    
    var password=common.md5(req.body.password+common.MD5_SUFFIX);
    db.query(`SELECT * FROM admin_table WHERE username='${username}'`, (err, data)=>{
      if(err){
        console.error('[login]database error',err);
        res.status(500).send('database error').end();
      }else{
        if(data.length==0){
          res.status(400).send('no this admin').end();
        }else{
          if(data[0].password==password){
            //成功
            req.session['admin_id']=data[0].ID;
            res.redirect(myconfig.baseUrl+'/admin/');
          }else{
            res.status(400).send('this password is incorrect').end();
          }
        }
      }
    });
  });
  return router;
};
