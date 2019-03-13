/*jshint esversion: 6 */

/*
	`id` INTEGER NOT NULL constraint plants_pk primary key autoincrement,
	`place_id` INTEGER NOT NULL,
	`classification_id` INTEGER NOT NULL,
	`cultivar` TEXT,
	`product_link` TEXT,
 */
import BaseRepository from './baseRepository';

class PlantRepository extends BaseRepository {  
  constructor(db) {
    super(db, "plants");
  }
}

module.exports = PlantRepository;
