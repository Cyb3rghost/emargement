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
	apprenant: {
		type: Array,
	},
	jourSemaine: {
		type: Array,
	},
	formateur: {
		type: Array,
	},
	signature: {
		type: Array,
	},
	pdf: {
		type: String,
		default: null
	},
	periodeDebut: {
		type: String,
		default: null
	},
	periodeFin: {
		type: String,
		default: null
	}

}, {timestamps: true});

module.exports = mongoose.model('Feuille', FeuilleSchema);


