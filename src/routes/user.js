const { userLogic } = require('../logic')
const { Success, Fail } = require('../utils/helper')
module.exports = app => {
    app.get('/users', async (req, res, next) => {
        try {
            const result = await userLogic.fetchAllUsers()
            res.status(200).json(Success(result))
        } catch (e) {
            next(e)
        }
    })

    app.post('/create-user', async (req, res, next) => {
        try {
            const result = await userLogic.createUser(req.body)
            res.status(200).json(Success(result))
        } catch (e) {
            next(e)
        }
    })
}