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

        app.post('/submitFlight', async (req, res) => {
            console.log('entro al backend submit-flight-data')
            const { passenger_id, flight_id, max_height, max_weight } = req.body;

            // Create a document to insert
            const document = { passenger_id, flight_id, max_height, max_weight };

            //especifico flights
            const flights = client.db(config.mongodb.database).collection("flights");

            try {
                const result = await flights.insertOne(document);
                console.log(`Flight data inserted for passenger ${passenger_id}`);
                res.status(200).send(`Flight data saved ${result}`);
            } catch (err) {
                console.error('Error saving flight data in MongoDB:', err);
                res.status(500).send('Error saving flight data in MongoDB');
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

        app.listen(config.app.port, '127.0.0.1',() => {
            console.log('Server is running on port ' + config.app.port);
        });
    } catch (err) {
        console.error('Error connecting to MongoDB', err);
        process.exit(1);
    }
}

startServer().then(() => console.log('Server started successfully')).catch(err => console.error('Error starting server:', err));