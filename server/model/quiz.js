const mongoose = require('mongoose');
const Schema = mongoose.Schema; // if first letter is capital, then 
// javascript treats that variable differently as a class or constructor

const quizSchema  = new Schema({
    QnId: {type:String,unique:true},
    Question: {type:String},
    option1: {type:String},
    option2: {type:String},
    option3: {type:String},
    option4: {type:String},
    Answer: {type:String},
},
)

module.exports = mongoose.model('quiz',quizSchema)//in first parameter always be singular and first letter should be Capital

