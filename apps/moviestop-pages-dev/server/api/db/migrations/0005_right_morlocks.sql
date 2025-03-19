PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_company_cache` (
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
INSERT INTO `__new_company_cache`("updated_at", "id", "name", "slug", "one_liner", "excerpt", "content", "domain", "needs_www", "serply_link", "features", "pros", "cons", "faqs", "alternatives", "categories", "logo", "screenshots", "rating", "downvotes", "featured", "featured_order", "comments", "upvotes") SELECT "updated_at", "id", "name", "slug", "one_liner", "excerpt", "content", "domain", "needs_www", "serply_link", "features", "pros", "cons", "faqs", "alternatives", "categories", "logo", "screenshots", "rating", "downvotes", "featured", "featured_order", "comments", "upvotes" FROM `company_cache`;--> statement-breakpoint
DROP TABLE `company_cache`;--> statement-breakpoint
ALTER TABLE `__new_company_cache` RENAME TO `company_cache`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_mb_artist_metadata_cache` (
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
INSERT INTO `__new_mb_artist_metadata_cache`("name", "slug", "begin_date", "end_date", "artist_type", "gender", "area", "begin_area", "end_area", "tags", "genres", "release_groups", "url_rels", "artist_rels", "artist_reverse_rels", "event_rels", "label_rels", "place_rels", "series_rels", "wikidata", "overview", "seo_description", "seo_title", "comments", "upvotes") SELECT "name", "slug", "begin_date", "end_date", "artist_type", "gender", "area", "begin_area", "end_area", "tags", "genres", "release_groups", "url_rels", "artist_rels", "artist_reverse_rels", "event_rels", "label_rels", "place_rels", "series_rels", "wikidata", "overview", "seo_description", "seo_title", "comments", "upvotes" FROM `mb_artist_metadata_cache`;--> statement-breakpoint
DROP TABLE `mb_artist_metadata_cache`;--> statement-breakpoint
ALTER TABLE `__new_mb_artist_metadata_cache` RENAME TO `mb_artist_metadata_cache`;--> statement-breakpoint
CREATE TABLE `__new_mb_metadata_cache` (
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
INSERT INTO `__new_mb_metadata_cache`("name", "slug", "artists", "tags", "genres", "release_group", "release_group_slug", "length", "artist_rels", "url_rels", "work_rels", "work_url_rels", "recording_rels", "recording_reverse_rels", "series_rels", "area_rels", "event_rels", "label_rels", "place_rels", "wikidata", "work_wikidata", "lyrics", "lyrics_annotations", "lyrics_sync", "overview", "seo_description", "seo_title", "comments", "upvotes") SELECT "name", "slug", "artists", "tags", "genres", "release_group", "release_group_slug", "length", "artist_rels", "url_rels", "work_rels", "work_url_rels", "recording_rels", "recording_reverse_rels", "series_rels", "area_rels", "event_rels", "label_rels", "place_rels", "wikidata", "work_wikidata", "lyrics", "lyrics_annotations", "lyrics_sync", "overview", "seo_description", "seo_title", "comments", "upvotes" FROM `mb_metadata_cache`;--> statement-breakpoint
DROP TABLE `mb_metadata_cache`;--> statement-breakpoint
ALTER TABLE `__new_mb_metadata_cache` RENAME TO `mb_metadata_cache`;--> statement-breakpoint
CREATE TABLE `__new_mb_release_group_cache` (
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
INSERT INTO `__new_mb_release_group_cache`("name", "slug", "type", "secondary_types", "date", "cover_art", "tags", "genres", "artists", "recordings", "mediums", "artist_rels", "url_rels", "event_rels", "release_group_rels", "release_group_reverse_rels", "series_rels", "wikidata", "overview", "seo_description", "seo_title", "comments", "upvotes") SELECT "name", "slug", "type", "secondary_types", "date", "cover_art", "tags", "genres", "artists", "recordings", "mediums", "artist_rels", "url_rels", "event_rels", "release_group_rels", "release_group_reverse_rels", "series_rels", "wikidata", "overview", "seo_description", "seo_title", "comments", "upvotes" FROM `mb_release_group_cache`;--> statement-breakpoint
DROP TABLE `mb_release_group_cache`;--> statement-breakpoint
ALTER TABLE `__new_mb_release_group_cache` RENAME TO `mb_release_group_cache`;--> statement-breakpoint
ALTER TABLE `boxer_cache` ADD `comments` text;--> statement-breakpoint
ALTER TABLE `boxer_cache` ADD `upvotes` text;--> statement-breakpoint
ALTER TABLE `post_cache` ADD `comments` text;--> statement-breakpoint
ALTER TABLE `post_cache` ADD `upvotes` text;