const express = require('express');
const app = express();

app.listen('3000', () => {
  console.log('Server is listening on port 3000');
});

app.get('/api/counter/:index', (req, res) => {
  if (req.params.index === '4') {
    return res.sendStatus(404);
  }

  res.send({data: req.params.index});
});
