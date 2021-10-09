var express = require('express');
var router = express.Router();

const username='abhinav';
const password = 'abhinav';

const cards=[
  {
    name:"food1",
    price:300,
    discription:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus, debitis.",
    img:"images/one.jpeg"
  },
  {
    name:"food2",
    price:500,
    discription:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus, debitis.",
    img:"images/two.jpeg"
  },
  {
    name:"food3",
    price:350,
    discription:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus, debitis.",
    img:"images/three.jpeg"
  }
  
]
const name= [
  "Abhinav",
  "Asif",
  "Ajmal",
  "Mubasheer",
  "faiz",
  "afsal"
]
const details=[
  {
    name:'Abhinav',
    age:21,
    place:'Ramanatukara'

  },
  {
    name:'Asif',
    age:21,
    place:'nilambur'

  },
  {
    name:'Afsal',
    age:21,
    place:'Pandikadu'

  }
]

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
  
  res.render('test', { title: 'test' ,cards,name,details});
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
