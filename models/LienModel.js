var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var ObjectId = mongoose.Types.ObjectId;

var LienSchema = new mongoose.Schema({
	feuille: {
		type: ObjectId,
		ref: 'Feuille',
		required: true
	},
    jour: {
        type: String,
        default: null
    },
    moment: {
        type: String,
        default: null
    },
    indexLigne: {
        type: Number,
        default: null
    },
    eleve: {
        type: String,
        default: null
    },
    urlSignature: {
        type: String,
        default: null
    },
	createdAt: {
		type: Date,
		default: null
	},
	updatedAt: {
		type: Date,
		default: null
	}

}, {timestamps: true});

module.exports = mongoose.model('Lien', LienSchema);


