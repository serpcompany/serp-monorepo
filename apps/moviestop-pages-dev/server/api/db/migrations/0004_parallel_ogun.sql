PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_post_cache` (
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
	`keyword` text
);
--> statement-breakpoint
INSERT INTO `__new_post_cache`("slug", "id", "created_at", "updated_at", "title", "excerpt", "content", "featured_image", "author", "categories", "one_liner", "video_id", "related_posts", "module", "keyword") SELECT "slug", "id", "created_at", "updated_at", "title", "excerpt", "content", "featured_image", "author", "categories", "one_liner", "video_id", "related_posts", "module", "keyword" FROM `post_cache`;--> statement-breakpoint
DROP TABLE `post_cache`;--> statement-breakpoint
ALTER TABLE `__new_post_cache` RENAME TO `post_cache`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_post_category_cache` (
	`id` integer,
	`updated_at` integer,
	`name` text NOT NULL,
	`slug` text PRIMARY KEY NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_post_category_cache`("id", "updated_at", "name", "slug") SELECT "id", "updated_at", "name", "slug" FROM `post_category_cache`;--> statement-breakpoint
DROP TABLE `post_category_cache`;--> statement-breakpoint
ALTER TABLE `__new_post_category_cache` RENAME TO `post_category_cache`;