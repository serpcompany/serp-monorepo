import { d as e, a as r, c as t } from '../../../../nitro/nitro.mjs';
import { f as a } from '../../../../_/chunk-KRMY7ATX.mjs';
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
  generateRecording = (e) => {
    const r = a.music.songName(),
      t = Math.random() > 0.85 ? 2 : 1;
    return {
      name: r,
      position: e,
      slug: generateSlug(r),
      length: a.number.int({ min: 12e4, max: 3e5 }),
      artists: Array.from({ length: t }, (e, r) =>
        ((e, r) => {
          const t = a.person.fullName();
          return {
            creditName: t,
            joinPhrase: e === r - 1 ? '' : ' & ',
            slug: generateSlug(t)
          };
        })(r, t)
      ),
      hasLyrics: a.datatype.boolean()
    };
  },
  generateArtistRelations = () =>
    Array.from({ length: a.number.int({ min: 0, max: 4 }) }, () => {
      const e = a.person.fullName();
      return {
        type: a.helpers.arrayElement([
          'member of',
          'collaborated with',
          'influenced by',
          'teacher of'
        ]),
        artistName: e,
        artistSlug: generateSlug(e),
        ...(Math.random() > 0.7 && {
          instrument: a.helpers.arrayElement([
            'vocals',
            'guitar',
            'piano',
            'drums'
          ])
        })
      };
    }),
  generateWikidata = (e) => ({
    title: e,
    aliases: Array.from({ length: a.number.int({ min: 0, max: 3 }) }, () =>
      a.helpers.arrayElement([
        `${e} ${a.person.lastName()}`,
        `DJ ${e}`,
        `${e} and the ${a.commerce.productName()}s`
      ])
    ),
    properties: {
      birthName: a.person.fullName(),
      occupation: a.helpers.arrayElement([
        'Singer',
        'Musician',
        'Composer',
        'Producer'
      ]),
      instrument: a.helpers.arrayElement([
        'Guitar',
        'Piano',
        'Vocals',
        'Drums'
      ]),
      genre: a.music.genre()
    },
    description: a.lorem.paragraph(),
    serpWikiUrl: `https://wikipedia.org/wiki/${generateSlug(e)}`,
    wikipediaUrl: `https://wikipedia.org/wiki/${generateSlug(e)}`
  }),
  generateArtist = (e) => {
    const r = a.person.fullName(),
      t = a.number.int({ min: 1950, max: 2010 }),
      n = Math.random() > 0.2,
      m = a.number.int({ min: 3, max: 10 });
    return {
      name: r,
      slug: e,
      seoTitle: `${r} - Artist Information, Discography, and More`,
      seoDescription: a.lorem.sentence(),
      beginDate: `${t}-${a.number.int({ min: 1, max: 12 }).toString().padStart(2, '0')}-${a.number.int({ min: 1, max: 28 }).toString().padStart(2, '0')}`,
      endDate: n
        ? null
        : `${a.number.int({ min: t + 5, max: 2024 })}-${a.number.int({ min: 1, max: 12 }).toString().padStart(2, '0')}-${a.number.int({ min: 1, max: 28 }).toString().padStart(2, '0')}`,
      artistType: a.helpers.arrayElement([
        'Person',
        'Group',
        'Orchestra',
        'Choir'
      ]),
      gender:
        Math.random() > 0.5
          ? a.helpers.arrayElement(['Male', 'Female', 'Other'])
          : null,
      area: a.location.country(),
      beginArea: a.location.city(),
      endArea: n ? null : a.location.city(),
      tags: Array.from({ length: a.number.int({ min: 2, max: 5 }) }, () =>
        a.music.genre()
      ),
      genres: Array.from({ length: a.number.int({ min: 1, max: 3 }) }, () =>
        a.music.genre()
      ),
      releaseGroups: Array.from({ length: m }, () =>
        ((e) => {
          const r = a.music.songName(),
            t = Math.random() > 0.85 ? 2 : 1,
            n = a.number.int({ min: 8, max: 15 });
          return {
            name: r,
            slug: generateSlug(r),
            artists: [
              {
                creditName: e,
                joinPhrase: t > 1 ? ' & ' : '',
                slug: generateSlug(e)
              },
              ...(t > 1
                ? [
                    {
                      creditName: a.person.fullName(),
                      joinPhrase: '',
                      slug: generateSlug(a.person.fullName())
                    }
                  ]
                : [])
            ],
            date: a.date.past().toISOString().split('T')[0],
            type: a.helpers.arrayElement(['Album', 'EP', 'Single']),
            secondaryTypes:
              Math.random() > 0.7
                ? [
                    a.helpers.arrayElement([
                      'Live',
                      'Compilation',
                      'Soundtrack',
                      'Remix'
                    ])
                  ]
                : null,
            coverArt: {
              250: a.image.urlLoremFlickr({
                width: 250,
                height: 250,
                category: 'album'
              }),
              500: a.image.urlLoremFlickr({
                width: 500,
                height: 500,
                category: 'album'
              })
            },
            recordings: Array.from({ length: n }, (e, r) =>
              generateRecording(r + 1)
            )
          };
        })(r)
      ).sort(
        (e, r) =>
          new Date(r.date || '').getTime() - new Date(e.date || '').getTime()
      ),
      urlRels: Array.from({ length: a.number.int({ min: 1, max: 4 }) }, () => ({
        type: a.helpers.arrayElement([
          'official homepage',
          'social media',
          'streaming',
          'fansite'
        ]),
        url: a.internet.url()
      })),
      artistRels: generateArtistRelations(),
      artistReverseRels: generateArtistRelations(),
      eventRels: Array.from(
        { length: a.number.int({ min: 0, max: 3 }) },
        () => {
          const e = `${a.company.name()} Festival ${a.number.int({ min: 2e3, max: 2024 })}`;
          return {
            type: 'performed at',
            eventName: e,
            eventSlug: generateSlug(e)
          };
        }
      ),
      labelRels: Array.from(
        { length: a.number.int({ min: 0, max: 2 }) },
        () => {
          const e = a.company.name();
          return {
            type: a.helpers.arrayElement(['signed to', 'founded']),
            labelName: e,
            labelSlug: generateSlug(e)
          };
        }
      ),
      placeRels: Array.from(
        { length: a.number.int({ min: 0, max: 2 }) },
        () => {
          const e = `${a.company.name()} ${a.helpers.arrayElement(['Arena', 'Hall', 'Theater'])}`;
          return {
            type: 'performed at',
            placeName: e,
            placeSlug: generateSlug(e)
          };
        }
      ),
      seriesRels: Array.from(
        { length: a.number.int({ min: 0, max: 1 }) },
        () => {
          const e = `${a.person.lastName()} ${a.helpers.arrayElement(['Tour', 'Concert Series', 'Festival'])}`;
          return { type: 'series', seriesName: e, seriesSlug: generateSlug(e) };
        }
      ),
      wikidata: Math.random() > 0.2 ? generateWikidata(r) : null,
      overview: a.lorem.paragraphs(3)
    };
  },
  n = new Map(),
  m = e(async (e) => {
    const a = r(e, 'slug');
    if (!a) throw t({ statusCode: 400, message: 'Slug parameter is required' });
    let m = n.get(a);
    return m || ((m = generateArtist(a)), n.set(a, m)), m;
  });
export { m as default };
//# sourceMappingURL=_slug_.mjs.map
