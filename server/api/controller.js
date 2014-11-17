var photos = require('./seed.js');

module.exports = {
	getPhotos: function (req, res, next) {
		//For the exercise, I did not set up database, data is from seed.js. 
		var page = req.params.page;
		res.json(photos[page]);
	}
};