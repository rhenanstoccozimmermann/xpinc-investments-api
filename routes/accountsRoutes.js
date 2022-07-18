import express from 'express';

import depositIntoAccount from '../controllers/depositIntoAccount';
import withdrawFromAccount from '../controllers/withdrawFromAccount';
import getBalanceFromAccount from '../controllers/getBalanceFromAccount';

const accountsRoutes = express.Router();

accountsRoutes.put('/deposit', depositIntoAccount);
accountsRoutes.put('/withdraw', withdrawFromAccount);
accountsRoutes.get('/account/:id', getBalanceFromAccount);

export default accountsRoutes;
