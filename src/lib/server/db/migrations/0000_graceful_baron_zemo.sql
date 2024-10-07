CREATE TABLE `loco_classes` (
	`id` text PRIMARY KEY NOT NULL,
	`railway_company_id` text NOT NULL,
	`name` text NOT NULL,
	`genre` text,
	`loco_type_id` text NOT NULL,
	FOREIGN KEY (`railway_company_id`) REFERENCES `railway_companies`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`loco_type_id`) REFERENCES `loco_types`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `loco_types` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `railway_companies` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`badge_color` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `loco_classes_railway_company_id_name_genre_unique` ON `loco_classes` (`railway_company_id`,`name`,`genre`);--> statement-breakpoint
CREATE UNIQUE INDEX `loco_types_name_unique` ON `loco_types` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `railway_companies_name_unique` ON `railway_companies` (`name`);