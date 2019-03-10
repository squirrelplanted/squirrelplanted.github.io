// SQLite extension for SQLBricks
(function() {
  if (typeof exports != 'undefined')
    sql = require('sql-bricks-sqlite');
  else
    sql = window.SqlBricks;

  sql.Statement.prototype.compile = function compile(opts) {
    var query = this.toParams({placeholder: '?'});
    console.log(query)
    return query;
  }

  if (typeof exports != 'undefined')
    module.exports = sql;
  else
    window.SQLiteBricks = sql;

})();