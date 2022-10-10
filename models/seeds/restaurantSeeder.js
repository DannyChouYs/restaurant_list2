const Restaurant = require('../restaurant');
const restaurantList = require('../../restaurant.json');

const db = require('../../config/mongoose');

db.once('open', () => {
    console.log('ready to generate seeds.');
    for (let i = 0; i < restaurantList.results.length; i++) {
        const restaurantItem = restaurantList.results[i];
        Restaurant.create(restaurantItem);
    }
    console.log('Done');
});
