var request = require('request')

exports.show = function (req, res) {
  var url = "https://raw.githubusercontent.com/"

  url = url + req.param("owner")
  url = url + "/" + req.param("repo")
  url = url + "/master/" + req.param("file")

  request(url, function (err, response, body) {
    if (!err && response.statusCode == 200) {
      res.send(body)
    } else {
      res.send(err)
    }
  })
}
