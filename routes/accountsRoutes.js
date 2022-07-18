import express from 'express';

import depositIntoAccount from '../controllers/depositIntoAccount';
import withdrawFromAccount from '../controllers/withdrawFromAccount';

const accountsRoutes = express.Router();

accountsRoutes.put('/deposit', depositIntoAccount);
accountsRoutes.put('/withdraw', withdrawFromAccount);

export default accountsRoutes;
