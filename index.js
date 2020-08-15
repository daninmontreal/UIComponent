var express= require('express')
var app = express();
const port = 8080

const path = require('path');

app.use(express.static(path.join(__dirname, "public")))

app.listen(port, () => console.log(`UICompont app listening at http://localhost:${port}`))