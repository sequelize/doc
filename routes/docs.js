exports.index = function(req, res) {
  console.log(req.param('version'))
  res.send("respond with a resource")
}
