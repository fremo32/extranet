DROP INDEX IF EXISTS `locos_serial_unique`;--> statement-breakpoint
ALTER TABLE `locos` ADD `dcc_address` text;--> statement-breakpoint
ALTER TABLE `railway_companies` ADD `is_protected` numeric DEFAULT '0' NOT NULL;