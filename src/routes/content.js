const { Success, Fail } = require("../utils/helper")
const { contentLogic } = require('../logic')

module.exports = async app => {
    app.get('/content', async (req, res, next) => {
        try {
            const { user_id, series_ids } = req.body
            const result = await contentLogic.fetchContent(user_id, series_ids)
            res.status(200).json(Success(result))
        } catch (e) {
            next(e)
        }
    })
    app.post('/upload', async (req, res, next) => {
        try {
            const result = await contentLogic.createOrUpdateSeries(req.body)
            res.status(200).json(Success(result))
        } catch (e) {
            next(e)
        }
    })
    app.post('/bulk-upload', async (req, res, next) => {
        try {
            const result = await contentLogic.bulkUpload(req.body)
            res.status(200).json(Success(result))
        } catch (e) {
            next(e)
        }
    })
}