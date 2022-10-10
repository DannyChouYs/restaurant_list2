const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

const methodOverride = require('method-override');

const routes = require('./routes');

require('./config/mongoose')

const app = express();
const port = 3000;

// template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: true }));

// static files
app.use(express.static('public'));

// 使用method-override
app.use(methodOverride('_method'));

// 將 request 導入路由器
app.use(routes);

/**
 * todo 搜尋功能調整
 */
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
