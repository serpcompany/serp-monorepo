<script setup lang="ts">
  import type { PostIndex } from '@serp/types/types';

  const letterRegex = /^[a-zA-Z]/;
  const noLetterCharacter = '&';

  const { data: posts } = await useAsyncData(
    'glossary',
    () => usePosts(1, 1000000, '', 'Glossary'),
    {
      transform: (input) => input.posts,
      default: () => [],
      lazy: true
    }
  );

  const characters = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  ).concat(noLetterCharacter);

  const termsByFirstCharacter = (character: string) => {
    if (character === noLetterCharacter) {
      return posts.value.filter(
        (term: PostIndex) =>
          !letterRegex.test(term.keyword || term.title || term.name)
      );
    }

    return posts.value.filter((term: PostIndex) => {
      const keyword = term.keyword && term.keyword.toLowerCase();
      const title = term.title && term.title.toLowerCase();
      const name = term.name.toLowerCase();

      return (keyword || title || name).startsWith(character.toLowerCase());
    });
  };

  const filteredCharacters = computed(() => {
    return characters.filter((character) =>
      Boolean(termsByFirstCharacter(character).length)
    );
  });

  useSeoMeta({
    title: 'Glossary'
  });
</script>

<template>
  <div>
    <UPageHero title="Glossary" />
    <CharacterNavigation
      class="sticky top-8 z-20 rounded-md border border-(--ui-border) bg-white p-2"
      :characters="characters"
      :filtered-characters="filteredCharacters"
    />
    <main>
      <GlossarySection
        v-for="character in filteredCharacters"
        :id="character"
        :key="character"
        :title="character"
        :items="termsByFirstCharacter(character)"
      />
    </main>
    <NewsletterSignupPageSection />
  </div>
</template>
