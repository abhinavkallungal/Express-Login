var express = require('express');
var router = express.Router();

const username='abhinav';
const password = 'abhinav';

 let verify =(req,res,next)=>{
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');  
 
  if(req.session.user){
    
    next();
  }else{
    res.redirect('/login');
  }
 }

/* GET home page. */
router.get('/', verify, function(req, res) {
  
  res.render('index', { title: 'Home' });


});
router.get('/test', verify, function(req, res) {
  
  res.render('index', { title: 'Home' });


});


router.get('/login',(req,res)=>{
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');  
  if(req.session.user){
    res.redirect('/');
  }else{

    loginError=req.session.loginError;
    res.render('login',{title:'Login',loginError});
    req.session.loginError=false;
  }
})

router.post('/login',(req,res)=>{
  if(username===req.body.uName && password===req.body.password){
    console.log("hfdksajhjfaj");
    req.session.user=username;
    res.redirect('/');
  }else{
    req.session.loginError=true;
    res.redirect('/login');
  }
})

router.get('/logout',(req,res)=>{
  req.session.destroy();
    res.redirect('/login');
})


module.exports = router;
