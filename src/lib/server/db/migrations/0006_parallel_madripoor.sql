CREATE TABLE `meeting_loco_registrations` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`meeting_id` text NOT NULL,
	`loco_id` text,
	`loco_serial` text NOT NULL,
	`loco_dcc_address` text,
	`loco_user_full_name` text,
	`notes` text,
	FOREIGN KEY (`meeting_id`) REFERENCES `meetings`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`loco_id`) REFERENCES `locos`(`id`) ON UPDATE no action ON DELETE no action
);
