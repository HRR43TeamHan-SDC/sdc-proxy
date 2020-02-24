require('newrelic');
const express = require('express');
const axios = require('axios');
const { Readable } = require('stream');
const morgan = require('morgan');

const app = express();
app.use(express.json());
// app.use(morgan('dev'));

// PHOTO GALLERY
app.get('/api/photos/:id', (req, res) => {
  axios.get(`http://localhost:3009/api/photos/${req.params.id}`)
    .then((response) => {
      const stream = new Readable({
        read() {
          this.push(JSON.stringify(response.data));
          this.push(null);
        },
      });
      stream.pipe(res);
      // res.send(response.data);
    })
    .catch((err) => res.send(err));
});

app.post('/api/photos', (req, res) => {
  axios.post(`http://localhost:3009/api/photos`, req.body)
    .then((response) => res.send(response))
    .catch((err) => res.send(err));
});


// app.use(express.static('public'));
app.use('/:id', express.static('public'));

const port = 3043;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});