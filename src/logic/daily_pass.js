const { user, series } = require('../models')
const { userModel } = user
const { seriesModel } = series
const unlockChapter = async (user_id, series_id) => {
    const user = await userModel.findById(user_id)
    const seriesData = await seriesModel.findById(series_id)
    if (!user) {
        throw new Error("User doesn't exist")
    } else if (!seriesData) {
        throw new Error("Series doesn't exist")
    }
    let series_exist = false, chapters_unlocked = 5, update
    if (user.unlocked_content && user.unlocked_content.length > 0) {
        user.unlocked_content.forEach(c => {
            if (c.series_id === series_id) {
                series_exist = true
                c.chapters_unlocked = c.chapters_unlocked + 1
                chapters_unlocked = c.chapters_unlocked
            }
        })
        if (chapters_unlocked > seriesData.num_chapters) {
            throw new Error('Complete Series is already unlocked')
        }
        if (series_exist) {
            update = {
                unlocked_content: user.unlocked_content
            }
        } else {
            update = {
                $push: {
                    unlocked_content: { series_id, chapters_unlocked }
                }
            }
        }
    } else {
        update = {
            $push: {
                unlocked_content: { series_id, chapters_unlocked }
            }
        }
    }
    await userModel.findOneAndUpdate(
        { _id: user_id },
        update,
        { upsert: true }
    )
    return true
}

const fetchDailyPassByUser = async user_id => {
    const user = await userModel.findById(user_id)
    if (!user) {
        throw new Error("User doesn't exist")
    }
    const allSeriesData = await seriesModel.find({}, '_id name num_chapters')
    let seriesIds = null
    let result = []
    if (allSeriesData) {
        console.log(allSeriesData)
        seriesIds = allSeriesData.map(a => a._id.toString())
        console.log(seriesIds)
        user.unlocked_content.forEach(u => {
            const i = seriesIds.indexOf(u.series_id)
            console.log(i)
            if (i > -1) {
                result.push({
                    series_name: allSeriesData[i].name,
                    chapters_unlocked: u.chapters_unlocked,
                    series_id: u.series_id
                })
            }
        })
        userSeries = user.unlocked_content.map(u => u.series_id)
        seriesIds.forEach((id, i) => {
            if (!userSeries.includes(id)) {
                result.push({
                    series_id: id,
                    series_name: allSeriesData[i].name,
                    chapters_unlocked: allSeriesData[i].num_chapters > 4 ? 4 : allSeriesData[i].num_chapters
                })
            }
        })
    }
    return result
}

module.exports = {
    unlockChapter,
    fetchDailyPassByUser
}