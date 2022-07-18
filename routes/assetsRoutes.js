const express = require('express');

const getAssetsByAccountId = require('../controllers/getAssetsByAccountId');
const getAssetByAssetId = require('../controllers/getAssetByAssetId');

const validateJWT = require('../middlewares/validateJWT');

const assetsRoutes = express.Router();

assetsRoutes.get('/account/:id', validateJWT, getAssetsByAccountId);
assetsRoutes.get('/asset/:id', validateJWT, getAssetByAssetId);

module.exports = assetsRoutes;
