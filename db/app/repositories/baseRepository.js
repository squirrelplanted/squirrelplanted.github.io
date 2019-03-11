// THE MORE YOU KNOW - tablename names can't be parameters, so there is janky string concatenation below
// Yes it is bad, but since the tablename variables are internal only and I never plan to share this I
// don't really care. This will almost definitely bite me later.

var sql = require('../helpers/sql-bricks-improved');

class BaseRepository {  
  constructor(db, tablename) {
    this.db = db
    this.tablename = tablename
  }

  all() {
    var query = sql.select().from(this.tablename).compile()
    return this.db.prepare(query.text).all();
  }

  get(id) {
    var query = sql.select().from(this.tablename).where({"id":id}).compile()
    return this.db.prepare(query.text).get(query.values);
  }

  insert(item) {
    var query = sql.insert(this.tablename, item).compile();
    return this.db.prepare(query.text).run(query.values)
  }

  update(id, item) {
    var query = sql.update(this.tablename, item).where({"id":id}).compile();
    return this.db.prepare(query.text).run(query.values)
  }
}

module.exports = BaseRepository;
