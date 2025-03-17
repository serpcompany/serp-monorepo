import { companyCache, postCache, mbArtistMetadataCache, mbReleaseGroupCache, mbMetadataCache } from '@serp/utils/server/api/db/schema';

export function getTableAndPKForModule(module: string) {
  let table;
  let field;
  if (module === 'companies' || module === 'company') {
    table = companyCache;
    field = companyCache.id;
  } else if (module === 'posts' || module === 'post') {
    table = postCache;
    field = postCache.id;
  } else if (module === 'artists' || module === 'artist') {
    table = mbArtistMetadataCache;
    field = mbArtistMetadataCache.id;
  } else if (module === 'albums' || module === 'album') {
    table = mbReleaseGroupCache;
    field = mbReleaseGroupCache.id;
  } else if (module === 'songs' || module === 'song') {
    table = mbMetadataCache;
    field = mbMetadataCache.id;
  } else {
    throw new Error('Invalid module');
  }
  return { table, field };
}