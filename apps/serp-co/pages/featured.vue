<script setup lang="ts">
  import Stripe from '~/components/Stripe.vue';

  const { loggedIn, user } = useUserSession();

  const showFeaturedSubmitModal = ref(false);
  const loading = ref(false);

  const stripeComponent = ref(null);

  const form = reactive({
    category: '',
    company: ''
  });

  let data = [];
  if (loggedIn.value) {
    data = await useCompanyFeaturedSubscriptions();
  }

  const categories = await useCompanyCategories();
  if (!categories) {
    categories = [];
  }
  categories.push({
    id: 0,
    name: 'All',
    slug: 'all'
  });
  const categoryOptions = ref(categories?.map((category) => category.name));

  const companies = ref([]);
  const companyOptions = ref(companies.value.map((company) => company.domain));
  async function getCompaniesForCategory(category: string) {
    try {
      const categorySlug = categories.find(
        (cat) => cat.name === category
      )?.slug;

      const companiesData = await useAllCompaniesForCategory(categorySlug);
      if (companiesData && companiesData.length) {
        companies.value = companiesData;
        companyOptions.value = companiesData.map((company) => company.domain);
      }
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  }

  function showCompanyFeaturedSubmitModal() {
    loading.value = true;
    showFeaturedSubmitModal.value = true;
  }
  function closeCompanyFeaturedSubmitModal() {
    showFeaturedSubmitModal.value = false;
    loading.value = false;
  }

  function getCompanyId(company: string) {
    const companyData = companies.value.find((c) => c.domain === company);
    return companyData ? companyData.id : null;
  }

  function getCategoryId(category: string) {
    const categoryData = categories.find((c) => c.name === category);
    return categoryData ? categoryData.id : null;
  }

  async function submitFeaturedCompany() {
    // TODO: api call to verify position is available to rent before starting subscription
    stripeComponent.value.$.exposed.payWithStripe();
  }

  useSeoMeta({
    title: 'Featured'
  });
</script>

<template>
  <div>
    <div v-if="loggedIn">
      <div v-if="data.length">
        <SHero
          headline="Your featured companies"
          :show-search-bar="false"
          :show-buttons="false"
        />
        <div class="space-y-4">
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div
              v-for="subscription in data"
              :key="subscription.id"
              class="rounded-lg bg-white p-4 shadow-md"
            >
              <div v-if="subscription.isActive">
                <UBadge>Active</UBadge>
              </div>
              <NuxtLink :to="`/products/${subscription.domain}/reviews/`">
                <h2 class="text-lg font-semibold">{{ subscription.domain }}</h2>
                <p class="text-gray-500">
                  Created At: {{ subscription.createdAt }}
                </p>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
      <UButton
        class="mb-4"
        :loading="loading"
        :disabled="loading"
        @click="showCompanyFeaturedSubmitModal"
        >Get Featured</UButton
      >
    </div>
    <div v-else>
      <SHero
        headline="Get Featured"
        :show-search-bar="false"
        :show-buttons="false"
      />
      <div class="flex flex-col items-center justify-center">
        <p>Login to feature a company</p>
      </div>
    </div>

    <UModal
      v-model:open="showFeaturedSubmitModal"
      :loading="loading"
      :title="'Get Featured'"
      :description="'Get featured on the homepage and in search results.'"
      :categories="categories"
      @after:leave="closeCompanyFeaturedSubmitModal"
    >
      <template #content>
        <div class="flex flex-col items-center justify-center">
          <UFormField
            label="Category(s)"
            help="Select a category(s)"
            class="w-full"
          >
            <UInputMenu
              v-model="form.category"
              :items="categoryOptions"
              class="w-full"
              @change="getCompaniesForCategory(form.category)"
            />
          </UFormField>
          <UFormField label="Company" help="Select a company" class="w-full">
            <UInputMenu
              v-model="form.company"
              :items="companyOptions"
              class="w-full"
            />
          </UFormField>
          <Stripe
            :id="getCompanyId(form.company)"
            ref="stripeComponent"
            :secondary-id="getCategoryId(form.category)"
            type="company-featured-1"
            redirect-to="/featured"
          >
            <template #content="{ createPaymentIntent }">
              <UButton
                variant="outline"
                class="mt-2"
                @click="createPaymentIntent"
                >Feature this Company</UButton
              >
            </template>
          </Stripe>
          <UButton variant="outline" class="mt-2" @click="submitFeaturedCompany"
            >Submit</UButton
          >
        </div>
      </template>
    </UModal>
  </div>
</template>
