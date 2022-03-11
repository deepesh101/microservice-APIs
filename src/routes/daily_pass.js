const { Success } = require('../utils/helper')
const { dailyPassLogic } = require('../logic')

module.exports = async app => {
    app.put('/unlock', async (req, res, next) => {
        try {
            const { user_id, series_id } = req.body
            const result = await dailyPassLogic.unlockChapter(user_id, series_id)
            res.status(200).json(Success(result))
        } catch (e) {
            next(e)
        }
    })

    app.get('/daily-pass/:user_id', async (req, res, next) => {
        try {
            const result = await dailyPassLogic.fetchDailyPassByUser(req.params.user_id)
            res.status(200).json(Success(result))
        } catch (e) {
            next(e)
        }
    })
}