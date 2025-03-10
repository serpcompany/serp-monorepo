import { useDrizzle } from '../api/db';
import { postCache, postCategoryCache } from '../api/db/schema';

export default defineTask({
  meta: {
    name: 'db:seed',
    description: 'Seed the database with sample posts and categories'
  },
  async run() {
    console.log('Running DB seed task...');

    // Sample posts data with HTML formatted content
    const posts = [
      {
        title: 'Hello World',
        slug: 'hello-world',
        excerpt: 'An introductory post for our blog.',
        content: `<h1>Hello World</h1>
                  <p>Welcome to our blog. This is an example of an HTML formatted article post. Enjoy reading!</p>`,
        featuredImage: 'https://example.com/images/hello-world.png',
        author: 'Admin',
        categories: 'General',
        oneLiner: 'A warm welcome to everyone!',
        videoId: '',
        relatedPosts: '',
        module: 'default',
        keyword: 'hello, world, blog'
      },
      {
        title: 'Tech Trends',
        slug: 'tech-trends',
        excerpt: 'Latest updates in technology.',
        content: `<h1>Tech Trends</h1>
                  <p>Stay updated with the newest innovations and insights in technology. Discover what's trending!</p>`,
        featuredImage: 'https://example.com/images/tech-trends.png',
        author: 'Tech Guru',
        categories: 'Tech',
        oneLiner: 'Your guide to modern tech trends.',
        videoId: '',
        relatedPosts: '',
        module: 'tech',
        keyword: 'tech, trends, innovation'
      }
    ];

    // Sample categories data
    const categories = [
      {
        name: 'General',
        slug: 'general'
      },
      {
        name: 'Tech',
        slug: 'tech'
      }
    ];

    const db = useDrizzle();

    // Insert sample posts into the postCache table
    await db.insert(postCache).values(posts);

    // Insert sample categories into the postCategoryCache table
    await db.insert(postCategoryCache).values(categories);

    return { result: 'success' };
  }
});
