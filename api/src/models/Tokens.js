
const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    tokenHash: {
        type: String,
        required: true,
        unique: true
    },
    familyId: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    },
    revokedAt: {
        type: Date,
        default: null
    },
    replacedBy: {
        type: String,
        default: null
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Token', tokenSchema);