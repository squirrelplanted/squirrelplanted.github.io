/*jshint esversion: 6 */

import BaseRepository from './baseRepository';

class PlacesRepository extends BaseRepository {  
  constructor(db) {
  	super(db, "places");
  }
}

module.exports = PlacesRepository;
