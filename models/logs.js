const mongoose = require('mongoose');

const logsSchema = new mongoose.Schema({
    title:{type: String, required: true},
    entry:{ type: String, required: true},
    shipIsBroken:{type: Boolean , default: true}
    
},{timeStamp: true});

const Log = mongoose.model('Logs', logsSchema);

module.exports = Log;