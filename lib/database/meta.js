const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MetaSchema = new Schema({
    title: {
        type: 'String',
        required: true
    },
    apId: {
        type: 'String',
        required: true
    },
    kitsuId: {
        type: 'String',
        required: true
    },
    imdbId: {
        type: 'String',
        required: false
    }
});

const Meta = mongoose.model('Meta', MetaSchema);

module.exports = Meta
module.exports.MetaSchema = MetaSchema