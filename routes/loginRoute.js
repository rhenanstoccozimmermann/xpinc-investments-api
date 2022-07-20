const express = require('express');

const login = require('../controllers/login');

const loginRoute = express.Router();

/**
 * @swagger
 *  tags:
 *    name: /login endpoint
 */

/**
 * @swagger
 *  components:
 *    schemas: 
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
 *      Token:
 *        type: object
 *        required:
 *          - token
 *        properties:
 *          token:
 *            type: string
 *        example:
 *          token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 */

/**
 * @swagger
 *  /login:
 *    post:
 *      tags: [/login endpoint]
 *      description: O endpoint realiza o login do cliente
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Client'
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:       
 *                $ref: '#/components/schemas/Token'
 */
loginRoute.post('/', login);

module.exports = loginRoute;
