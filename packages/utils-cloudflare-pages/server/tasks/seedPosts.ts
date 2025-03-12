import { useDrizzle } from '../api/db';
import { postCache, postCategoryCache } from '../api/db/schema';

export default defineTask({
  meta: {
    name: 'db:seedPosts',
    description: 'Seed the database with sample posts and categories'
  },
  async run() {
    console.log('Running DB seed task...');

    // Sample posts data with HTML formatted content
    const posts = [
      {
        title: 'Hello World',
        createdAt: new Date(),
        updatedAt: new Date(),
        slug: 'hello-world',
        excerpt: 'An introductory post for our blog.',
        content: `<h1>Hello World</h1>
                  <p>Welcome to our blog. This is an example of an HTML formatted article post. Enjoy reading!</p>`,
        featuredImage:
          'https://raw.githubusercontent.com/serpcompany/serp-ipsum/refs/heads/main/images/devin-schumacher-grumpy-cat.png',
        author: 'Admin',
        categories: `[
          {
            "name": "General",
            "slug": "general"
          }
        ]`,
        oneLiner: 'A warm welcome to everyone!',
        videoId: '',
        relatedPosts: '',
        module: 'Glossary',
        keyword: 'hello, world, blog'
      },
      {
        title: 'Tech Trends',
        createdAt: new Date(),
        updatedAt: new Date(),
        slug: 'tech-trends',
        excerpt: 'Latest updates in technology.',
        content: `<h1>Tech Trends</h1>
                  <p>Stay updated with the newest innovations and insights in technology. Discover what's trending!</p>`,
        featuredImage:
          'https://raw.githubusercontent.com/serpcompany/serp-ipsum/refs/heads/main/images/devin-schumacher-grumpy-cat.png',
        author: 'Tech Guru',
        categories: `[{
          "name": "Tech",
          "slug": "tech"
        }]`,
        oneLiner: 'Your guide to modern tech trends.',
        videoId: '',
        relatedPosts: '',
        module: 'tech',
        keyword: 'tech, trends, innovation'
      },
      {
        title: 'Music Mania',
        createdAt: new Date(),
        updatedAt: new Date(),
        slug: 'music-mania',
        excerpt: 'Explore the world of music.',
        content: `<h1>Music Mania</h1>
                  <p>Discover the latest hits, classic tunes, and everything in between. Let the music take you on a journey!</p>`,
        featuredImage:
          'https://raw.githubusercontent.com/serpcompany/serp-ipsum/refs/heads/main/images/devin-schumacher-grumpy-cat.png',
        author: 'Melody Maker',
        categories: `[{"name": "General","slug": "general"},{"name": "Tech", "slug": "tech"}]`,
        oneLiner: 'Where words fail, music speaks.',
        videoId: '',
        relatedPosts: '',
        module: 'music',
        keyword: 'music, songs, melody'
      },
      {
        title: 'Movies & More',
        createdAt: new Date(),
        updatedAt: new Date(),
        slug: 'movies-more',
        excerpt: 'Lights, camera, action!',
        content: `<h1>Movies & More</h1>
                  <p>Explore the world of cinema, from blockbusters to indie gems. Lights, camera, action
                  - it's showtime!</p>`,
        featuredImage:
          'https://raw.githubusercontent.com/serpcompany/serp-ipsum/refs/heads/main/images/devin-schumacher-grumpy-cat.png',
        author: 'Cinephile',
        categories: `[{
          "name": "General",
          "slug": "general"
        }]`,
        oneLiner: 'Lights, camera, action!',
        videoId: '',
        relatedPosts: '',
        module: 'movies',
        keyword: 'movies, cinema, films'
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
