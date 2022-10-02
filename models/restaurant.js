const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
    name: {
        type: 'string',
        required: true,
    },
    name_en: {
        type: 'string',
    },
    category: {
        type: 'string',
    },
    image: {
        type: 'string',
    },
    location: {
        type: 'string',
    },
    phone: {
        type: 'string',
    },
    google_map: {
        type: 'string',
    },
    rating: {
        type: 'number',
    },
    description: {
        type: 'string',
    },
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
