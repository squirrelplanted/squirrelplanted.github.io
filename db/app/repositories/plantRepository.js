/*jshint esversion: 6 */

import BaseRepository from './baseRepository';

class PlantRepository extends BaseRepository {  
  constructor(db) {
  	super(db, "plants");
  }
}

module.exports = PlantRepository;
