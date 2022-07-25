const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

//Middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0oc3y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
});

async function run() {
    try {
        await client.connect();
        const todosCollections = client.db("emajohn").collection('to-do');
        console.log('DB connected');
    }
    finally {

    }
};






run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello From To-do app')
});

app.listen(port, () => {
    console.log(`to-do app listening on port ${port}`)
});
