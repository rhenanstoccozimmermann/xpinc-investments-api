const express = require('express');

const getAssetsByAccountId = require('../controllers/getAssetsByAccountId');
const getAssetByAssetId = require('../controllers/getAssetByAssetId');

const assetsRoutes = express.Router();

assetsRoutes.get('/account/:id', getAssetsByAccountId);
assetsRoutes.get('/asset/:id', getAssetByAssetId);

module.exports = assetsRoutes;
