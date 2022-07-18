require('dotenv').config();

const app = require('./api');

const port = process.env.API_PORT;

app.listen(port, () => console.log(`Server rodando na porta ${port}`));
