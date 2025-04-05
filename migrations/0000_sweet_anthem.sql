CREATE TABLE `audit_logs` (
	`id` text PRIMARY KEY NOT NULL,
	`org_id` text NOT NULL,
	`action` text NOT NULL,
	`entity_id` text NOT NULL,
	`entity_type` text NOT NULL,
	`entity_title` text NOT NULL,
	`user_id` text NOT NULL,
	`user_image` text NOT NULL,
	`user_name` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `boards` (
	`id` text PRIMARY KEY NOT NULL,
	`org_id` text NOT NULL,
	`title` text NOT NULL,
	`image_id` text NOT NULL,
	`image_thumb_url` text NOT NULL,
	`image_full_url` text NOT NULL,
	`image_user_name` text NOT NULL,
	`image_link_html` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `cards` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`order` integer NOT NULL,
	`list_id` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`list_id`) REFERENCES `lists`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `lists` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`order` integer NOT NULL,
	`board_id` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`board_id`) REFERENCES `boards`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `org_limits` (
	`id` text PRIMARY KEY NOT NULL,
	`org_id` text NOT NULL,
	`count` integer DEFAULT 0 NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `org_limits_org_id_unique` ON `org_limits` (`org_id`);--> statement-breakpoint
CREATE TABLE `org_subscriptions` (
	`id` text PRIMARY KEY NOT NULL,
	`org_id` text NOT NULL,
	`stripe_customer_id` text,
	`stripe_subscription_id` text,
	`stripe_price_id` text,
	`stripe_current_period_end` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `org_subscriptions_org_id_unique` ON `org_subscriptions` (`org_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `org_subscriptions_stripe_customer_id_unique` ON `org_subscriptions` (`stripe_customer_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `org_subscriptions_stripe_subscription_id_unique` ON `org_subscriptions` (`stripe_subscription_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `org_subscriptions_stripe_price_id_unique` ON `org_subscriptions` (`stripe_price_id`);