import dotenv from 'dotenv';

dotenv.config();

import app from './api';

const port = process.env.API_PORT;

app.listen(port, () => console.log(`Server rodando na porta ${port}`));
