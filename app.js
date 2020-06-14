const express = require('express');
const app = express();
const records = require('./records');
const { json } = require('express');
const { getQuote } = require('./records');

 
app.use(express.json());

// send a get request to /quotes to read a list of quotes
app.get('/quotes',async(req,res)=>{
    try{
        const quotes = await records.getQuotes();
        res.json(quotes);
    }catch(err){
        res.json({message:err.message})
    }
      
});
// send a get request to /quotes/:id to read(view) a quote
app.get('/quotes/:id',async(req,res)=>{
    try{
        const quote = await records.getQuote(req.params.id);
        if(quote){
            res.json(quote);
        }else{
            res.status(404).json({message:'not found'})
        }
        res.json(quote);
    }catch(err){
        res.json({message:err.message})
    }    
});
// send a post request to /quotes to create a new quote
app.post("/quotes", async (req, res) => {   
      try{
        if(req.body.quote && req.body.author){
            const quote = await records.createQuote({
                quote: req.body.quote,
                author: req.body.author,
               });
               res.status(201).json(quote);
        }else{
            res.status(500).json({message:"can not create"})
        }
      }catch(err){
        res.status(500).json({message:err.message})
      }
  });
// send a put request to /quotes/:id to update(edit) a quote
app.put('/quotes/:id', async(req,res)=>{
  try{
      const quote = await records.getQuote(req.params.id);
      console.log(quote);
      if(quote){
        quote.quote = req.body.quote,
        quote.author = req.body.author;
        
        await records.updateQuote(quote);
        res.status(204).end();
      }else{
        res.status(404).json({message:'not found'})
      }
      records.updateQuote(quote)
     }catch(err){
    res.status(500).json({message:err.message})
  }
})
// send a delete request to /quotes/:id delete a quote
app.delete('/quotes/:id', async(req,res)=>{
    try{
        const quote = await records.getQuote(req.params.id);
        await records.deleteQuote(quote);
        res.status(204).end();
       }catch(err){
      res.status(500).json({message:err.message})
    }
  })
// send a get request to /quotes/quote/random to red(view) a random quote


app.listen(3000, () => console.log('Quote API listening on port 3000!'));
