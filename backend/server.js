const express = require('express');
const app = express();
const router = require('./api');
const port = process.env.PORT || 5000;

app.use(router);
app.use(express.json());
app.listen(port , ()=>{console.log('app run on port 5000')});

