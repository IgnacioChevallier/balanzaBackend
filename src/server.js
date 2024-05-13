const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require("./config");
const date_time = new Date();
const app = express();
app.use(cors());
app.use(bodyParser.json());

const uri = 'mongodb://' + config.mongodb.hostname + ':' + config.mongodb.port + '/' + config.mongodb.database;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function startServer() {
    try {
        await client.connect();
        console.log("Connected successfully to MongoDB");
        const db = client.db(config.mongodb.database);
        const haiku = db.collection(config.mongodb.collection);


        app.post('/save-data', async (req, res) => {
            const { topic, message } = req.body;

            // Create a document to insert
            const document = { topic, message: message.toString(), fecha: date_time, content: "Prueba de content" };

            try {
                const result = await haiku.insertOne(document);
                console.log(`Datos insertados del topic ${topic}`);
                res.status(200).send(`Datos guardados ${result}`);
            } catch (err) {
                console.error('Error al guardar datos en MongoDB:', err);
                res.status(500).send('Error al guardar datos en MongoDB');
            }
        });

        // GET request to fetch flights from db
        app.get('/data/:passengerID', async (req, res) => {
            try {
                const passengerID = req.params.passengerID;
                const database = client.db(config.mongodb.database);
                const flights = database.collection('flights');
                const data = await flights.findOne({ passenger_id: passengerID });
                res.send(data);
            } catch (err) {
                console.error('Error fetching data from MongoDB', err);
                res.status(500).send('Error fetching data from MongoDB');
            }
        });

        app.listen(config.mongodb.port, () => {
            console.log('Server is running on port ' + config.mongodb.port);
        });
    } catch (err) {
        console.error('Error connecting to MongoDB', err);
        process.exit(1);
    }
}

startServer().then(r => console.log('Server started successfully')).catch(err => console.error('Error starting server:', err));