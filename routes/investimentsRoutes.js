import express from 'express';

import buyAsset from '../controllers/buyAsset';

const investmentsRoutes = express.Router();

investmentsRoutes.post('/buy', buyAsset);

export default investmentsRoutes;
