const express = require('express');
const mongoose=require("mongoose");
const authRoutes=require('./routes/AuthRoutes');

const app = express();


mongoose.connect("mongodb+srv://Monem123:Monem123+@cluster0.wguufrj.mongodb.net/AuthTest?retryWrites=true&w=majority",(err,done)=>{
    if (err){
        console.log(err)
    } else if(done){
        console.log("base de donee connecté avec succes")
    }});
// app.get('/', (req, res) => {res.write('home')});
app.use('/auth',authRoutes);
app.listen(3000,console.log('runing........'))

        