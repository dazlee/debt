var mongoose = require('mongoose'),
    schema = mongoose.Schema,
    account_sheet = new schema({
    	title: String,
    	owner: String,
    	date:  Date,
    	owe_list: Array
    });
mongoose.model('AccountSheet', account_sheet);
mongoose.connect('mongodb://localhost/accounting');