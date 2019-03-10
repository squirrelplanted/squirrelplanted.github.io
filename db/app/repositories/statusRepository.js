/*jshint esversion: 6 */

import BaseRepository from './baseRepository';

class StatusRepository extends BaseRepository {  
  constructor(db) {
  	super(db, 'statuses');
  }
}

module.exports = StatusRepository;
