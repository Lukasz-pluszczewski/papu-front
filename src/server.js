const http = require('http');
const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const port = process.env.PORT || 5000;
const apiUrl = process.env.API_URL || 'http://localhost:5000';

const app = express();
app.server = http.createServer(app);

// body parser and cors middlewares
app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(bodyParser.json());

app.get('/api/config', (req, res) => {
  res.json({
    apiUrl,
  });
});
app.use(express.static(path.join(__dirname, '../build'), { fallthrough: true }));
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

// starting actual server
app.server.listen(port);

console.log(`Started on port ${app.server.address().port}`); // eslint-disable-line no-console
