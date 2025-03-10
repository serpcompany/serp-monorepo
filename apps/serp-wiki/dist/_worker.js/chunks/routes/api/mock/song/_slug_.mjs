import { d as e, a as r, c as n } from '../../../../nitro/nitro.mjs';
import { f as t } from '../../../../_/chunk-KRMY7ATX.mjs';
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
    const n = t.person.fullName();
    return {
      creditName: n,
      joinPhrase: e === r - 1 ? '' : ' & ',
      slug: generateSlug(n)
    };
  },
  generateWikidata = () => {
    const e = t.music.songName();
    return {
      title: e,
      aliases: Array.from({ length: t.number.int({ min: 0, max: 3 }) }, () =>
        t.music.songName()
      ),
      properties: {
        genre: t.music.genre(),
        released: t.date.past().getFullYear().toString(),
        language: t.helpers.arrayElement([
          'English',
          'Spanish',
          'French',
          'Japanese'
        ])
      },
      description: t.lorem.paragraph(),
      serpWikiUrl: `https://wikipedia.org/wiki/${generateSlug(e)}`,
      wikipediaUrl: `https://wikipedia.org/wiki/${generateSlug(e)}`
    };
  },
  generateLyrics = () => {
    const e = t.number.int({ min: 2, max: 4 });
    let r = '';
    for (let n = 0; n < e; n++)
      (r += Array.from({ length: 4 }, () => t.lorem.sentence()).join('\n')),
        (r += '\n\n');
    return r
      .trim()
      .split('\n')
      .map((e) => (e.trim() ? `<p>${e}</p>` : '<br>'))
      .join('');
  },
  generateDetailedRecording = (e) => {
    const r = t.music.songName(),
      n = Math.random() > 0.85 ? 2 : 1,
      a =
        Math.random() > 0.3
          ? (() => {
              const e = t.music.songName(),
                r = Math.random() > 0.85 ? 2 : 1;
              return {
                name: e,
                slug: generateSlug(e),
                artists: Array.from({ length: r }, (e, n) =>
                  generateArtistCredit(n, r)
                ),
                date: t.date.past().toISOString().split('T')[0],
                type: t.helpers.arrayElement(['Album', 'EP', 'Single']),
                secondaryTypes:
                  Math.random() > 0.7
                    ? [
                        t.helpers.arrayElement([
                          'Live',
                          'Compilation',
                          'Soundtrack',
                          'Remix'
                        ])
                      ]
                    : null,
                coverArt: {
                  250: t.image.urlLoremFlickr({
                    width: 250,
                    height: 250,
                    category: 'album'
                  }),
                  500: t.image.urlLoremFlickr({
                    width: 500,
                    height: 500,
                    category: 'album'
                  })
                }
              };
            })()
          : null;
    return {
      name: r,
      slug: e,
      seoTitle: `${r} by ${t.person.fullName()} - Song Lyrics and Information`,
      seoDescription: t.lorem.sentence(),
      length: t.number.int({ min: 12e4, max: 3e5 }),
      tags: Array.from({ length: t.number.int({ min: 2, max: 5 }) }, () =>
        t.music.genre()
      ),
      genres: Array.from({ length: t.number.int({ min: 1, max: 3 }) }, () =>
        t.music.genre()
      ),
      releaseGroupSlug: (null == a ? void 0 : a.slug) || null,
      releaseGroup: a,
      artists: Array.from({ length: n }, (e, r) => generateArtistCredit(r, n)),
      artistRels: Array.from(
        { length: t.number.int({ min: 1, max: 4 }) },
        () => {
          const e = t.person.fullName();
          return {
            type: t.helpers.arrayElement([
              'performer',
              'producer',
              'composer',
              'lyricist'
            ]),
            artistName: e,
            artistSlug: generateSlug(e),
            ...(Math.random() > 0.7 && {
              instrument: t.helpers.arrayElement([
                'guitar',
                'piano',
                'drums',
                'bass'
              ])
            })
          };
        }
      ),
      urlRels: Array.from({ length: t.number.int({ min: 1, max: 3 }) }, () => ({
        type: t.helpers.arrayElement(['streaming', 'social media', 'official']),
        url: t.internet.url()
      })),
      workRels: Array.from({ length: t.number.int({ min: 0, max: 2 }) }, () => {
        const e = t.music.songName();
        return {
          type: t.helpers.arrayElement(['composition', 'arrangement']),
          workName: e,
          workSlug: generateSlug(e)
        };
      }),
      workUrlRels: Array.from(
        { length: t.number.int({ min: 0, max: 2 }) },
        () => ({
          type: t.helpers.arrayElement(['score', 'libretto']),
          url: t.internet.url()
        })
      ),
      recordingRels: Array.from(
        { length: t.number.int({ min: 0, max: 2 }) },
        () => {
          const e = t.music.songName();
          return {
            type: t.helpers.arrayElement(['cover', 'remix']),
            recordingName: e,
            recordingSlug: generateSlug(e)
          };
        }
      ),
      recordingReverseRels: Array.from(
        { length: t.number.int({ min: 0, max: 2 }) },
        () => {
          const e = t.music.songName();
          return {
            type: t.helpers.arrayElement(['cover of', 'sample of']),
            recordingName: e,
            recordingSlug: generateSlug(e)
          };
        }
      ),
      seriesRels: Array.from(
        { length: t.number.int({ min: 0, max: 1 }) },
        () => {
          const e = t.company.name();
          return { type: 'series', seriesName: e, seriesSlug: generateSlug(e) };
        }
      ),
      areaRels: Array.from({ length: t.number.int({ min: 0, max: 2 }) }, () => {
        const e = t.location.country();
        return {
          type: t.helpers.arrayElement(['recorded in', 'written in']),
          areaName: e,
          areaSlug: generateSlug(e)
        };
      }),
      eventRels: Array.from(
        { length: t.number.int({ min: 0, max: 2 }) },
        () => {
          const e = `${t.company.name()} Festival ${t.number.int({ min: 2e3, max: 2024 })}`;
          return {
            type: 'performed at',
            eventName: e,
            eventSlug: generateSlug(e)
          };
        }
      ),
      labelRels: Array.from(
        { length: t.number.int({ min: 1, max: 2 }) },
        () => {
          const e = t.company.name();
          return { type: 'label', labelName: e, labelSlug: generateSlug(e) };
        }
      ),
      placeRels: Array.from(
        { length: t.number.int({ min: 0, max: 2 }) },
        () => {
          const e = `${t.company.name()} Studio`;
          return {
            type: 'recorded at',
            placeName: e,
            placeSlug: generateSlug(e)
          };
        }
      ),
      wikidata: Math.random() > 0.3 ? generateWikidata() : null,
      workWikidata: Math.random() > 0.7 ? generateWikidata() : null,
      lyrics: generateLyrics(),
      lyricsAnnotations: Array.from(
        { length: t.number.int({ min: 0, max: 3 }) },
        () => ({
          source: t.company.name(),
          content: t.lorem.paragraph(),
          verified: Math.random() > 0.5,
          votes: t.number.int({ min: 0, max: 100 })
        })
      ),
      lyricsSync:
        Math.random() > 0.7
          ? Array.from(
              { length: t.number.int({ min: 10, max: 20 }) },
              (e, r) => ({
                startTime: 3e3 * r,
                endTime: 3e3 * r + 2800,
                words: t.lorem.words(3),
                sequence: r
              })
            )
          : null,
      overview: t.lorem.paragraphs(3)
    };
  },
  a = new Map(),
  m = e(async (e) => {
    const t = r(e, 'slug');
    if (!t) throw n({ statusCode: 400, message: 'Slug parameter is required' });
    let m = a.get(t);
    return m || ((m = generateDetailedRecording(t)), a.set(t, m)), m;
  });
export { m as default };
//# sourceMappingURL=_slug_.mjs.map
