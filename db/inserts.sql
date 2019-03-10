/*
%w(dreaming ordered growing struggling deceased removed).each.with_index {|name, id| puts "INSERT INTO statuses(id, name) VALUES(#{id}, '#{name}');"}

%w(observing planting harvesting moving pruning propagating).each.with_index {|name, id| puts "INSERT INTO actions(id, name) VALUES(#{id}, '#{name}');"}
*/

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
