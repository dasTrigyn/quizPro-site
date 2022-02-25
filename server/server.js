const express = require('express');
const path = require('path');
const cors = require('cors');
const api = require('./routes/api');
const dbConfig = require('./config/dbconfig')();
const mongoose = require('mongoose');
const app = express();
const url = "mongodb+srv://quizdb:1435051051@cluster0.peo6y.mongodb.net/quizdb?retryWrites=true&w=majority";

const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));
app.get('/',(req, res)=>{
    res.send("I am from server")
})
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use('/api',api);
app.listen(PORT, () => {
    console.log(`Server started at port : ${PORT}`)
});
