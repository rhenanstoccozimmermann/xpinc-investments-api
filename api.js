import express from 'express';

// import login from './controllers/login';
import investmentsRoutes from './routes/investmentsRoutes';
import assetsRoutes from './routes/assetsRoutes';
import accountsRoutes from './routes/accountsRoutes';

const app = express();

app.use(express.json());

// app.post('/login', login);
app.use('/investments', investmentsRoutes);
app.use('/assets', assetsRoutes);
app.use('/accounts', accountsRoutes);

export default app;
