CREATE TABLE `boxer_cache` (
	`last_updated` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer)) NOT NULL,
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
	`bouts` text
);
--> statement-breakpoint
CREATE TABLE `company_cache` (
	`updated_at` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer)) NOT NULL,
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
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
	`upvotes` integer,
	`downvotes` integer,
	`featured` integer,
	`featured_order` integer
);
--> statement-breakpoint
CREATE TABLE `company_category_cache` (
	`updated_at` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer)) NOT NULL,
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `mb_artist_metadata_cache` (
	`name` text NOT NULL,
	`slug` text NOT NULL,
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
	`seo_title` text
);
--> statement-breakpoint
CREATE TABLE `mb_metadata_cache` (
	`name` text NOT NULL,
	`slug` text NOT NULL,
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
	`seo_title` text
);
--> statement-breakpoint
CREATE TABLE `mb_release_group_cache` (
	`name` text NOT NULL,
	`slug` text NOT NULL,
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
	`seo_title` text
);
--> statement-breakpoint
CREATE TABLE `post_index_cache` (
	`key` text PRIMARY KEY NOT NULL,
	`data` text
);
--> statement-breakpoint
CREATE TABLE `weight_class_cache` (
	`last_updated` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer)) NOT NULL,
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text,
	`slug` text
);
