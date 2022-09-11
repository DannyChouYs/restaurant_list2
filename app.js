const express = require('express');
const exphbs = require('express-handlebars');
const restaurantsList = require('./restaurant.json');

const app = express();
const port = 3000;

// template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// static files
app.use(express.static('public'));

// routes
app.get('/', (req, res) => {
    const restaurants = restaurantsList.results;
    res.render('index', { restaurants });
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
