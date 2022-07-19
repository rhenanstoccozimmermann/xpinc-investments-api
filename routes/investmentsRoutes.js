const express = require('express');

const buyAsset = require('../controllers/buyAsset');
const sellAsset = require('../controllers/sellAsset');

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
investmentsRoutes.post('/buy', validateJWT, buyAsset);

/**
 * @swagger
 *  /investments/sell:
 *    put:
 *      tags: [/investments endpoints]
 *      description: O endpoint realiza a venda de um ativo
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
investmentsRoutes.put('/sell', validateJWT, sellAsset);

module.exports = investmentsRoutes;
