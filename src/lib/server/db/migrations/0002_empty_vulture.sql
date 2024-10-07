CREATE TABLE `locos` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`railway_company_id` text NOT NULL,
	`loco_class_id` text NOT NULL,
	`serial` text NOT NULL,
	`epoch` text,
	`railway_gauge_id` text NOT NULL,
	`notes` text,
	`model_manufacturer_id` text,
	`has_weathering` numeric DEFAULT '0' NOT NULL,
	`has_fredi` numeric DEFAULT '0' NOT NULL,
	`has_card` numeric DEFAULT '0' NOT NULL,
	`user_id` text,
	FOREIGN KEY (`railway_company_id`) REFERENCES `railway_companies`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`loco_class_id`) REFERENCES `loco_classes`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`railway_gauge_id`) REFERENCES `railway_gauges`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`model_manufacturer_id`) REFERENCES `model_manufacturers`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `model_manufacturers` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `railway_gauges` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`badge_color` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `locos_serial_unique` ON `locos` (`serial`);--> statement-breakpoint
CREATE UNIQUE INDEX `model_manufacturers_name_unique` ON `model_manufacturers` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `railway_gauges_name_unique` ON `railway_gauges` (`name`);