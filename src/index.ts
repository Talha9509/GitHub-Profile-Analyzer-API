import express from 'express'
import { prisma } from './lib/prisma.js'

const app = express()

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});