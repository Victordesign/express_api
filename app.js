const express = require('express');
const app = express();
const records = require('./records');
const routes = require('./routes');
const { json } = require('express');

 
//

app.use(express.json());
app.use('/api', routes);
 

// error handle
app.use((req,res,next)=>{
    return new Error('there something worng');
    err.status = 404;
    next(err);
})
app.use((err,req,res,next)=>{
    res.status(err.status || 500);
    res.json({
      error:{
        messsage:err.message
      }
    })
})

app.listen(3000, () => console.log('Quote API listening on port 3000!'));
