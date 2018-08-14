const uuid = require('uuid')
const fetch = require('node-fetch')
module.exports = function (context, req) {
  context.log('JavaScript HTTP trigger function processed a request.')

  if (validateUserId(req.body.userId) && validateProductId(req.body.productId)) {
    // context.log('user exist...')
    var id = uuid.v1()
    context.log(id)

    var timestamp = new Date()
    context.log(timestamp)

    var response = req.body
    response.id = id
    response.timestamp = timestamp
    context.log(response)

    context.bindings.iceCreamRate = JSON.stringify(response)
    context.res = {
      body: response
    }
  } else {
    context.res = {
      status: 400,
      body: 'Please pass a validate userId and productId in the request body'
    }
  }
  context.done()
}

function validateUserId (userId) {
  var url = 'https://serverlessohlondonuser.azurewebsites.net/api/GetUser?userId=' + userId
  console.log(url)
  return true
//   fetch(url)
//     .then(function (response) {
//       console.log('fetch Url:' + response)
//       return true
//     })
//     .catch(function (err) {
//       console.log(err)
//       return false
//     })
}

function validateProductId (productId) {
  var url = 'https://serverlessohlondonuser.azurewebsites.net/api/GetProduct?productId=' + productId
  console.log(url)
  return true
}
