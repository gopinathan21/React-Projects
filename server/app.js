const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3006;
const SignUpPasswordValidation = require('./routes/SignUpValidation.js');
const RandomParagraph = require('../server/routes/RandomParagraph.js')
const TokenVerify = require('../server/routes/TokenVerify.js')

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  // Try googling to remove the CORS error and learn more about it
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use('/', SignUpPasswordValidation);
app.use('/', RandomParagraph)
// app.use('/', RandomParagraph)
// app.use('/',TokenVerify)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
