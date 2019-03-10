import express from 'express'
import BaseRepository from './repositories/baseRepository'
import PlantRepository from './repositories/plantRepository'
import StatusRepository from './repositories/statusRepository'

// TODO get the readonly flag from _config and override for local
const options = {readonly: false}
const db = require('better-sqlite3')('squirrelplanted.db', options);

const plantRepository = new PlantRepository(db)
const statusesRepo = new StatusRepository(db)
const actionsRepo = new BaseRepository(db, "actions")
const placesRepo = new BaseRepository(db, "places")
const observationsRepo = new BaseRepository(db, "observations")

const app = express()
app.use(express.json());

const port = 3000

app.get('/plants', (req, res) => res.send(plantRepository.all()))
app.get('/statuses', (req, res) => res.send(statusesRepo.all()))
app.get('/actions', (req, res) => res.send(actionsRepo.all()))
app.get('/places', (req, res) => res.send(placesRepo.all()))
app.get('/observations', (req, res) => res.send(observationsRepo.all()))

// Getting individual resources or filtering them
app.get('/statuses/:id', (req, res) => res.send(statusesRepo.get(req.params['id'])))
app.get('/actions/:id', (req, res) => res.send(statusesRepo.get(req.params['id'])))


app.post('/places', function(req, res){
  res.send(placesRepo.insert(req.body));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))