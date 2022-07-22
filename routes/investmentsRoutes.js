const express = require('express');

const buyAssetController = require('../controllers/buyAsset');
const sellAssetController = require('../controllers/sellAsset');

const validateJWT = require('../middlewares/validateJWT');

const investmentsRoutes = express.Router();

/**
 * @swagger
 *  tags:
 *    name: /investments endpoints
 */

/**
 * @swagger
 *  components:
 *    schemas: 
 *      Transaction:
 *        type: object
 *        required:
 *          - accountId
 *          - assetId
 *          - quantity
 *        properties:
 *          accountId:
 *            type: number
 *          assetId:
 *            type: number
 *          quantity:
 *            type: number
 *        example:
 *          accountId: 1
 *          assetId: 1
 *          quantity: 1
 */

/**
 * @swagger
 *  /investments/buy:
 *    post:
 *      tags: [/investments endpoints]
 *      description: O endpoint realiza a compra de um ativo
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Transaction'
 *      responses:
 *        201:
 *          content:
 *            application/json:
 *              schema:       
 *                $ref: '#/components/schemas/Transaction'
 */
investmentsRoutes.post('/buy', validateJWT, buyAssetController.buyAsset);

/**
 * @swagger
 *  /investments/sell:
 *    post:
 *      tags: [/investments endpoints]
 *      description: O endpoint realiza a venda de um ativo
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Transaction'
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:    
 *                $ref: '#/components/schemas/Transaction'
 */
investmentsRoutes.post('/sell', validateJWT, sellAssetController.sellAsset);

module.exports = investmentsRoutes;
