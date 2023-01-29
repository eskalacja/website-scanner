const express = require('express');

const main = async () => {
  const app = express();

  app.use(express.static('pages'));
  app.get('/errors/no-response-body', (req, res) => {
    res.end();
  });
  app.get('/errors/500', (req, res) => {
    res.status(500).send();
  });
  app.get('/errors/timeout', (req, res) => {
    setTimeout(() => {
      res.status(200).send();
    }, 2000);
  });

  app.listen(8000);
};

main();
