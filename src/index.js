import express from 'express';
import cors from 'cors';
import { createUrlTable, createUserTable } from './DBTables.js';
import { router } from './router/routes.js';
import { openDb } from './configDB.js';
import dotenv from 'dotenv';
import { swaggerSpec, swaggerUi } from './docs/swagger.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3033

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(cors());
app.use(express.json());


openDb().then(async (db) => {
  try {
    await createUrlTable();
    await createUserTable();


    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Erro ao configurar o banco de dados:', error);
  }
}).catch(error => {
  console.error('Erro ao abrir o banco de dados:', error);
});


app.use(router);

export default app;
