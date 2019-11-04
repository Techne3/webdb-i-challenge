const express = require('express');

const knex = require('../data/dbConfig');

const router = express.Router();

router.get('/', (req,res)=> {
    
    knex
    .select('*')
    .from('accounts')
    .then(act => {
       res.status(200).json(act)
   })
   .catch(error => {
       res.status(500).json({error: 'Failed to get accounts from DB'})
   })
})

router.get('/', (req,res)=> {
    const query = req.query;
    knex("accounts")
      .orderBy(query.sortby)
      .limit(query.limit)
      .then(accounts => res.status(200).json(accounts))
      .catch(err => res.status(500))

})


router.post("/", validateAccount, (req, res) => {
    knex('accounts')
    .insert(req.body)
    .then(add => res.status(201).json(add))
    .catch(err => res.status(500).json({ error: "Failed to add new account." }))
})

// get account by ID
router.get(`/:id`,validateID ,(req,res)=> {
    const id = req.params.id
    
    knex('accounts')
    .where({id: id})
    .first()
    .then(ids => {
        res.status(200).json(ids)
    })
    .catch(error => {
        res.status(500).json({error: 'could not get accounts by ID'})
    })
})

// update an acccount
router.put(`/:id`,validateAccount,validateID, (req,res)=> {

    const {name, budget} = req.body

    knex('accounts')
    .where({id: req.params.id})
    .update({name, budget})
    .then(updated => {
        res.status(201).json(updated)
    })
    .catch(error => {
        res.status(500).json({error: 'Could not update accounts'})
    })
})

router.delete(`/:id`,validateID, (req,res)=>{
    knex('accounts')
    .where({id: req.params.id})
    .del()
    .then(deleted => {
        res.status(200).json(deleted)
    })
    .catch(error => {
        res.statusCode(500).json({error: 'Could not delete the account'})
    })
})

// middleware functions
function validateAccount (req, res, next) {
    const accounts = req.body;
    if (!Object.keys(accounts).length) {
        res.status(400).json({ error: "Please provide a new account ." })
    } else if (!accounts.name || !accounts.budget) {
        res.status(400).json({ error: "Please provide a name and budget." })
    } else next();
};


function validateID (req,res,next) {
    knex('accounts')
    .where({id: req.params.id})
    .then(ids => {
        if(ids.length){
            req.ids =ids;
            next()
        }else{
            res.status(404).json({message: 'There is no account with the following id'})
        }
    })
    .catch(error => {
        res.status(500).json({error: 'Cannot find following account'})
    })
}


module.exports = router;