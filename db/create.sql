/*
Using 'ON UPDATE CASCADE' isn't actually needed since the primary_ids of things ought not to be changing, I had
it turned on just to test out the cascade behavior.
*/

/* THIS IS IMPORTANT! Withoutmanually turning the foreign keys on they just
 * silently do nothing and it's so confusing. 
 */

.mode column
.headers on

PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS `statuses` 
(
	`id` INTEGER NOT NULL constraint statuses_pk primary key autoincrement,
	`name` TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS `actions` 
(
	`id` INTEGER NOT NULL constraint statuses_pk primary key autoincrement,
	`name` TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS `places` 
(
	`id` INTEGER NOT NULL constraint places_pk primary key autoincrement,
	`parent_id` INTEGER,
	`name` TEXT NOT NULL,
	`description` TEXT,
	`location` TEXT,
	`created_at` TEXT,
	FOREIGN KEY(parent_id) REFERENCES places(id) ON DELETE RESTRICT ON UPDATE CASCADE
);

-- this makes it so place names can be re-used so long as they have different parents!
-- We can't set apply this constraint during table creation because the top level objects (cabin, farm, etc)
-- have a NULL parent_id and the unique constraint doesn't trigger on null, also ifnull isn't allowed in create syntax.
CREATE UNIQUE INDEX `unique_places_parent_and_name` ON `places` (
    ifnull(`parent_id`, -1),
    name
);

CREATE TABLE IF NOT EXISTS `classifications` 
(
	`id` INTEGER NOT NULL constraint classifications_pk primary key autoincrement,
	`parent_id` INTEGER,
	`name` TEXT NOT NULL UNIQUE,
	FOREIGN KEY(parent_id) REFERENCES classifications(id) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `plants` 
(
	`id` INTEGER NOT NULL constraint plants_pk primary key autoincrement,
	`place_id` INTEGER NOT NULL,
	`classification_id` INTEGER NOT NULL,
	`cultivar` TEXT,
	`product_link` TEXT,
	FOREIGN KEY(place_id) REFERENCES places(id) ON DELETE RESTRICT ON UPDATE CASCADE
    FOREIGN KEY(classification_id) REFERENCES classifications(id) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `observations` 
(
	`id` INTEGER NOT NULL constraint observations_pk primary key autoincrement,
	`plant_id` INTEGER,
	`status_id` INTEGER, /* dreaming, ordered, growing, dying(?), deceased, removed */
	`action_id` INTEGER, /* observing, planting, harvesting, transplanting, pruning, propagating */
	`note` TEXT,
	`created_at` TEXT,
	`updated_at` TEXT,
	FOREIGN KEY(plant_id) REFERENCES plants(id) ON DELETE RESTRICT ON UPDATE CASCADE
	FOREIGN KEY(status_id) REFERENCES statuses(id) ON DELETE RESTRICT ON UPDATE CASCADE
	FOREIGN KEY(action_id) REFERENCES actions(id) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `images` 
(
	`id` INTEGER NOT NULL constraint images_pk primary key autoincrement,
	`observation_id` INTEGER NOT NULL,
	`url` TEXT,
	FOREIGN KEY(observation_id) REFERENCES observations(id) ON DELETE RESTRICT ON UPDATE CASCADE
);
