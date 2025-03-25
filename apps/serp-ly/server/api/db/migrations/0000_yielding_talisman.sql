CREATE TABLE `boxer_cache` (
	`last_updated` integer,
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text,
	`slug` text,
	`birth_name` text,
	`career` text,
	`debut` text,
	`status` text,
	`gender` text,
	`nationality` text,
	`residence` text,
	`nicknames` text,
	`stance` text,
	`birth_place` text,
	`height_cm` real,
	`reach_cm` real,
	`division` text,
	`content` text,
	`num_wins` integer,
	`num_draws` integer,
	`num_losses` integer,
	`bouts` text,
	`comments` text,
	`upvotes` text
);
--> statement-breakpoint
CREATE TABLE `company_cache` (
	`updated_at` integer,
	`id` integer,
	`name` text NOT NULL,
	`slug` text PRIMARY KEY NOT NULL,
	`one_liner` text,
	`excerpt` text,
	`content` text,
	`domain` text,
	`needs_www` integer,
	`serply_link` text,
	`features` text,
	`pros` text,
	`cons` text,
	`faqs` text,
	`alternatives` text,
	`categories` text,
	`logo` text,
	`screenshots` text,
	`rating` real,
	`downvotes` integer,
	`featured` integer,
	`featured_order` integer,
	`comments` text,
	`upvotes` text
);
--> statement-breakpoint
CREATE TABLE `company_category_cache` (
	`updated_at` integer,
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `mb_artist_metadata_cache` (
	`name` text NOT NULL,
	`slug` text PRIMARY KEY NOT NULL,
	`begin_date` text,
	`end_date` text,
	`artist_type` text,
	`gender` text,
	`area` text,
	`begin_area` text,
	`end_area` text,
	`tags` text NOT NULL,
	`genres` text NOT NULL,
	`release_groups` text NOT NULL,
	`url_rels` text,
	`artist_rels` text,
	`artist_reverse_rels` text,
	`event_rels` text,
	`label_rels` text,
	`place_rels` text,
	`series_rels` text,
	`wikidata` text,
	`overview` text,
	`seo_description` text,
	`seo_title` text,
	`comments` text,
	`upvotes` text
);
--> statement-breakpoint
CREATE TABLE `mb_metadata_cache` (
	`name` text NOT NULL,
	`slug` text PRIMARY KEY NOT NULL,
	`artists` text NOT NULL,
	`tags` text NOT NULL,
	`genres` text NOT NULL,
	`release_group` text,
	`release_group_slug` text,
	`length` integer,
	`artist_rels` text,
	`url_rels` text,
	`work_rels` text,
	`work_url_rels` text,
	`recording_rels` text,
	`recording_reverse_rels` text,
	`series_rels` text,
	`area_rels` text,
	`event_rels` text,
	`label_rels` text,
	`place_rels` text,
	`wikidata` text,
	`work_wikidata` text,
	`lyrics` text,
	`lyrics_annotations` text,
	`lyrics_sync` text,
	`overview` text,
	`seo_description` text,
	`seo_title` text,
	`comments` text,
	`upvotes` text
);
--> statement-breakpoint
CREATE TABLE `mb_release_group_cache` (
	`name` text NOT NULL,
	`slug` text PRIMARY KEY NOT NULL,
	`type` text NOT NULL,
	`secondary_types` text,
	`date` text NOT NULL,
	`cover_art` text,
	`tags` text NOT NULL,
	`genres` text NOT NULL,
	`artists` text NOT NULL,
	`recordings` text NOT NULL,
	`mediums` text NOT NULL,
	`artist_rels` text,
	`url_rels` text,
	`event_rels` text,
	`release_group_rels` text,
	`release_group_reverse_rels` text,
	`series_rels` text,
	`wikidata` text,
	`overview` text,
	`seo_description` text,
	`seo_title` text,
	`comments` text,
	`upvotes` text
);
--> statement-breakpoint
CREATE TABLE `post_cache` (
	`slug` text PRIMARY KEY NOT NULL,
	`id` integer,
	`created_at` integer,
	`updated_at` integer,
	`title` text NOT NULL,
	`excerpt` text,
	`content` text NOT NULL,
	`featured_image` text,
	`author` text,
	`categories` text,
	`one_liner` text,
	`video_id` text,
	`related_posts` text,
	`module` text,
	`keyword` text,
	`comments` text,
	`upvotes` text
);
--> statement-breakpoint
CREATE TABLE `post_category_cache` (
	`id` integer,
	`updated_at` integer,
	`name` text NOT NULL,
	`slug` text PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE `post_index_cache` (
	`key` text PRIMARY KEY NOT NULL,
	`data` text
);
--> statement-breakpoint
CREATE TABLE `short_links` (
	`key` text PRIMARY KEY NOT NULL,
	`data` text,
	`email` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `short_links_email_unique` ON `short_links` (`email`);--> statement-breakpoint
CREATE TABLE `weight_class_cache` (
	`last_updated` integer,
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text,
	`slug` text
);
