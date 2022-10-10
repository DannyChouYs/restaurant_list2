const mongoose = require('mongoose');

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

// 記得要匯出
module.exports = db;
