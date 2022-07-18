import express from 'express';

import getAssetsByAccountId from '../controllers/getAssetsByAccountId';

const assetsRoutes = express.Router();

assetsRoutes.get('/:accountId', getAssetsByAccountId);

export default assetsRoutes;
