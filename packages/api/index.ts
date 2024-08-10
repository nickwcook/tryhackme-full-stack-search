import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import { MongoClient, Db } from "mongodb";

dotenv.config();

if (process.env.NODE_ENV !== 'production' && !process.env.DATABASE_URL) {
  await import('./db/startAndSeedMemoryDB');
}

const PORT = process.env.PORT || 3001;
if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set');
const DATABASE_URL = process.env.DATABASE_URL;

const app = express();

app.use(cors())
app.use(express.json());

let db: Db;

MongoClient.connect(DATABASE_URL)
  .then(res => {
    console.log('Successfully connected to MongoDB!');
    db = res.db();
    app.listen(PORT, () => {
      console.log(`API Server Started at ${PORT}`)
    })
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  })

app.get('/hotels', async (req, res) => {
  try {
    const collection = db.collection('hotels');
    res.send(await collection.find().toArray())
  } catch(error) {
    // TODO
    console.log('Error fetching hotels:', error);
  }
})

app.get('/cities', async (req, res) => {
  try {
    const collection = db.collection('cities');
    res.send(await collection.find().toArray())
  } catch(error) {
    // TODO
    console.log('Error fetching cities:', error);
  }
})
