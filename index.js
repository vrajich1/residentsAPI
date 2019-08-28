const express = require('express')
const app = express()
const port = 5000
const monk = require('monk')
const bodyParser = require('body-parser')
const cors = require('cors')

// Connection URL
const url = `mongodb://ilijavrajich:residents12345@cluster0-shard-00-00-r52nv.mongodb.net:27017,cluster0-shard-00-01-r52nv.mongodb.net:27017,cluster0-shard-00-02-r52nv.mongodb.net:27017/Residents?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`


const db = monk(url);
console.log(db)

db.then(() => { 
    console.log('connected')//connects to the server
})
.catch(err => {
    console.log('err')
})

const residents = db.get('Residents')

app.use(cors())
app.use(bodyParser.json())
//working
app.get('/', async (req, res) => {
  const results = await residents.find()
  res.status(200).send(results)
});
//working
app.post('/', async (req, res) => {
  const results = await residents.insert(req.body)
  res.status(200).send(results)
});
//working
app.put('/:id', async (req, res) => {
  const results = await residents.findOneAndUpdate(req.params.id, {$set: req.body})
  res.status(200).send(results)
});
//working
app.delete('/:id', async (req, res) => {
  const results = await residents.findOneAndDelete(req.params.id)
  res.status(200).send(results)
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))