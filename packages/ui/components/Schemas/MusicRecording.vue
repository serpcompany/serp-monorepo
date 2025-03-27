<script setup lang="ts">
  const props = defineProps({
    name: {
      type: String,
      required: true
    },
    byArtist: {
      type: String,
      required: true
    },
    duration: {
      type: String,
      default: ''
    },
    inAlbum: {
      type: String,
      default: ''
    },
    isrcCode: {
      type: String,
      default: ''
    },
    about: {
      type: String,
      default: ''
    },
    copyrightYear: {
      type: Number,
      default: new Date().getFullYear()
    },
    countryOfOrigin: {
      type: String,
      default: ''
    },
    genre: {
      type: String,
      default: ''
    },
    keywords: {
      type: String,
      default: ''
    },
    publisher: {
      type: String,
      default: ''
    },
    video: {
      type: String,
      default: ''
    },
    identifier: {
      type: String,
      default: ''
    },
    sameAs: {
      type: Array as () => string[],
      default: () => []
    }
  });

  // Define a computed schema that dynamically generates JSON-LD based on props
  const schemaData = computed(() => ({
    '@context': 'https://schema.org',
    '@type': 'MusicRecording',
    '@id': props.identifier || '',
    name: props.name,
    byArtist: {
      '@type': 'MusicGroup',
      name: props.byArtist
    },
    duration: props.duration,
    inAlbum: props.inAlbum
      ? { '@type': 'MusicAlbum', name: props.inAlbum }
      : undefined,
    isrcCode: props.isrcCode,
    about: props.about,
    copyrightYear: props.copyrightYear,
    countryOfOrigin: props.countryOfOrigin,
    genre: props.genre,
    keywords: props.keywords,
    publisher: props.publisher
      ? { '@type': 'Organization', name: props.publisher }
      : undefined,
    video: props.video
      ? { '@type': 'VideoObject', contentUrl: props.video }
      : undefined,
    identifier: props.identifier,
    sameAs: props.sameAs
  }));

  // Apply the schema to the component using useSchemaOrg
  useSchemaOrg(schemaData.value);
</script>
