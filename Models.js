var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CurdSchema = new Schema({

    schedule:{
        type: Date,
        default: Date,
        require: true
    }
}, { strict: false });

// var Data = new CrudData();
// Data.set('categoryid', req.body.categoryid);

const All = mongoose.model('CrudData', CurdSchema, 'CrudData');
module.exports = All;