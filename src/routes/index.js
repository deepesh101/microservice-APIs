module.exports = app => {
    require('./user')(app)
    require('./content')(app)
    require('./daily_pass')(app)
}