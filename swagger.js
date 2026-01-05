const swagger = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "筆記API",
      version: "1.0.0",
      description: "這是一個用於學習 Node.js 後端開發的 API 文件",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "開發環境 (Local)",
      },
    ],
    components: {
      securitySchemes: {
        bearAuth: {
          type: "http",
          scheme: "Bearer",
        },
      },
    },
  },
  apis: ["./router.js"],
};

const specs = swagger(options);
module.exports = specs;
