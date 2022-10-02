const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const Restaurant = require('./models/restaurant'); // models

const app = express();
const port = 3000;

// db connection
mongoose.connect(process.env.MONGODB_RESTAURANT_URI);

// connect to mongodb and do something
const db = mongoose.connection;
db.on('error', () => {
    console.log('error connecting');
});
db.once('open', () => {
    console.log('mongodb connected!');
});

// template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// static files
app.use(express.static('public'));

// routes
app.get('/', (req, res) => {
    Restaurant.find()
        .lean()
        .then((restaurants) => {
            res.render('index', { restaurants });
        })
        .catch((error) => {
            console.log(error);
        });
});

app.get('/restaurants/:id', (req, res) => {
    const restaurant = restaurantsList.results.find((restaurant) => {
        return restaurant.id.toString() === req.params.id;
    });
    console.log(restaurant);
    res.render('show', { restaurant });
});

app.get('/search', (req, res) => {
    const keyword = req.query.keyword;
    const restaurants = restaurantsList.results.filter((restaurant) => {
        return (
            restaurant.name.toLowerCase().includes(keyword.toLowerCase()) ||
            restaurant.category.toLowerCase().includes(keyword.toLowerCase())
        );
    });
    console.log(restaurants);
    res.render('index', { restaurants, keyword });
});

app.listen(port, () => {
    console.log('listening on port ' + port);
});
