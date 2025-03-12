import { useDrizzle } from '../api/db';
import { companyCache, companyCategoryCache } from '../api/db/schema';

export default defineTask({
    meta: {
        name: 'db:seedCompanies',
        description: 'Seed the database with sample companies and categories'
    },
    async run() {
        console.log('Running DB seed task for Companies...');

        // Sample companies data with HTML formatted content in the "content" field
        const companies = [
            {
                name: 'Acme Corp',
                slug: 'acme-corp',
                oneLiner: 'Innovating the future!',
                excerpt: 'Acme Corp leads the way in innovative solutions.',
                content: `<h1>Acme Corp</h1>
                  <p>Leading the way in technology and innovation.</p>`,
                domain: 'acme.com',
                needsWww: 1, // using 1 for true
                serplyLink: 'https://acme.com/serply',
                features: '{"feature1": "value1", "feature2": "value2"}',
                pros: '<ul><li>Fast</li><li>Reliable</li></ul>',
                cons: '<ul><li>Expensive</li></ul>',
                faqs: '{"q1": "What is Acme?", "a1": "Acme is a leading company."}',
                alternatives: '{"alt1": "Beta Corp"}',
                categories: '{"cat1": "Tech", "cat2": "Innovation"}',
                logo: 'https://acme.com/logo.png',
                screenshots: '{"screen1": "https://acme.com/screen1.png"}',
                rating: 4.5,
                upvotes: 100,
                downvotes: 10,
                featured: 1,
                featuredOrder: 1,
                updatedAt: Date.now()
            }
        ];

        // Sample company categories data
        const categories = [
            {
                name: 'Technology',
                slug: 'technology',
                updatedAt: Date.now()
            },
            {
                name: 'Innovation',
                slug: 'innovation',
                updatedAt: Date.now()
            }
        ];

        const db = useDrizzle();

        await db.insert(companyCache).values(companies);
        await db.insert(companyCategoryCache).values(categories);

        return { result: 'success' };
    }
});
