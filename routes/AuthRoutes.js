const User=require('../models/user');
const route=require('express').Router();
const bodyParser = require('body-parser');
route.use(bodyParser.urlencoded({ extended: false }))
route.use(bodyParser.json())
route.post('/register',(req,res)=>{
    const {username,password}=req.body;
    User.register(username,password).then((user)=>{
        res.status(200).json({user:user,msg:'signup Success'});
    }).catch((err)=>{
        res.status(400).json(err);
    })
})

route.post('/login',(req,res)=>{
    const {username,password}=req.body;
    User.login(username,password).then((user)=>{
        res.status(200).json({token:user});
    }).catch((err)=>{
        res.status(400).json(err);
    })
})


module.exports=route;