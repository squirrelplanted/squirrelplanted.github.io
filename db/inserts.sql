/*
%w(dreaming ordered growing struggling deceased removed).each.with_index {|name, id| puts "INSERT INTO statuses(id, name) VALUES(#{id}, '#{name}');"}

%w(observing planting harvesting moving pruning propagating).each.with_index {|name, id| puts "INSERT INTO actions(id, name) VALUES(#{id}, '#{name}');"}
*/

/* classifications */
INSERT INTO classifications(name) VALUES('tree');
INSERT INTO classifications(name) VALUES('bush');
INSERT INTO classifications(name) VALUES('vine');
INSERT INTO classifications(name) VALUES('groundcover');
INSERT INTO classifications(name) VALUES('cane');

INSERT INTO classifications(parent_id, name) SELECT id, 'apple'     FROM classifications WHERE name = 'tree';
INSERT INTO classifications(parent_id, name) SELECT id, 'pear'      FROM classifications WHERE name = 'tree';
INSERT INTO classifications(parent_id, name) SELECT id, 'apricot'   FROM classifications WHERE name = 'tree';
INSERT INTO classifications(parent_id, name) SELECT id, 'fig'       FROM classifications WHERE name = 'tree';
INSERT INTO classifications(parent_id, name) SELECT id, 'jujube'    FROM classifications WHERE name = 'tree';
INSERT INTO classifications(parent_id, name) SELECT id, 'nectarine' FROM classifications WHERE name = 'tree';
INSERT INTO classifications(parent_id, name) SELECT id, 'persimmon' FROM classifications WHERE name = 'tree';
INSERT INTO classifications(parent_id, name) SELECT id, 'plum'      FROM classifications WHERE name = 'tree';
INSERT INTO classifications(parent_id, name) SELECT id, 'mulberry'  FROM classifications WHERE name = 'tree';

INSERT INTO classifications(parent_id, name) SELECT id, 'blueberry'  FROM classifications WHERE name = 'bush';
INSERT INTO classifications(parent_id, name) SELECT id, 'kiwi'       FROM classifications WHERE name = 'vine';
INSERT INTO classifications(parent_id, name) SELECT id, 'raspberry'  FROM classifications WHERE name = 'cane';
INSERT INTO classifications(parent_id, name) SELECT id, 'strawberry' FROM classifications WHERE name = 'groundcover';

/* statuses */
INSERT INTO statuses(id, name) VALUES(0, 'dreaming');
INSERT INTO statuses(id, name) VALUES(1, 'ordered');
INSERT INTO statuses(id, name) VALUES(2, 'growing');
INSERT INTO statuses(id, name) VALUES(3, 'struggling');
INSERT INTO statuses(id, name) VALUES(4, 'deceased');
INSERT INTO statuses(id, name) VALUES(5, 'removed');

/* actions */
INSERT INTO actions(id, name) VALUES(0, 'observing');
INSERT INTO actions(id, name) VALUES(1, 'planting');
INSERT INTO actions(id, name) VALUES(2, 'harvesting');
INSERT INTO actions(id, name) VALUES(3, 'moving');
INSERT INTO actions(id, name) VALUES(4, 'pruning');
INSERT INTO actions(id, name) VALUES(5, 'propagating');

/* places */
INSERT INTO places(name) VALUES('cabin');
INSERT INTO places(name) VALUES('farm');
INSERT INTO places(name) VALUES('seattle house');

INSERT INTO places(parent_id, name) SELECT id, 'greenhouse'  FROM places WHERE name = "cabin";
INSERT INTO places(parent_id, name) SELECT id, 'orchard'     FROM places WHERE name = "cabin";
INSERT INTO places(parent_id, name) SELECT id, 'forest'      FROM places WHERE name = "cabin";
INSERT INTO places(parent_id, name) SELECT id, 'raised beds' FROM places WHERE name = "cabin";

INSERT INTO places(parent_id, name) SELECT id, 'bed-1'       FROM places WHERE name = "raised beds";
INSERT INTO places(parent_id, name) SELECT id, 'bed-2'       FROM places WHERE name = "raised beds";
INSERT INTO places(parent_id, name) SELECT id, 'bed-3'       FROM places WHERE name = "raised beds";
INSERT INTO places(parent_id, name) SELECT id, 'bed-4'       FROM places WHERE name = "raised beds";
INSERT INTO places(parent_id, name) SELECT id, 'blueberries' FROM places WHERE name = "raised beds";

INSERT INTO places(parent_id, name) SELECT id, 'garden'        FROM places WHERE name = "farm";
INSERT INTO places(parent_id, name) SELECT id, 'wedding field' FROM places WHERE name = "farm";
INSERT INTO places(parent_id, name) SELECT id, 'orchard'       FROM places WHERE name = "farm";

