module.exports = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'XP Inc. Investments API',
      description: 'Desafio Técnico Turma XP - Trybe | XP Inc.',
      version: '1.0',
    },
    servers: [{
      url: 'http://localhost:3000',
      description: 'servidor local',
    },
    {
      url: 'https://xpinc-investments-api.herokuapp.com',
      description: 'servidor de produção',
    }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: [
    './routes/loginRoute.js',
    './routes/investmentsRoutes.js',
    './routes/assetsRoutes.js',
    './routes/accountsRoutes.js',
  ],
};
