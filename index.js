const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

//Middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0oc3y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run() {
    try {
        await client.connect();
        const todosCollections = client.db("emajohn").collection("todos");

        //Post Todo
        app.post('/todo', async (req, res) => {
            const newTodo = req.body
            const addTodo = await todosCollections.insertOne(newTodo);
            res.send(addTodo);
        });

        //Get Todo
        app.get('/todo', async (req, res) => {
            const query = {};
            const cursor = todosCollections.find(query);
            const todos = await cursor.toArray();
            res.send(todos);
        });

        //DELETE
        app.delete('/todo/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const deleteItem = await todosCollections.deleteOne(query);
            res.send(deleteItem);
        });

    }
    finally {

    }
};

run().catch(console.dir);


//Testing API
app.get('/', (req, res) => {
    res.send('Hello From To-do app')
});

app.listen(port, () => {
    console.log(`to-do app listening on port ${port}`)
});
