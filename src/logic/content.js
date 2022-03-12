const mongoose = require('mongoose')
const { series, user } = require('../models')
const { seriesModel } = series
const { userModel } = user
const fetchContent = async (user_id, series_ids) => {
    const user = await userModel.findById(user_id)
    if (!user) {
        throw new Error("User doesn't exist")
    }
    const userSeries = user.unlocked_content.map(u => u.series_id)
    let allSeriesData = await seriesModel.find({ "_id": { "$in": series_ids }})
    if (allSeriesData && allSeriesData.length > 0) {
        allSeriesData.forEach(s => {
            if (userSeries.includes(s._id.toString())) {
                const i = userSeries.indexOf(s._id.toString())
                s.chapters = s.chapters.filter(c => c.chapter_num <= user.unlocked_content[i].chapters_unlocked)
            } else {
                s.chapters = s.chapters.filter(c => c.chapter_num <= 4)
            }
        })
    }
    return allSeriesData
}

const createOrUpdateSeries = async input => {
    let chapters = []
    if (input && input.chapters && input.chapters.length) {
        chapters = input.chapters.map(c => ({
            name: c.name,
            chapter_num: c.chapter_num,
            content: c.content_meta,
            uploaded_at: new Date()
        }))
    }
    if (input.series_id) {
        await seriesModel.findOneAndUpdate(
            { _id: input.series_id },
            {
                $push: {
                    chapters
                },
                num_chapters: input.num_chapters,
                name: input.series_name
            }
        )
    } else if (input && input.series_name) {
        const newSeries = new seriesModel({})
        const _id = mongoose.Types.ObjectId()
        newSeries._id = _id
        newSeries.name = input.series_name
        newSeries.num_chapters = input.num_chapters
        newSeries.uploaded_at = new Date()
        if (input.chapters && input.chapters.length > 0) {
            newSeries.chapters = chapters
        } else {
            newSeries.chapters = []
        }
        await newSeries.save()
        return { _id, series_name: input.series_name }
    } else {
        throw new Error('Series Name is mandatory')
    }
}

const bulkUpload = async input => {
    let result = []
    if (input && input.length > 0) {
        for (var i=0; i<input.length; i++) {
            let uploaded = await createOrUpdateSeries(input[i])
            result.push(uploaded)
        }
        return result
    }
    return false
}

module.exports = {
    fetchContent,
    createOrUpdateSeries,
    bulkUpload
}