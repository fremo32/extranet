CREATE TABLE `meetings` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`name` text NOT NULL,
	`start_date` integer NOT NULL,
	`endDate` integer NOT NULL
);
