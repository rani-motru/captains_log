require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require("morgan");
const methodOverride = require('method-override');
const routes = require('./controllers/log.js');
const PORT = process.env.PORT || 3003;
const app = express();
// const Log = require('./models/logs');
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
app.use('/logs', routes)


app.get('/', (req, res) => {
    res.send("This is Captain's Ship <a href='/logs'> Log!</a>");
});



app.listen(PORT, () => {
    console.log('listening');
});