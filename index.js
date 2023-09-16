const express=require('express');
const app=express();

app.get('/',(req,res)=>{

res.send("Hello Srija")

})

app.listen(3000);
