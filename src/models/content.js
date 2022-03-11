const mongoose = require('mongoose')

const chapterSchema = new mongoose.Schema({
    content: String,
    chapter_num: Number,
    name: String,
    uploaded_at: Date
})

const seriesSchema = new mongoose.Schema({
    chapters: [chapterSchema],
    name: String,
    num_chapters: {
        type: Number,
        default: 0
    },
    uploaded_at: Date
})

const Series = new mongoose.model('Series', seriesSchema)

module.exports = {
    seriesModel: Series,
    seriesSchema,
    chapterSchema
}