module.exports = {
	loadPage: function (p)
	{
		var html = require('../pages/'+p);
		$('#container').html(html);
	}
};
