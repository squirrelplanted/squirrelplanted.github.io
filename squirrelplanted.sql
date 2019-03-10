CREATE TABLE `places` 
(
	`id` INTEGER NOT NULL constraint places_pk primary key autoincrement,
	`parent_id` INTEGER,
	`name` TEXT NOT NULL,
	`description` TEXT,
	`location` TEXT,
	`created_at` TEXT
);

CREATE TABLE `classifications` 
(
	`id` INTEGER NOT NULL constraint classifications_pk primary key autoincrement,
	`parent_id` INTEGER,
	`name` TEXT NOT NULL
);

CREATE TABLE `plants` 
(
	`id` INTEGER NOT NULL constraint plants_pk primary key autoincrement,
	`place_id` INTEGER NOT NULL,
	`classification_id` INTEGER NOT NULL,
	`cultivar` TEXT,
	`product_link` TEXT,
	FOREIGN KEY(place_id) REFERENCES places(id),
	FOREIGN KEY(classification_id) REFERENCES classifications(id)
);

CREATE TABLE `observations` 
(
	`id` INTEGER NOT NULL constraint observations_pk primary key autoincrement,
	`plant_id` INTEGER,
	`status` TEXT NOT NULL,
	`note` text,
	`created_at` TEXT,
	`updated_at` TEXT,
	FOREIGN KEY(plant_id) REFERENCES plants(id)
);

CREATE TABLE `images` 
(
	`id` INTEGER NOT NULL constraint images_pk primary key autoincrement,
	`observation_id` INTEGER NOT NULL,
	`url` TEXT,
	FOREIGN KEY(observation_id) REFERENCES observations(id)
);
