const mongoose = require('mongoose')

const contentSchema = new mongoose.Schema({
    series_id: String,
    chapters_unlocked: Number
})

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    mobile: String,
    created_at: Date,
    unlocked_content: [contentSchema]
})

const User = new mongoose.model('User', userSchema)

module.exports = {
    userModel: User,
    userSchema
}