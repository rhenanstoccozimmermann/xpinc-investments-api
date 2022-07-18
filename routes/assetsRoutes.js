import express from 'express';

import getAssetsByAccountId from '../controllers/getAssetsByAccountId';
import getAssetByAssetId from '../controllers/getAssetByAssetId';

const assetsRoutes = express.Router();

assetsRoutes.get('/account/:id', getAssetsByAccountId);
assetsRoutes.get('/asset/:id', getAssetByAssetId);

export default assetsRoutes;
