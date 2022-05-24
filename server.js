const express = require('express');
const bodyParser = require('body-parser');

const { getCharachters, getCharById, deleteCharById, addOrUpdate } = require('./dynamoDB')

const app = express()

app.use(bodyParser.json())

const PORT = 5000;


app.get('/charachters', async (req, res) => {
    try {
        const crachs = await getCharachters()

        res.json(crachs)
    } catch (err) {
        console.log(err);
    }
})


app.get('/charachter/:id', async (req, res) => {
    try {

        const id = req.params.id
        const char = await getCharById(id)
        res.json(char)
    } catch (err) {
        console.log(err);
    }
})


app.delete('/charachter/delete/:id', async (req, res) => {
    const id = req.params.id
    try {
        await deleteCharById(id)
        res.json({
            success: true
        })

    } catch (err) {
        console.log(err);
    }
})





app.post('/new/charachter', async (req, res) => {

    const data = req.body;
    console.log(data);
    try {
        console.log(data);
        const char = await addOrUpdate(data)
        res.json(char)
    } catch (err) {
        console.log(err);
    }
})




app.listen(PORT, console.log("PORT IS LISTING"))