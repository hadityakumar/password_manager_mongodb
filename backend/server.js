import express from 'express'
import { MongoClient } from 'mongodb'
import 'dotenv/config'
import cors from 'cors'
import bodyParser from 'body-parser'
import { Result } from 'postcss'


const app = express()
app.use(cors())
app.use(bodyParser.json())
const port = 3000

const client = new MongoClient(process.env.MONGO_URL);
const dbName = 'passop';

//Get all passwords
app.get('/', async (req, res) =>{
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    let data = await collection.find({}).toArray();
    res.json(data);
})

//Save a new password
app.post('/', async(req, res) => {
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    let data = await collection.insertOne(req.body);
    res.send({success: true, result: data});
})

//Delete a password
app.delete('/:id', async(req, res) => {
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    let data = await collection.deleteOne({id: req.params.id});
    res.send({success: true, result: data});

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})