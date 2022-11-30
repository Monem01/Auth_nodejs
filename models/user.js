const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken')
let SchemaUser=mongoose.Schema({
    username:{
    type:String,
    required:true
    },
    password:{
    type:String,
    required:true
    }
});
user=mongoose.model('user',SchemaUser);
module.exports=user;
module.exports.register=(username,password)=>{
    return new Promise((resolve,reject)=>{
       return user.findOne({username:username},(err,doc)=>{
        if(err){
            console.log(err)
        }else if(doc){
                reject('username exist');
            }
            else{
                bcrypt.hash(password,10).then((hpass)=>{
                    let User=new user({
                        username:username, 
                        password:hpass,
                     });
                    
                    User.save().then((doc)=>{
                        resolve(doc);
                    }).catch((err)=>{
                        reject(err);
                    })
                }).catch((err)=>{
                    reject(err);
                })
            }
        })
    })
}
var privatkey="secretkey:ù$^ffuehkjl$^=)çè_-+64&"
module.exports.login=(username,password)=>{
    return new Promise((resolve,reject)=>{
        return user.findOne({username:username},(err,user)=>{
            if(err){
                console.log(err)
            }
            else if(!user){
                    reject("we don't have this username")
                }else{
                    bcrypt.compare(password,user.password).then((same)=>{
                        if(same){
                            //send token
                            let token=jwt.sign({
                                id:user._id,
                                username:user.username
                            },privatkey,{
                                expiresIn:'1h'
                            })
                            resolve(token);
                        
                        }else{
                            reject('invalid password')
                        }
                }).catch((err)=>{
                    reject(err);
                })
            }
        })
        
    })
}

