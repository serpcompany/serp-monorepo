import { useDrizzle } from '../api/db';
import { mbMetadataCache, mbReleaseGroupCache, mbArtistMetadataCache } from '../api/db/schema';

export default defineTask({
    meta: {
        name: 'db:seedMusic',
        description: 'Seed the database with sample music metadata, release groups, and artist metadata'
    },
    async run() {
        console.log('Running DB seed task for Music...');

        const metadata = [
            {
                name: 'Sample Song',
                slug: 'sample-song',
                artists: '["Sample Artist"]',
                tags: '["pop", "2025"]',
                genres: '["Pop"]',
                releaseGroup: '{"id":1}',
                releaseGroupSlug: 'sample-release-group',
                length: 210,
                artistRels: '[]',
                urlRels: '[]',
                workRels: '[]',
                workUrlRels: '[]',
                recordingRels: '[]',
                recordingReverseRels: '[]',
                seriesRels: '[]',
                areaRels: '[]',
                eventRels: '[]',
                labelRels: '[]',
                placeRels: '[]',
                wikidata: '{}',
                workWikidata: '{}',
                lyrics: '<p>Sample lyrics go here.</p>',
                lyricsAnnotations: '{}',
                lyricsSync: '{}',
                overview: `<h1>Sample Song Overview</h1>
                   <p>This is a sample overview article for the song.</p>`,
                seoDescription: 'Sample SEO description',
                seoTitle: 'Sample SEO Title'
            }
        ];

        const releaseGroups = [
            {
                name: 'Sample Release Group',
                slug: 'sample-release-group',
                type: 'Album',
                secondaryTypes: '["Compilation"]',
                date: '2025-03-11',
                coverArt: 'https://example.com/cover.jpg',
                tags: '["rock", "classic"]',
                genres: '["Rock"]',
                artists: '["Sample Artist"]',
                recordings: '["Recording 1", "Recording 2"]',
                mediums: '["Vinyl", "CD"]',
                artistRels: '[]',
                urlRels: '[]',
                eventRels: '[]',
                releaseGroupRels: '[]',
                releaseGroupReverseRels: '[]',
                seriesRels: '[]',
                wikidata: '{}',
                overview: `<h1>Sample Release Group Overview</h1>
                   <p>An in-depth look at the release group.</p>`,
                seoDescription: 'Release group SEO description',
                seoTitle: 'Release Group SEO Title'
            }
        ];

        const artistMetadata = [
            {
                name: 'Sample Artist',
                slug: 'sample-artist',
                beginDate: '2000-01-01',
                endDate: '',
                artistType: 'Solo',
                gender: 'Female',
                area: 'USA',
                beginArea: 'New York',
                endArea: '',
                tags: '["pop"]',
                genres: '["Pop"]',
                releaseGroups: '["Sample Release Group"]',
                urlRels: '[]',
                artistRels: '[]',
                artistReverseRels: '[]',
                eventRels: '[]',
                labelRels: '[]',
                placeRels: '[]',
                seriesRels: '[]',
                wikidata: '{}',
                overview: `<h1>Sample Artist Overview</h1>
                   <p>Learn more about the artist in this article.</p>`,
                seoDescription: 'Artist SEO description',
                seoTitle: 'Artist SEO Title'
            }
        ];

        const db = useDrizzle();

        await db.insert(mbMetadataCache).values(metadata);
        await db.insert(mbReleaseGroupCache).values(releaseGroups);
        await db.insert(mbArtistMetadataCache).values(artistMetadata);

        return { result: 'success' };
    }
});
