import {
  companyCache,
  postCache,
  mbArtistMetadataCache,
  mbReleaseGroupCache,
  mbMetadataCache
} from '../api/db/schema';

export function getTableAndPKForModule(module: string) {
  let table;
  let field;
  if (module === 'companies' || module === 'company') {
    table = companyCache;
    field = companyCache.slug;
  } else if (module === 'posts' || module === 'post') {
    table = postCache;
    field = postCache.slug;
  } else if (module === 'artists' || module === 'artist') {
    table = mbArtistMetadataCache;
    field = mbArtistMetadataCache.slug;
  } else if (module === 'albums' || module === 'album') {
    table = mbReleaseGroupCache;
    field = mbReleaseGroupCache.slug;
  } else if (module === 'songs' || module === 'song') {
    table = mbMetadataCache;
    field = mbMetadataCache.slug;
  } else {
    throw new Error('Invalid module');
  }
  return { table, field };
}
