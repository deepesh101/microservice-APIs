module.exports = app => {
    require('./user')(app)
    require('./content')(app)
    require('./daily_pass')(app)
    app.get('/', async (req, res, next) => {
        try {
            res.send("API is Working")
        } catch (e) {
            next(e)
        }
    })
}