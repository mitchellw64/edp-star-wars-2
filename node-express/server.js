import express from 'express';
import { promises as fs } from 'fs';
import { MongoClient, ObjectId } from 'mongodb';


const url = 'mongodb://localhost:27017';
const dbName = 'swapi';
const planetsCollection = 'planets';
const filmsCollection = 'films';
const charcatersCollection = 'characters';
const films_charcatersCollection = 'films_characters';
const films_planetsCollection = 'films_planets';

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
app.get('/api/films', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(filmsCollection); 
        const films = await collection.find({}).toArray();
        res.json(films);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something smells... No films for you! ☹");
    }
});
app.get('/api/characters', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(charcatersCollection); 
        const characters = await collection.find({}).toArray();
        res.json(characters);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something smells... No characters for you! ☹");
    }
});
app.get('/api/characters/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(charactersCollection); 
        const characters = await collection.find({id:Number(id)}).toArray();
        res.json(characters);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something smells... No characters for you! ☹");
    }
});
app.get('/api/films/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(filmsCollection); 
        const films = await collection.find({id:Number(id)}).toArray();
        res.json(films);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something smells... No films for you! ☹");
    }
});
app.get('/api/planets/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(planetsCollection); 
        const planets = await collection.find({id:Number(id)}).toArray();
        res.json(planets);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something smells... No planets for you! ☹");
    }
});
app.get('/api/films/:id/characters', async (req, res) => {
    try {
        const { id } = req.params;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(films_charcatersCollection); 
        const films_characters = await collection.find({id:Number(id)}).toArray();
        res.json(films_characters);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something smells... No film characters for you! ☹");
    }
});
app.get('/api/films/:id/planets', async (req, res) => {
    try {
        const { id } = req.params;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(films_planetsCollection); 
        const films_planets = await collection.find({id:Number(id)}).toArray();
        res.json(films_planets);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something smells... No film planets for you! ☹");
    }
});
app.get('/api/characters/:id/films', async (req, res) => {
    try {
        const { id } = req.params;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(films_charcatersCollection); 
        const films_characters = await collection.find({id:Number(id)}).toArray();
        res.json(films_characters);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something smells... No film characters for you! ☹");
    }
});
app.get('/api/planets/:id/films', async (req, res) => {
    try {
        const { id } = req.params;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(films_planetsCollection); 
        const films_planets = await collection.find({id:Number(id)}).toArray();
        res.json(films_planets);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something smells... No film planets for you! ☹");
    }
});
app.get('/api/planets/:id/characters', async (req, res) => {
    try {
        const { id } = req.params;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(planets); 
        const films_planets = await collection.find({id:Number(id)}).toArray();
        res.json(films_planets);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something smells... No film planets for you! ☹");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});