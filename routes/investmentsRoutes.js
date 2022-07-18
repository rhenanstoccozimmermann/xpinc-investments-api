import express from 'express';

import buyAsset from '../controllers/buyAsset';
import sellAsset from '../controllers/sellAsset';

const investmentsRoutes = express.Router();

investmentsRoutes.post('/buy', buyAsset);
investmentsRoutes.put('/sell', sellAsset);

export default investmentsRoutes;
