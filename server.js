const express = require('express');
const path = require('path');

const app = express();

// SPA기 때문에 index.html만 사용한다.
app.get('/*', (req, res) => {
  res.sendFile(path.resolve('frontend', 'index.html'));
});

app.listen(3000, () => {
  console.log('Server Running');
});
