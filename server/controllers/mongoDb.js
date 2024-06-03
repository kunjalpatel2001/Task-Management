const mongoose = require('mongoose');
const Db = process.env.DB
mongoose.connect(Db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then((e) => {
    console.log('Database is Connected')
}).catch((e) => {
    console.log('Database is not Connected', e)

});