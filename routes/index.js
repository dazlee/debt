
/*
 * GET home page.
 */
var mongoose = require('mongoose'),
	AccountSheet = mongoose.model('AccountSheet');
var DAY = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var owe = require('../store/owe');

exports.updateListItem = function (req, res) {
	var body = req.body;
	var id = req.params.id;
	var index = body.index;
	console.log(body);
	var list_item = {
		name: body.name || '',
		date: new Date(body.date),
		payment_type: body.payment_type || '',
		amount: body.amount || 0,
		is_paid: body.is_paid || '',
		paid_date: body.paid_date ? new Date(body.paid_date) : ''
	};
	owe.updateRecord(id, index, list_item, function (id) {
		res.redirect('/account-sheet/' + id);
	});
};

exports.createList = function (req, res) {
	var body = req.body;
	var id = req.params.id;
	var list_item = {
		name: body.name || '',
		date: new Date(body.date),
		payment_type: body.payment_type || '',
		amount: body.amount || 0,
		is_paid: body.is_paid || '',
		paid_date: body.paid_date ? new Date(body.paid_date) : ''
	};
	if (body.action === 'new') {
		owe.createList(id, list_item, function (id) {
			res.redirect('/account-sheet/' + id);
		});
	} else {
		owe.updateRecord(id, body.action, list_item, function (id) {
			res.redirect('/account-sheet/' + id);
		});
	}
};

exports.accountSheet = function (req, res) {
	var id = req.params.id;
	owe.readRecord(id, function (record) {
		res.render('account-sheet', record);
	});
};

exports.createSheet = function (req, res) {
	var body = req.body,
		sheet_title = body.sheet_title,
		owner_name = body.owner;

	owe.createRecord(sheet_title, owner_name, function (id) {
		res.redirect('/account-sheet/' + id);
	});
};

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};