const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');
const app = express();

//db
mongoose.connect("mongodb+srv://haripriya14022003:haripriya14022003@hari.8d4mvvp.mongodb.net/Registration", {
    
}).then(() => {
    console.log(`Successfully connected to the database`);
}).catch((error) => {
    console.error(`Error connecting to the database: ${error.message}`);
});
