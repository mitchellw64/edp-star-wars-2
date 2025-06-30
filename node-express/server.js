import express from 'express';
import { promises as fs } from 'fs';
import { MongoClient, ObjectId } from 'mongodb';


const url = 'mongodb://localhost:27017';
const dbName = 'swapi';
const planetsCollection = 'planets';

const app = express();
const PORT = 3000;

// when data comes into server, does JSON.parse, when going out does JSON.stringify
app.use(express.json());

// Endpoint to read and send JSON file content
app.get('/api/planets', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(planetsCollection); 
        const planets = await collection.find({}).toArray();
        res.json(planets);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something smells... No planets for you! ☹");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});