const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1/controlepanel");
const db = mongoose.connection;
db.once('open',(err)=>{
    if(err)
    {
        console.log(err);
    }
    console.log('mongodb is conect');
})
module.exports= db;