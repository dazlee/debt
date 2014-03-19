function init () {
	setDatePicker();
	alert('gg');
};

var setDatePicker = function () {
	$('.date-picker').datepicker();

	$('#paid').on('click', function () {
		$('#paid_date').removeClass('hide');
	});
	$('#not_paid').on('click', function () {
		$('#paid_date').addClass('hide');
	});
};

var setEditDatePicker = function () {
	$('.date-picker').datepicker();

	$('#edit_paid').on('click', function () {
		$('#edit_paid_date').removeClass('hide');
	});
	$('#edit_not_paid').on('click', function () {
		$('#edit_paid_date').addClass('hide');
	});
};

$(document).ready(function () {
	setDatePicker();
});