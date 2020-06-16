const express = require('express');
const router = express.Router();
const records = require('./records')

// send a get request to /quotes to read a list of quotes
router.get('/quotes',async(req,res)=>{
    try{
        const quotes = await records.getQuotes();  
        res.json(quotes);
    }catch(err){
        res.json({message:err.message})
    }
      
});
// send a get request to /quotes/:id to read(view) a quote
router.get('/quotes/:id',async(req,res)=>{
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

// send a get request to /quotes/quote/random to red(view) a random quote
router.get('/quotes/quote/random', async(req,res,next)=>{
    try{
         const quote = await records.getRandomQuote();
         console.log(quote);
         res.json(quote);
    }catch(err){
      next(err);
    }
    res.send('this is a random page')
})

// send a post request to /quotes to create a new quote
router.post("/quotes", async (req, res) => {   
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
router.put('/quotes/:id', async(req,res)=>{
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
router.delete('/quotes/:id', async(req,res,next)=>{
    try{
        const quote = await records.getQuote(req.params.id);
        await records.deleteQuote(quote);
        res.status(204).end();
       }catch(err){
        next(err);
    }
  })

   


  module.exports = router;