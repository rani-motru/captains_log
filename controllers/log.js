
// const mongoose = require('mongoose');
// const methodOverride = require('method-override');
const express = require("express");
const Log = require("../models/logs");

const router = express.Router();


//index:
// I - INDEX - dsiplays a list of all fruits
router.get('/', async (req, res) => {
    
    try{
        const foundLogs = await Log.find({});
        res.status(200).render('Index', {logs: foundLogs});
    } catch (err){
        res.status(400).send(err)
    }
    

});

//new
router.get('/new', (req, res) => {
    res.render('New');
});
// D - DELETE - PERMANENTLY removes fruit from the database
router.delete('/:id', async (req, res) => {
    // res.send('deleting...');
    try {
        const deletedLog = await Log.findByIdAndDelete(req.params.id);
        console.log(deletedLog);
        res.status(200).redirect('/logs');
    } catch (err) {
        res.status(400).send(err);
    }
})

// U - UPDATE - makes the actual changes to the database based on the EDIT form
router.put('/:id', async (req, res) => {
    if (req.body.shipIsBroken === 'on') {
        req.body.shipIsBroken = true;
    } else {
        req.body.shipIsBroken = false;
    }

    try {
        const updatedLog = await Log.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true },
        );
        console.log(updatedLog);
        res.status(200).redirect(`/logs/${req.params.id}`);
    } catch (err) {
        res.status(400).send(err);
    }
 })

// C - CREATE - update our data store
router.post('/', async (req, res) => {
    if(req.body.shipIsBroken === 'on') { //if checked, req.body.readyToEat is set to 'on'
        req.body.shipIsBroken = true;
    } else {  //if not checked, req.body.readyToEat is undefined
        req.body.shipIsBroken = false;
    }
     console.log(req.body);
    try {
        const createdLog = await Log.create(req.body);
        res.status(200).redirect('/logs');
    } catch (err) {
        res.status(400).send(err);
    }
    
})
//EDIT--
router.get('/:id/edit', async (req, res) => {
    try {
        const foundLog = await Log.findById(req.params.id);
        console.log('foundLog');
        console.log(foundLog)
        res.status(200).render('Edit', {log: foundLog});
    } catch (err) {
        res.status(400).send(err);
    }
})

// S - SHOW - show route displays details of an individual fruit
router.get('/:id', async (req, res) => {
    // res.send(fruits[req.params.indexOfFruitsArray]);
    try {
        const foundLog = await Log.findById(req.params.id);
        res.render('Show', {log: foundLog});
        // res.redirect('/fruits');
    } catch (err) {
        res.status(400).send(err);
    }

})

module.exports = router;