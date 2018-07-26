const express = require("express")
const morgan = require("morgan")
const app = express()
const path = require("path")
app.use(morgan("combined"))
 
// bundle.jsをstaticファイルとして読み込む用
// apacheはこちら
// <Location "/kancolle">
//    ProxyPass http://localhost:9000
//    ProxyPassReverse http://localhost:9000
// </Location>

app.use(express.static('public'));

app.get("/", function(req, res) {
  res.sendFile(path.resolve("./public/index.html"))
})

app.listen(9000, function () {
  console.log('Example app listening on port 9000!');
});

