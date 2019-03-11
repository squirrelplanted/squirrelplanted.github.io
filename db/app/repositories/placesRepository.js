/*jshint esversion: 6 */

import BaseRepository from './baseRepository';

var _makeTree = function(options) {
  var children, e, id, o, pid, temp, _i, _len, _ref;
  id = options.id || "id";
  pid = options.parentid || "parent_id";
  children = options.children || "children";
  temp = {};
  o = [];
  _ref = options.q;
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    e = _ref[_i];
    e[children] = [];
    temp[e[id]] = e;
    if (temp[e[pid]] != null) {
      temp[e[pid]][children].push(e);
    } else {
      o.push(e);
    }
  }
  return o;
};

class PlacesRepository extends BaseRepository {  
  constructor(db) {
  	super(db, "places");
  }

// override the default all so that we can include the count of how many plants there are at each location
  all() {
    var query = sql.select().from(this.tablename).compile()
    return this.db.prepare(query.text).all();
  }
  // I thought I would need some special logic for "moving" things around
  // but the way Base `update` is defined actually works great
  // move(new_parent_id) {}
  allAsTree() {
  	var places = _makeTree({"q":this.all()});
  	console.log(JSON.stringify(places))
  	return places
  }
}

module.exports = PlacesRepository;
