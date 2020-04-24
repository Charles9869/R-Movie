const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

// Declare app
const app = express();

// The server will be listening on PORT 4000
const PORT = process.env.PORT || 4000;

// Import routes
const movies = require('./routes/movie');

// Middleware
// app.use((req, res, next) => {
//   res.header(
//     'Access-Control-Allow-Methods',
//     'OPTIONS, HEAD, GET, PUT, POST, DELETE'
//   );
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   );
//   next();
// });

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
// app.use(express.static('./server/assets')); // ! Might change in the future depending of how I implement my stuff
// app.use('/', express.static(__dirname + '/')); // ! Might change in the future depending of how I implement my stuff

// All Endpoint declarations
app.get('/', (req, res) => {
  console.log(process.env.TEST);
  res.send('Home Route');
});

app.use('/', movies);

// Start the server
app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));
