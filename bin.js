const express = require('express')
const cors = require('cors');
const multer = require('multer');
const slippiSetStats = require('.');
const app = express()
const port = 3000

var DIR = './uploads/';
var upload = multer({dest: DIR})
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.slp') 
  }
})

var upload = multer({ storage: storage });
var type = upload.array('file', 5)

app.use(cors({
  origin: 'http://localhost:4200'
}));

app.post('/uploadFiles', type, function (req, res, next) {
  var body = slippiSetStats(req.files);
  res.send(body);
})

app.listen(port, () => console.log(`Slippi back-end listening on port ${port}!`))