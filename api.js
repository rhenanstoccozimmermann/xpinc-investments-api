import express from 'express';

// import login from './controllers/login';
import investimentsRoutes from './routes/investimentsRoutes';
import assetsRoutes from './routes/assetsRoutes';
// import accountsRoutes from './routes/accountsRoutes';

const app = express();

app.use(express.json());

// app.post('/login', login);
app.use('/investiments', investimentsRoutes);
app.use('/assets', assetsRoutes);
// app.use('/accounts', accountsRoutes);

export default app;
