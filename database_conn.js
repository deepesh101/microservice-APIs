const mongoose = require('mongoose')

const main = async () => {
  const userName = encodeURIComponent(process.env.DATABASE_USERNAME)
  const password = encodeURIComponent(process.env.DATABASE_PASSWORD)
  await mongoose.connect(`mongodb+srv://${userName}:${password}@${process.env.CLUSTER_NAME}?retryWrites=true&w=majority`);
}

module.exports = {
    connect: main
}