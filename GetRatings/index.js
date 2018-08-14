const documentClient = require('documentdb').DocumentClient
const uriFactory = require('documentdb').UriFactory
const config = require('../config')
const client = new documentClient(config.endpoint, { 'masterKey': config.primaryKey })

module.exports = async function (context, req) {
  if (req.query.userId) {
        // ratingId를 이용하여 cosmos DB에 쿼리
    var results = await queryCollection(req.query.userId)
    console.log(results)
    context.res = {
      body: results
    }
  } else {
    context.res = {
      status: 400,
      body: 'Please pass a userId'
    }
  }
}

function queryCollection (userId) {
  var HttpStatusCodes = { NOTFOUND: 404 }
  var databaseId = config.database.id
  var collectionId = config.collection.id

  console.log(`Querying collection through index: ${collectionId}`)
  let collectionUrl = uriFactory.createDocumentCollectionUri(databaseId, collectionId)
  console.log('collectionUrl: ' + collectionUrl)
  let query = 'SELECT * FROM ' + process.env.MYSQL_COLLECTION + ' I WHERE I.userId = ' + '"' + userId + '"'
  console.log(query)

  return new Promise((resolve, reject) => {
    client.queryDocuments(
              collectionUrl,
              query
          ).toArray((err, results) => {
            if (err) reject(console.log(err))
            else {
              for (var queryResult of results) {
                let resultString = JSON.stringify(queryResult)
                console.log(`\tQuery returned ${resultString}`)
              }
              resolve(results)
            }
          })
  })
};
