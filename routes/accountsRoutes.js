const express = require('express');

const depositIntoAccount = require('../controllers/depositIntoAccount');
const withdrawFromAccount = require('../controllers/withdrawFromAccount');
const getBalanceFromAccount = require('../controllers/getBalanceFromAccount');
const createAccount = require('../controllers/createAccount');
const removeAccount = require('../controllers/removeAccount');

const validateJWT = require('../middlewares/validateJWT');

const accountsRoutes = express.Router();

/**
 * @swagger
 *  tags:
 *    name: /accounts endpoints
 */

/**
 * @swagger
 *  components:
 *    schemas: 
 *      Transfer:
 *        type: object
 *        required:
 *          - accountId
 *          - amount 
 *        properties:
 *          accountId:
 *            type: number
 *          amount:
 *            type: number
 *        example:
 *          accountId: 1
 *          amount: 100.55
 *      Account:
 *        type: object
 *        required:
 *          - id
 *          - balance
 *        properties:
 *          id:
 *            type: number
 *          balance:
 *            type: number
 *        example:
 *          id: 1
 *          balance: 100.55
 *      Client:
 *        type: object
 *        required:
 *          - name
 *          - password 
 *        properties:
 *          name:
 *            type: string
 *          password:
 *            type: string
 *        example:
 *          name: Mr. Buffet
 *          password: 12345
 */

/**
 * @swagger
 *  /accounts/deposit:
 *    put:
 *      tags: [/accounts endpoints]
 *      description: O endpoint realiza um depósito na conta indicada
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Transfer'
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:       
 *                $ref: '#/components/schemas/Transfer'
 */
accountsRoutes.put('/deposit', validateJWT, depositIntoAccount);

/**
 * @swagger
 *  /accounts/withdraw:
 *    put:
 *      tags: [/accounts endpoints]
 *      description: O endpoint realiza um saque na conta indicada
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Transfer'
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:       
 *                $ref: '#/components/schemas/Transfer'
 */
accountsRoutes.put('/withdraw', validateJWT, withdrawFromAccount);

/**
 * @swagger
 *  /accounts/account/{id}:
 *    get:
 *      tags: [/accounts endpoints]
 *      description: O endpoint retorna as informações da conta
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
 *                $ref: '#/components/schemas/Account'
 */
accountsRoutes.get('/account/:id', validateJWT, getBalanceFromAccount);

/**
 * @swagger
 *  /accounts/account:
 *    post:
 *      tags: [/accounts endpoints]
 *      description: O endpoint cria uma nova conta na corretora
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Client'
 *      responses:
 *        201:
 *          content:
 *            application/json:
 *              schema:       
 *                $ref: '#/components/schemas/Account'
 */
accountsRoutes.post('/account', createAccount);

/**
 * @swagger
 *  /accounts/account/{id}:
 *    delete:
 *      tags: [/accounts endpoints]
 *      description: O endpoint remove uma conta na corretora
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
 *                $ref: '#/components/schemas/Account'
 */
accountsRoutes.delete('/account/:id', validateJWT, removeAccount);

module.exports = accountsRoutes;
