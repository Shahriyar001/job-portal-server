const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dawimtn.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const freshersCollection = client.db('jobPortal').collection('freshers');
        const experienceCollection = client.db('jobPortal').collection('experience');
        const companiesCollection = client.db('jobPortal').collection('companies');

        app.get('/freshers', async (req, res) => {
            const query = {}
            const cursor = freshersCollection.find(query);
            const freshers = await cursor.toArray();
            res.send(freshers);

        })

        app.get('/experience', async (req, res) => {
            const query = {}
            const cursor = experienceCollection.find(query);
            const experience = await cursor.toArray();
            res.send(experience);
        })

        app.get('/companies', async (req, res) => {
            const query = {}
            const cursor = companiesCollection.find(query);
            const companies = await cursor.toArray();
            res.send(companies);
        })
    }
    finally {

    }
}
run().catch(err => console.error(err));


app.get('/', (req, res) => {
    res.send('server is running')
})

app.listen(port, () => {
    console.log(`server ruuning on ${port}`);
})