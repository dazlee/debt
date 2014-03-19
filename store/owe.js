var mongoose = require('mongoose'),
	AccountSheet = mongoose.model('AccountSheet');
var DAY = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function OWE () {

};

getDateFromat = function (_date) {
	var formatted;
	if (_date) {
		formatted = {
			month : _date.getMonth() + 1,
			date  : _date.getDate()
		};
	}
	return formatted;
};

OWE.prototype.updateRecord = function (id, index, list_item, callback) {
	AccountSheet.findById(id, function (err, record) {
		record.owe_list[index] = list_item;
		record.update({$set: {owe_list: record.owe_list}}, function (err, counts) {
			callback(id);
		});
	});
};

OWE.prototype.createList = function (id, list_item, callback) {
	AccountSheet.findById(id, function (err, record) {
		record.owe_list.push(list_item);
		record.save(function (err, record) {
			if(err) {
				console.log(err);
			}
			callback(record.id);
		});
	});
}

OWE.prototype.readRecord = function (id, callback) {
	AccountSheet.findById(id, function (err, record) {
		var title = record.title,
			owner = record.owner,
			data,
			total = 0,
			item;

		for (var i = 0; i < record.owe_list.length; i += 1){
			item = record.owe_list[i];
			item.date = getDateFromat(item.date);
			item.paid_date = getDateFromat(item.paid_date);
			if (item.payment_type === 'i_pay') {
				total = total - Number(item.amount);
			} else {
				total = total + Number(item.amount);
			}
			console.log(total);
		}
		data = record;
		data.total = total;
		callback(record);
		//res.render('account-sheet', record);
	});
};

OWE.prototype.createRecord = function (title, owner, callback) {

	var record = new AccountSheet ({
		title : title,
		owner : owner,
		date  : new Date(),
		owe_list : []
	});

	record.save(function (err, record, count) {
		callback(record.id);
	});
};

var owe = new OWE();
module.exports = owe;