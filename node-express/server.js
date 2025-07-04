import express from 'express';
import { promises as fs } from 'fs';
import cors from 'cors';
import { MongoClient, ObjectId } from 'mongodb';


const url = 'mongodb://localhost:27017';
const dbName = 'swapi';
const planetsCollection = 'planets';
const filmsCollection = 'films';
const charactersCollection = 'characters';
const films_charactersCollection = 'films_characters';
const films_planetsCollection = 'films_planets';

const app = express();
app.use(cors());
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
        const collection = db.collection(charactersCollection); 
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
        const collection = db.collection(films_charactersCollection); 
        const films_characters = (await collection.find({film_id:Number(id)}).toArray()).map(character=>character.character_id);
        console.log(films_characters);
        const xyz = db.collection(charactersCollection);
        const characters = await xyz.find({id:{$in:films_characters}}).toArray();
        res.json(characters);
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
        const films_planets = (await collection.find({film_id:Number(id)}).toArray()).map(planet=>planet.planet_id);
        console.log(films_planets);
        const xyz = db.collection(planetsCollection);
        const planets = await xyz.find({id:{$in:films_planets}}).toArray();
        res.json(planets);
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
        const collection = db.collection(films_charactersCollection); 
        const films_characters = (await collection.find({character_id:Number(id)}).toArray()).map(film=>film.film_id);
        console.log (films_characters);
        const xyz = db.collection(filmsCollection);
        const films = await xyz.find({id:{$in:films_characters}}).toArray();
        res.json(films);
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
        const films_planets = (await collection.find({planet_id:Number(id)}).toArray()).map(film=>film.film_id);
        console.log(films_planets);
        const xyz = db.collection(filmsCollection);
        const films = await xyz.find({id:{$in:films_planets}}).toArray();
        res.json(films);
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
        const collection = db.collection(charactersCollection); 
        const homePlanet = await collection.find({homeworld:Number(id)}).toArray();
        res.json(homePlanet);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something smells... No film planets for you! ☹");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});