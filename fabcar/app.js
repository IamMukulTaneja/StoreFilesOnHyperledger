// Bring in our dependencies
const app = require('express')();
const routes = require('./routes');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const route = require("./routes");

//  Connect all our routes to our application
app.set('view engine','ejs');
app.use(route);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Turn on that server!
app.listen(3332, () => {
  console.log('App listening on port 3332   ');
});