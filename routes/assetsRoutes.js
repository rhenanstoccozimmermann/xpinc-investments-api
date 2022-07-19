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
 *          - quantity
 *          - price
 *        properties:
 *          id:
 *            type: number
 *          quantity:
 *            type: number
 *          price:
 *            type: number
 *        example:
 *          id: 1
 *          quantity: 1
 *          price: 100.55
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
 *                  $ref: '#/components/schemas/Asset'
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
