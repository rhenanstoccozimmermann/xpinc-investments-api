import express from 'express';

import depositIntoAccount from '../controllers/depositIntoAccount';

const accountsRoutes = express.Router();

accountsRoutes.put('/deposit', depositIntoAccount);

export default accountsRoutes;
