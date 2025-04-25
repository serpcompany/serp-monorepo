<!-- pages/index.vue -->
<template>
  <div class="container mx-auto p-4">
    <h1 class="mb-8 text-3xl font-bold">Developer Tools</h1>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
      <!-- Using our CompanyCard2 component -->
      <CompanyCard2
        title="Continue"
        url="https://continue.dev"
        badge="Feature"
        badgeColor="success"
        :rating="5"
        class="border-primary-500"
        :reviewCount="42"
        :categories="['JetBrains Plugin', 'VS Code Extension']"
        description="Voluptate ullamco commodo labore aute sint voluptate sint. Culpa aute tempor laboris occaecat laborum velit fugiat dolore. Cillum exercitation cillum sunt nisi eiusmod cupidatat sunt aliquip aute dolor incididunt ex exercitation."
        @upload="handleUpload"
        @bookmark="handleBookmark"
        @read-more="handleReadMore"
      />

      <!-- You can add more cards here -->
      <CompanyCard2
        title="GitLens"
        url="https://gitlens.amod.io"
        badge="Pro"
        badgeColor="warning"
        :rating="4.8"
        :reviewCount="157"
        :categories="['VS Code', 'GitHub', 'AI Assistant', 'Vector Search']"
        description="Dolore aliquip culpa enim pariatur amet quis consectetur minim. Nulla occaecat nisi irure cillum dolore qui. Do proident aliquip non ipsum. Exercitation cupidatat mollit do proident adipisicing nostrud pariatur. Veniam reprehenderit tempor esse mollit ut consequat sit ut et anim et ea. Consequat occaecat ipsum dolor in velit fugiat sint Lorem."
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  // Define handler functions for the events emitted by the card
  const handleUpload = () => {
    console.log('Upload button clicked');
    // Add your upload logic here
  };

  const handleBookmark = () => {
    console.log('Bookmark button clicked');
    // Add your bookmark logic here
  };

  const handleReadMore = () => {
    console.log('Read More button clicked');
    // Add your read more logic here, e.g., navigate to a details page
    // navigateTo('/details/continue')
  };
</script>
