const express = require('express');

const depositIntoAccountController = require('../controllers/depositIntoAccount');
const withdrawFromAccountController = require('../controllers/withdrawFromAccount');
const getBalanceFromAccountController = require('../controllers/getBalanceFromAccount');
const createAccountController = require('../controllers/createAccount');
const removeAccountController = require('../controllers/removeAccount');
const updateAccountController = require('../controllers/updateAccount');

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
 *          - accountId
 *          - balance
 *        properties:
 *          accountId:
 *            type: number
 *          balance:
 *            type: number
 *        example:
 *          accountId: 1
 *          balance: 100.55
 *      Client:
 *        type: object
 *        required:
 *          - name
 *          - identityCard
 *          - password 
 *        properties:
 *          name:
 *            type: string
 *          identityCard:
 *            type: string
 *          password:
 *            type: string
 *        example:
 *          name: Mr. Buffet
 *          identityCard: 11111111111
 *          password: 12345
 *      Password:
 *        type: object
 *        required:
 *          - password 
 *        properties:
 *          password:
 *            type: string
 *        example:
 *          password: 54321
 *      Message:
 *        type: object
 *        required:
 *          - message 
 *        properties:
 *          message:
 *            type: string
 *        example:
 *          message: A ação foi concluída com sucesso.
 */

/**
 * @swagger
 *  /accounts/deposit:
 *    post:
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
 *                $ref: '#/components/schemas/Account'
 */
accountsRoutes.post('/deposit', validateJWT, depositIntoAccountController.depositIntoAccount);

/**
 * @swagger
 *  /accounts/withdraw:
 *    post:
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
 *                $ref: '#/components/schemas/Account'
 */
accountsRoutes.post('/withdraw', validateJWT, withdrawFromAccountController.withdrawFromAccount);

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
accountsRoutes.get('/account/:id', validateJWT, getBalanceFromAccountController.getBalanceFromAccount);

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
accountsRoutes.post('/account', createAccountController.createAccount);

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
 *                $ref: '#/components/schemas/Message'
 */
accountsRoutes.delete('/account/:id', validateJWT, removeAccountController.removeAccount);

/**
 * @swagger
 *  /accounts/account/{id}:
 *    put:
 *      tags: [/accounts endpoints]
 *      description: O endpoint altera a senha do cliente na corretora
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          type: number
 *          required: true
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Password'
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema: 
 *                $ref: '#/components/schemas/Message'
 */
accountsRoutes.put('/account/:id', validateJWT, updateAccountController.updateAccount);

module.exports = accountsRoutes;
