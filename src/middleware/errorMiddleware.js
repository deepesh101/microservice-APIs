const { Fail } = require("../utils/helper")

module.exports = (err, req, res, next) => {
    if (err) {
        console.log(err)
        res.status(500).json(Fail(err.message))
    }
}