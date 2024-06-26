const { MongoClient } = require('mongodb');
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const port = process.env.PORT || 5000;
const dotenv = require('dotenv');

dotenv.config();

// Replace the following with your MongoDB Atlas connection string
const uri = process.env.MONGODB_URI;

let db;

async function connectToDatabase() {
    const client = new MongoClient(uri, );
    try {
        await client.connect();
        db = client.db('pdata');
        console.log('Connected to MongoDB Atlas');
    } catch (error) {
        console.error('Error connecting to MongoDB Atlas', error);
    }
}

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Sample route to fetch data from MongoDB
app.get('/data', async (req, res) => {
    try {
        const collection = db.collection('courses');
        const data = await collection.find({}).toArray();
        res.json(data);
    } catch (error) {
        res.status(500).send('Error fetching data');
    }
});

// Connect to the database before starting the server
connectToDatabase().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch(error => {
    console.error('Failed to connect to database', error);
});