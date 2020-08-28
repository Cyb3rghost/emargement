var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var TemplateSchema = new mongoose.Schema({
    nomTemplate: {
		type: String,
		required: true
	},
	organisme: {
		type: String,
		required: true
	},
	logo: {
	  type: String,
	  default: null
    },
    intitule: {
        type: String,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Template', TemplateSchema);


