const { user } = require('../models')

const { userModel } = user

const fetchAllUsers = async () => {
    const users = await userModel.find()
    return users
}

const createUser = async input => {
    const newUser = new userModel({
        name: input.name,
        email: input.email,
        mobile: input.mobile,
        created_at: new Date(),
        unlocked_content: []
    })
    await newUser.save()
    return newUser
}

module.exports = {
    fetchAllUsers,
    createUser
}