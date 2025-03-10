import { d as e, a as r, c as t } from '../../../../nitro/nitro.mjs';
import { f as n } from '../../../../_/chunk-KRMY7ATX.mjs';
import 'node:buffer';
import 'node:process';
import 'node:events';
import 'node:net';
import 'node:timers';
import 'node:assert';
import 'node:util';
import 'node:url';
import 'node:stream';
import 'node:crypto';
import 'node:dns';
import 'node:string_decoder';
const generateSlug = (e) =>
    e
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, ''),
  generateArtistCredit = (e, r) => {
    const t = n.person.fullName();
    return {
      creditName: t,
      joinPhrase: e === r - 1 ? '' : ' & ',
      slug: generateSlug(t)
    };
  },
  generateReleaseGroupRelations = () =>
    Array.from({ length: n.number.int({ min: 0, max: 2 }) }, () => {
      const e = n.music.songName();
      return {
        type: n.helpers.arrayElement([
          'compilation of',
          'remixed as',
          'remastered as'
        ]),
        releaseGroupName: e,
        releaseGroupSlug: generateSlug(e)
      };
    }),
  generateWikidata = () => {
    const e = n.music.songName();
    return {
      title: e,
      aliases: Array.from({ length: n.number.int({ min: 0, max: 3 }) }, () =>
        n.music.songName()
      ),
      properties: {
        genre: n.music.genre(),
        released: n.date.past().getFullYear().toString(),
        recordLabel: n.company.name(),
        language: n.helpers.arrayElement([
          'English',
          'Spanish',
          'French',
          'Japanese'
        ])
      },
      description: n.lorem.paragraph(),
      serpWikiUrl: `https://wikipedia.org/wiki/${generateSlug(e)}`,
      wikipediaUrl: `https://wikipedia.org/wiki/${generateSlug(e)}`
    };
  },
  generateRecordings = () =>
    Array.from({ length: n.number.int({ min: 8, max: 15 }) }, (e, r) =>
      ((e) => {
        const r = n.music.songName(),
          t = Math.random() > 0.85 ? 2 : 1;
        return {
          name: r,
          position: e,
          slug: generateSlug(r),
          length: n.number.int({ min: 12e4, max: 3e5 }),
          artists: Array.from({ length: t }, (e, r) =>
            generateArtistCredit(r, t)
          ),
          hasLyrics: n.datatype.boolean()
        };
      })(r + 1)
    ),
  a = new Map(),
  m = e(async (e) => {
    const m = r(e, 'slug');
    if (!m) throw t({ statusCode: 400, message: 'Slug parameter is required' });
    let s = a.get(m);
    return (
      s ||
        ((s = ((e) => {
          const r = n.music.songName(),
            t = Math.random() > 0.85 ? 2 : 1;
          return {
            name: r,
            slug: e,
            seoTitle: `${r} by ${n.person.fullName()}`,
            seoDescription: n.lorem.sentence(),
            type: n.helpers.arrayElement(['Album', 'EP', 'Single']),
            secondaryTypes:
              Math.random() > 0.7
                ? [
                    n.helpers.arrayElement([
                      'Live',
                      'Compilation',
                      'Soundtrack',
                      'Remix'
                    ])
                  ]
                : null,
            date: n.date.past().toISOString().split('T')[0],
            coverArt: {
              250: n.image.urlLoremFlickr({
                width: 250,
                height: 250,
                category: 'album'
              }),
              500: n.image.urlLoremFlickr({
                width: 500,
                height: 500,
                category: 'album'
              })
            },
            tags: Array.from({ length: n.number.int({ min: 2, max: 5 }) }, () =>
              n.music.genre()
            ),
            genres: Array.from(
              { length: n.number.int({ min: 1, max: 3 }) },
              () => n.music.genre()
            ),
            artists: Array.from({ length: t }, (e, r) =>
              generateArtistCredit(r, t)
            ),
            recordings: generateRecordings(),
            artistRels: Array.from(
              { length: n.number.int({ min: 1, max: 4 }) },
              () => {
                const e = n.person.fullName();
                return {
                  type: n.helpers.arrayElement([
                    'performer',
                    'producer',
                    'composer',
                    'conductor'
                  ]),
                  artistName: e,
                  artistSlug: generateSlug(e),
                  ...(Math.random() > 0.7 && {
                    instrument: n.helpers.arrayElement([
                      'orchestra',
                      'ensemble',
                      'band'
                    ])
                  })
                };
              }
            ),
            urlRels: Array.from(
              { length: n.number.int({ min: 1, max: 3 }) },
              () => ({
                type: n.helpers.arrayElement([
                  'streaming',
                  'purchase',
                  'official'
                ]),
                url: n.internet.url()
              })
            ),
            eventRels: Array.from(
              { length: n.number.int({ min: 0, max: 2 }) },
              () => {
                const e = `${n.company.name()} Festival ${n.number.int({ min: 2e3, max: 2024 })}`;
                return {
                  type: 'recorded at',
                  eventName: e,
                  eventSlug: generateSlug(e)
                };
              }
            ),
            releaseGroupRels: generateReleaseGroupRelations(),
            releaseGroupReverseRels: generateReleaseGroupRelations(),
            seriesRels: Array.from(
              { length: n.number.int({ min: 0, max: 1 }) },
              () => {
                const e = `${n.company.name()} Collection`;
                return {
                  type: 'series',
                  seriesName: e,
                  seriesSlug: generateSlug(e)
                };
              }
            ),
            wikidata: Math.random() > 0.3 ? generateWikidata() : null,
            overview: n.lorem.paragraphs(3)
          };
        })(m)),
        a.set(m, s)),
      s
    );
  });
export { m as default };
//# sourceMappingURL=_slug_.mjs.map
