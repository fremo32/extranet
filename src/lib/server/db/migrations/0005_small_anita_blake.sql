CREATE TABLE `meeting_loco_turnarounds` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`meeting_id` text NOT NULL,
	`name` text NOT NULL,
	`loco_class` text,
	`start_position` text,
	`train_number` text,
	FOREIGN KEY (`meeting_id`) REFERENCES `meetings`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `meeting_loco_turnarounds_name_unique` ON `meeting_loco_turnarounds` (`name`);