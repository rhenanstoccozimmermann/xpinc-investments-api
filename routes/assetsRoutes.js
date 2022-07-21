const express = require('express');

const getAssetsByAccountId = require('../controllers/getAssetsByAccountId');
const getAssetByAssetId = require('../controllers/getAssetByAssetId');

const validateJWT = require('../middlewares/validateJWT');

const assetsRoutes = express.Router();

/**
 * @swagger
 *  tags:
 *    name: /assets endpoints
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      Asset:
 *        type: object
 *        required:
 *          - id
 *          - ticker
 *          - quantity
 *          - price
 *        properties:
 *          id:
 *            type: number
 *          ticker:
 *            type: string
 *          quantity:
 *            type: number
 *          price:
 *            type: number
 *        example:
 *          id: 1
 *          ticker: BLAU3
 *          quantity: 1
 *          price: 24.53
 *      Investment:
 *        type: object
 *        required:
 *          - accountId
 *          - assetId
 *          - ticker
 *          - price
 *          - quantity
 *        properties:
 *          accountId:
 *            type: number
 *          assetId:
 *            type: number
 *          ticker:
 *            type:s tring
 *          price:
 *            type: string
 *          quantity:
 *            type: number
 *        example:
 *          accountId: 1
 *          assetId: 1
 *          ticker: BLAU3
 *          price: "24.53"
 *          quantity: 1
 */

/**
 * @swagger
 *  /assets/account/{id}:
 *    get:
 *      tags: [/assets endpoints]
 *      description: O endpoint retorna uma lista de ativos encontrados na carteira
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          type: number
 *          required: true
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:   
 *                  $ref: '#/components/schemas/Investment'
 */
assetsRoutes.get('/account/:id', validateJWT, getAssetsByAccountId);

/**
 * @swagger
 *  /assets/asset/{id}:
 *    get:
 *      tags: [/assets endpoints]
 *      description: O endpoint retorna o ativo encontrado na corretora
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          type: number
 *          required: true
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:  
 *                $ref: '#/components/schemas/Asset'
 */
assetsRoutes.get('/asset/:id', validateJWT, getAssetByAssetId);

module.exports = assetsRoutes;
