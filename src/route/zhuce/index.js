
const express=require('express');
const myconfig=require('../../../src/myconfig');

module.exports=function (){
  var router=express.Router();
  router.get('/', (req, res)=>{
    res.render('zhuce/register.ejs', {});
  });
  router.use('/register', require('./register')());
  return router;
};
