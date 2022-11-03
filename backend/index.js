import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import products from './utils/products.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: 'include',
  })
);

app.get('/products', (req, res) => {
  res.json(products);
});

app.listen(process.env.PORT, process.env.HOST_NAME, () => {
  console.log(
    `Your server is running successfully at http://${process.env.HOST_NAME}:${process.env.PORT}`
  );
});
