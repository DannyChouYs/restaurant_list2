const express = require('express');
const router = express.Router();
const Restaurant = require('../../models/restaurant');

// 渲染新增表單畫面
router.get('/new', (req, res) => {
    res.render('new');
});

// 新增資料的處理路由
router.post('/', (req, res) => {
    const restaurant = req.body;
    Restaurant.create(restaurant)
        .then(() => res.redirect('/'))
        .catch((error) => console.log(error));
});

// 瀏覽特定餐廳的詳細資料
router.get('/:id', (req, res) => {
    const id = req.params.id;
    Restaurant.findById(id)
        .lean()
        .then((restaurant) => res.render('show', { restaurant }))
        .catch((error) => console.log(error));
});

// 顯示修改特定餐廳資料的頁面
router.get('/:id/edit', (req, res) => {
    const id = req.params.id;
    Restaurant.findById(id)
        .lean()
        .then((restaurant) => res.render('edit', { restaurant }))
        .catch((error) => {
            console.log(error);
        });
});

// 處理特定餐廳可修改資料的路由
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const restaurantEditItem = req.body;
    Restaurant.findById(id)
        .then((restaurant) => {
            Object.keys(restaurantEditItem).forEach((key) => {
                if (key === 'rating') {
                    restaurant[key] = parseFloat(restaurantEditItem[key].trim());
                } else {
                    restaurant[key] = restaurantEditItem[key].trim();
                }
            });
            return restaurant.save();
        })
        // 處理完回到該餐廳的詳細頁面
        .then(() => res.redirect(`/restaurants/${id}`))
        .catch((error) => {
            console.log(error);
        });
});

// 處理刪除資料的路由
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Restaurant.findById(id)
        .then((restaurant) => {
            restaurant.remove();
        })
        .then(() => res.redirect('/'))
        .catch((error) => console.log(error));
});

module.exports = router;
