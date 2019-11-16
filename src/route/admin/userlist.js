const express=require('express');
const myconfig=require('../../../src/myconfig');
const mysql=require('mysql');

const db = mysql.createPool(myconfig.mysql);

module.exports=function (){
  var router=express.Router();

  router.get('/', (req, res)=>{

    switch(req.query.act){
      case 'mod':
        db.query(`SELECT * FROM users WHERE id=${req.query.id}`, (err, data)=>{
          if(err){
            console.error(err);
            res.status(500).send('database error').end();
          }else if(data.length==0){
            res.status(404).send('data not found').end();
          }else{
            db.query('SELECT * FROM users', (err, navs)=>{
              if(err){
                console.error(err);

                res.status(500).send('database error').end();
              }else{
                res.render('admin/userlist.ejs', {navs, mod_data: data[0]});
              }
            });
          }
        });
        break;
      case 'del':
        db.query(`DELETE FROM users WHERE id=${req.query.id}`, (err, data)=>{
          if(err){
            console.error(err);
            res.status(500).send('database error').end();
          }else{
            res.redirect(myconfig.baseUrl+'/admin/userlist');
          }
        });
        break;
      default:
        db.query('SELECT * FROM users', (err, navs)=>{
          if(err){
            console.error(err);
            res.status(500).send('database error').end();
          }else{
            res.render('admin/userlist.ejs', {navs});
          }
        });
        break;
    }
  });
  return router;
};