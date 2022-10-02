const mongoose = require('mongoose');
const Restaurant = require('../restaurant');
const restaurantList = require('../../restaurant.json');

//DB connection
mongoose.connect(process.env.MONGODB_RESTAURANT_URI);
const db = mongoose.connection;

db.on('error', () => {
    console.log('mongodb error:');
});

db.once('open', () => {
    console.log('mongodb connected!');
    for (let i = 0; i < restaurantList.results.length; i++) {
        const restaurantItem = restaurantList.results[i];
        Restaurant.create(restaurantItem);
    }
    console.log('Done');
});
