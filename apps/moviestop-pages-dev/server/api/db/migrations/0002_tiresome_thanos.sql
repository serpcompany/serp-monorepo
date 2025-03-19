PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_boxer_cache` (
	`last_updated` integer DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
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
INSERT INTO `__new_boxer_cache`("last_updated", "id", "name", "slug", "birth_name", "career", "debut", "status", "gender", "nationality", "residence", "nicknames", "stance", "birth_place", "height_cm", "reach_cm", "division", "content", "num_wins", "num_draws", "num_losses", "bouts") SELECT "last_updated", "id", "name", "slug", "birth_name", "career", "debut", "status", "gender", "nationality", "residence", "nicknames", "stance", "birth_place", "height_cm", "reach_cm", "division", "content", "num_wins", "num_draws", "num_losses", "bouts" FROM `boxer_cache`;--> statement-breakpoint
DROP TABLE `boxer_cache`;--> statement-breakpoint
ALTER TABLE `__new_boxer_cache` RENAME TO `boxer_cache`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_company_cache` (
	`updated_at` integer DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
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
INSERT INTO `__new_company_cache`("updated_at", "id", "name", "slug", "one_liner", "excerpt", "content", "domain", "needs_www", "serply_link", "features", "pros", "cons", "faqs", "alternatives", "categories", "logo", "screenshots", "rating", "upvotes", "downvotes", "featured", "featured_order") SELECT "updated_at", "id", "name", "slug", "one_liner", "excerpt", "content", "domain", "needs_www", "serply_link", "features", "pros", "cons", "faqs", "alternatives", "categories", "logo", "screenshots", "rating", "upvotes", "downvotes", "featured", "featured_order" FROM `company_cache`;--> statement-breakpoint
DROP TABLE `company_cache`;--> statement-breakpoint
ALTER TABLE `__new_company_cache` RENAME TO `company_cache`;--> statement-breakpoint
CREATE TABLE `__new_company_category_cache` (
	`updated_at` integer DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_company_category_cache`("updated_at", "id", "name", "slug") SELECT "updated_at", "id", "name", "slug" FROM `company_category_cache`;--> statement-breakpoint
DROP TABLE `company_category_cache`;--> statement-breakpoint
ALTER TABLE `__new_company_category_cache` RENAME TO `company_category_cache`;--> statement-breakpoint
CREATE TABLE `__new_post_cache` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` integer DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`title` text NOT NULL,
	`slug` text NOT NULL,
	`excerpt` text,
	`content` text NOT NULL,
	`featured_image` text,
	`author` text,
	`categories` text,
	`one_liner` text,
	`video_id` text,
	`related_posts` text,
	`module` text,
	`keyword` text
);
--> statement-breakpoint
INSERT INTO `__new_post_cache`("id", "created_at", "updated_at", "title", "slug", "excerpt", "content", "featured_image", "author", "categories", "one_liner", "video_id", "related_posts", "module", "keyword") SELECT "id", "created_at", "updated_at", "title", "slug", "excerpt", "content", "featured_image", "author", "categories", "one_liner", "video_id", "related_posts", "module", "keyword" FROM `post_cache`;--> statement-breakpoint
DROP TABLE `post_cache`;--> statement-breakpoint
ALTER TABLE `__new_post_cache` RENAME TO `post_cache`;--> statement-breakpoint
CREATE TABLE `__new_post_category_cache` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`updated_at` integer DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_post_category_cache`("id", "updated_at", "name", "slug") SELECT "id", "updated_at", "name", "slug" FROM `post_category_cache`;--> statement-breakpoint
DROP TABLE `post_category_cache`;--> statement-breakpoint
ALTER TABLE `__new_post_category_cache` RENAME TO `post_category_cache`;--> statement-breakpoint
CREATE TABLE `__new_weight_class_cache` (
	`last_updated` integer DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text,
	`slug` text
);
--> statement-breakpoint
INSERT INTO `__new_weight_class_cache`("last_updated", "id", "name", "slug") SELECT "last_updated", "id", "name", "slug" FROM `weight_class_cache`;--> statement-breakpoint
DROP TABLE `weight_class_cache`;--> statement-breakpoint
ALTER TABLE `__new_weight_class_cache` RENAME TO `weight_class_cache`;