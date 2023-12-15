require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const app = express();
const Log = require('./models/logs');
const jsxViewEngine = require('jsx-view-engine');

const mongoURI = process.env.MONGO_URI;
const db = mongoose.connection;

// Connect to Mongo
mongoose.connect(mongoURI);
mongoose.connection.once('open', () => {
    console.log('connected to mongo');
})

app.set('view engine', 'jsx');
app.set('views', './views');
app.engine('jsx', jsxViewEngine());

//==middleware=======
app.use((req, res, next) => {
    console.log('Middleware: I run for all routes');
    next();
})

//near the top, around other app.use() calls
app.use(express.urlencoded({extended:false}));

app.use(methodOverride('_method'));


app.get('/', (req, res) => {
    res.send("This is Captain's Ship Log!");
});

//index:
// I - INDEX - dsiplays a list of all fruits
app.get('/logs/', async (req, res) => {
    
    try{
        const foundLogs = await Log.find({});
        res.status(200).render('Index', {logs: foundLogs});
    } catch (err){
        res.status(400).send(err)
    }
    

});

//new
app.get('/logs/new', (req, res) => {
    res.render('New');
});
// D - DELETE - PERMANENTLY removes fruit from the database
app.delete('/logs/:id', async (req, res) => {
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
app.put('/logs/:id', async (req, res) => {
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
app.post('/logs', async (req, res) => {
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
app.get('/logs/:id/edit', async (req, res) => {
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
app.get('/logs/:id', async (req, res) => {
    // res.send(fruits[req.params.indexOfFruitsArray]);
    try {
        const foundLog = await Log.findById(req.params.id);
        res.render('Show', {log: foundLog});
        // res.redirect('/fruits');
    } catch (err) {
        res.status(400).send(err);
    }

})

app.listen(3000, () => {
    console.log('listening');
});