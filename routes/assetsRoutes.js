import express from 'express';

import getAssetsByAccountId from '../controllers/getAssetsByAccountId';

const assetsRoutes = express.Router();

assetsRoutes.get('/account/:id', getAssetsByAccountId);

export default assetsRoutes;
