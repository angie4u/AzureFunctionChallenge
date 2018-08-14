require('dotenv-extended').load()
var config = {}

config.endpoint = process.env.MYSQL_ENDPOINT
config.primaryKey = process.env.MYSQL_KEY

config.database = {
  'id': process.env.MYSQL_DB
}

config.collection = {
  'id': process.env.MYSQL_COLLECTION
}

module.exports = config
