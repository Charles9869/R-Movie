const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// The server will be listening on PORT 4000
const PORT = process.env.PORT || 4000;

// Import routes
const movies = require('./routes/movie');
const users = require('./routes/user');

// Middleware
app.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Methods',
    'OPTIONS, HEAD, GET, PUT, POST, DELETE'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/', movies);
app.use('/', users);

io.on('connection', (socket) => {
  socket.on('message', ({ name, message }) => {
    io.emit('message', { name, message });
  });
});

// Start the server
http.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));
