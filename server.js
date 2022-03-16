const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('./dist/mini-proyecto-frontend'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', { root: 'dist/mini-proyecto-frontend/' }),
);

app.listen(process.env.PORT || 8080);