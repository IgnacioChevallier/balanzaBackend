const { MongoClient } = require('mongodb')
// Replace the uri string with your MongoDB deployment's connection string.
const config = require('./config');
const mongoUri = 'mongodb://' + config.mongodb.hostname + ':' + config.mongodb.port + '/' + config.mongodb.database;
// Create a new client and connect to MongoDB
const client = new MongoClient(mongoUri);

async function run() {
    try {
        // Connect to the "insertDB" database and access its "haiku" collection
        const database = client.db(config.mongodb.database);
        const haiku = database.collection("flights");

        // Create a document to insert
        const doc = {
            passenger_id : '2',
            flight_id : 'AR 1300',
            max_weight : '500',
            max_height : '20',
        }
        // Insert the defined document into the "haiku" collection
        const result = await haiku.insertOne(doc);

        // Print the ID of the inserted document
        console.log(`A document was inserted with the _id: ${result.insertedId}`);
    } finally {
        // Close the MongoDB client connection
        await client.close();
    }
}
// Run the function and handle any errors
run().catch(console.dir);