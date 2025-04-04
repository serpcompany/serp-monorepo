<script setup lang="ts">
  import type { Recording } from '@serp/types/types';
  const props = withDefaults(
    defineProps<{
      song: Recording;
    }>(),
    {
      song: {} as Recording
    }
  );

  // Define a computed schema that dynamically generates JSON-LD based on props
  const schemaData = computed(() => ({
    '@context': 'https://schema.org',
    '@type': 'MusicRecording',
    '@id': props.song.slug,
    name: props.song.name,
    byArtist: {
      '@type': 'MusicGroup',
      name: props.song.artists?.[0]?.name
    },
    duration: props.song['length'],
    inAlbum: props.song.releaseGroup?.name
      ? { '@type': 'MusicAlbum', name: props.song.releaseGroup.name }
      : undefined,
    // isrcCode: props.isrcCode,
    about: {
      '@type': 'CreativeWork',
      name: props.song.name
    },
    // copyrightYear: props.copyrightYear,
    // countryOfOrigin: props.countryOfOrigin,
    //genre: props.genre,
    // keywords: props.keywords,
    // publisher: props.publisher
    //   ? { '@type': 'Organization', name: props.publisher }
    //   : undefined,
    // video: props.video
    //   ? { '@type': 'VideoObject', contentUrl: props.video }
    //   : undefined,
    identifier: props.song.slug,
    sameAs: `https://musicbrainz.org/recording/${props.song.id}`
  }));

  // Apply the schema to the component using useSchemaOrg
  useSchemaOrg(schemaData.value);
</script>
