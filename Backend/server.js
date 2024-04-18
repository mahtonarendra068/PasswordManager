const express = require('express')
const dotenv = require('dotenv')
const cors= require('cors')
const { MongoClient } = require('mongodb');
const bodyparser = require('body-parser')

dotenv.config()


// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'PassOP';
const app = express()
const port = 3000
app.use(bodyparser.json())
app.use(cors())


client.connect();


// console.log(process.env.MONGO_URI)



// GEt all the passwords
app.get('/', async (req, res) => {

  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.find({}).toArray();
  res.json(findResult)
})

// save all passwords
app.post('/', async (req, res) => {

  const password = req.body
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.insertOne(password);
  res.json({ success: true, result: findResult });
})

// Delete passwords
app.delete('/', async (req, res) => {

  const password = req.body
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.deleteOne(password);
  res.json({ success: true, result: findResult });
})

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})