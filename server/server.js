const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();

require('./config/mongoDriver');


app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

require('./routes/events.routes')(app);


const port = process.env.PORT;

app.listen(port || 3001, () => {
  console.log(`Node Server running on port ${port}`);
});
