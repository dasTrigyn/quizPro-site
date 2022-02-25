
const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const postScorechema  = new Schema({
    name: {
        type: String,
        require: true,
        unique: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },

    score: {
        type: String,
        require:true,
        unique: false,
    }
    
},
{ timestamps: { createdAt: 'created_at' } }
)

module.exports = mongoose.model('LeaderBoard',postScorechema)