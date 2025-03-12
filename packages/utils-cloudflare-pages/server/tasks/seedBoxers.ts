import { useDrizzle } from '../api/db';
import { boxerCache, weightClassCache } from '../api/db/schema';

export default defineTask({
    meta: {
        name: 'db:seedBoxers',
        description: 'Seed the database with sample boxers and weight classes'
    },
    async run() {
        console.log('Running DB seed task for Boxers...');

        const boxers = [
            {
                name: 'Mike Tyson',
                slug: 'mike-tyson',
                birthName: 'Michael Gerard Tyson',
                career: 'Boxer',
                debut: '1985',
                status: 'Retired',
                gender: 'Male',
                nationality: 'American',
                residence: 'USA',
                nicknames: '["Iron Mike", "Kid Dynamite"]',
                stance: 'Orthodox',
                birthPlace: 'Brooklyn, NY',
                heightCm: 178.0,
                reachCm: 180.0,
                division: '{"weight": "Heavyweight"}',
                content: `<h1>Mike Tyson</h1>
                  <p>Legendary boxer with an explosive career.</p>`,
                numWins: 50,
                numDraws: 0,
                numLosses: 6,
                bouts: '{"bout1": "win", "bout2": "loss"}',
                lastUpdated: Date.now()
            }
        ];

        const weightClasses = [
            {
                name: 'Heavyweight',
                slug: 'heavyweight',
                lastUpdated: Date.now()
            }
        ];

        const db = useDrizzle();

        await db.insert(boxerCache).values(boxers);
        await db.insert(weightClassCache).values(weightClasses);

        return { result: 'success' };
    }
});
