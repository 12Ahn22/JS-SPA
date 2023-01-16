const express = require('express');
const path = require('path');

const app = express();

// static 경로 설정하기
app.use(
  '/static',
  express.static(path.resolve(__dirname, 'frontend', 'static'))
);

// SPA기 때문에 index.html만 사용한다.
// static 디렉토리를 사용해야하는데 아래 코드 때문에 모든 경로가
// index.html을 반환하게 된다. -> 따라서 static 경로 설정해야한다.
app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'frontend', 'index.html'));
});

app.listen(3000, () => {
  console.log('Server Running');
});
