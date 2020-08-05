var mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var Schema   = mongoose.Schema;
var ObjectId = mongoose.Types.ObjectId;

var FeuilleSchema = new mongoose.Schema({
	template: {
		type: ObjectId,
		ref: 'Template',
		required: true
	},
	urlSheet: {
	  type: String,
	  required: true
	},
	pdf: {
		type: String,
		default: null
	}
});

module.exports = mongoose.model('Feuille', FeuilleSchema);


