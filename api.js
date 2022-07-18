const express = require('express');

const login = require('./controllers/login');
const investmentsRoutes = require('./routes/investmentsRoutes');
const assetsRoutes = require('./routes/assetsRoutes');
const accountsRoutes = require('./routes/accountsRoutes');

const app = express();

app.use(express.json());

app.get('/', (_req, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.post('/login', login);
app.use('/investments', investmentsRoutes);
app.use('/assets', assetsRoutes);
app.use('/accounts', accountsRoutes);

module.exports = app;
