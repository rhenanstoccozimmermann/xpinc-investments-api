const express = require('express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerConfig = require('./swagger.config');

const loginRoute = require('./routes/loginRoute');
const investmentsRoutes = require('./routes/investmentsRoutes');
const assetsRoutes = require('./routes/assetsRoutes');
const accountsRoutes = require('./routes/accountsRoutes');

const app = express();

app.use(express.json());

const swaggerDoc = swaggerJSDoc(swaggerConfig);

app.get('/', (_req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use('/login', loginRoute);
app.use('/investments', investmentsRoutes);
app.use('/assets', assetsRoutes);
app.use('/accounts', accountsRoutes);

module.exports = app;
