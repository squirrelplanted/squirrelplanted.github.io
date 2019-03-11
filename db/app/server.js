import express from 'express'
import pug from 'pug'
import BaseRepository from './repositories/baseRepository'
import PlantRepository from './repositories/plantRepository'
import StatusRepository from './repositories/statusRepository'
import PlacesRepository from './repositories/placesRepository'

// TODO get the readonly flag from _config and override for local
const options = {readonly: false}
const db = require('better-sqlite3')('.././squirrelplanted.db', options);

const plantRepository = new PlantRepository(db)
const statusesRepo = new StatusRepository(db)
const actionsRepo = new BaseRepository(db, "actions")
const placesRepo = new PlacesRepository(db)
const observationsRepo = new BaseRepository(db, "observations")

const app = express()
app.use(express.json());
app.set('view engine', 'pug')
app.set('views', 'views');

const port = 3000

app.get('/api/plants', (req, res) => res.send(plantRepository.all()))
app.get('/api/statuses', (req, res) => res.send(statusesRepo.all()))
app.get('/api/actions', (req, res) => res.send(actionsRepo.all()))
app.get('/api/places', (req, res) => res.send(placesRepo.all()))
app.get('/api/observations', (req, res) => res.send(observationsRepo.all()))

// Getting individual resources or filtering them
app.get('/api/statuses/:id', (req, res) => res.send(statusesRepo.get(req.params['id'])))
app.get('/api/actions/:id', (req, res) => res.send(statusesRepo.get(req.params['id'])))

/* places */
app.post('/api/places', (req, res) => res.send(placesRepo.insert(req.body)))
app.put('/api/places/:id', (req, res) => res.send(placesRepo.update(req.params['id'], req.body)))

app.get('/', function(req, res) {
  res.render('index', {"title":"Welcome!"})
});

// TODO filtering - do we limit the plant view by location?
app.post('/api/plants', (req, res) => res.send(plantRepository.insert(req.body)))
app.get('/plants', function(req, res) {
  res.render('plants', {"title":"Plants!", "root": {"children":plantRepository.all()}})
});

app.get('/places', function(req, res) {
  res.render('places', {"title":"Places!", "root": {"children":placesRepo.allAsTree()}})
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))