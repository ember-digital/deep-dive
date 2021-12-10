const express = require('express');
const data = require('./data');
const app = express();

app.use((_, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.use('/api/transactions', (_, res) => {
    res.status(200).send(data);
})

const PORT = 4000;

app.listen(PORT, () => {
    console.log('HTTP Server running at http://localhost:' + PORT);
});
