const express = require('express');

const main = async () => {
  const app = express();

  app.use(express.static('pages'));

  app.listen(8000);
};

main();
