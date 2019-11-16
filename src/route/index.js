
const express=require('express');
// const common=require('../src/libs/common');

module.exports=function (){
  var router=express.Router();

  /* GET home page. */
  router.get('/index', function(req, res, next) {
    res.render('index.ejs', { title: '伊人阁' });
  });
  router.get('/', (req, res)=>{
    res.render('index.ejs', { title: '伊人阁' });
  });

  router.use('/db/',require('./web')());
  router.use('/zhuce/',require('./zhuce')());
  router.use('/user/',require('./user')());
  router.use('/admin/', require('./admin')());

  return router;
};
