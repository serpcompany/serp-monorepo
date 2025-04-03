<script setup lang="ts">
  const { loggedIn, user } = useUserSession();

  const showFeaturedSubmitModal = ref(false);
  const loading = ref(false);

  const toast = useToast();

  const form = reactive({
    category: '',
    company: '',
    placement: ''
  });

  let data = [];
  if (loggedIn.value) {
    data = await useCompanyFeaturedSubscriptions(false);
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

  const submitLoading = ref(false);
  const disabled = ref(true);
  const companies = ref([]);
  const companyOptions = ref(companies.value.map((company) => company.domain));
  const availablePlacements = ref([]);
  async function getCompaniesForCategory(category: string) {
    try {
      const categorySlug = categories.find(
        (cat) => cat.name === category
      )?.slug;

      const companiesData = await useAllCompaniesForCategory(categorySlug);
      if (companiesData && companiesData.companies?.length) {
        companies.value = companiesData.companies;
        companyOptions.value = companiesData.companies.map(
          (company) => company.domain
        );
        availablePlacements.value = companiesData.availablePlacements;
        disabled.value = false;
      } else {
        companies.value = [];
        companyOptions.value = [];
        availablePlacements.value = [];
        disabled.value = true;
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

  function getCategorySlug(category: string) {
    const categoryData = categories.find((c) => c.name === category);
    return categoryData ? categoryData.slug : null;
  }

  async function submitFeaturedCompany() {
    try {
      if (!loggedIn.value) {
        toast.add({
          id: 'not-logged-in',
          title: 'Not Logged In',
          description: 'Please log in to feature a company.',
          icon: 'exclamation-circle'
        });
        return;
      }
      if (!form.category || !form.company || !form.placement) {
        toast.add({
          id: 'missing-fields',
          title: 'Missing Fields',
          description: 'Please fill in all fields.',
          icon: 'exclamation-circle'
        });
        return;
      }

      submitLoading.value = true;
      // Check if placement is still open
      const data = await useCheckPlacementAvailability(
        form.placement,
        form.company,
        form.category === 'all'
          ? null
          : getCategorySlug(form.category)
      );
      if (data.available) {
        // If placement is available, proceed with payment
        const response = await $fetch(
          `/api/create-checkout-session?type=company-featured-${form.placement}&id=${getCompanyId(
            form.company
          )}&secondaryId=${getCategoryId(form.category)}`,
          {
            method: 'GET',
          }
        );

        if (response) {
          window.location.href = response;
        }
      } else {
        toast.add({
          id: 'placement-not-available',
          title: 'Placement Not Available',
          description: 'This placement is no longer available.',
          icon: 'exclamation-circle'
        });
      }
    } catch (error) {
      console.error('Error submitting featured company:', error);
      toast.add({
        id: 'submission-error',
        title: 'Submission Error',
        description: 'An error occurred while submitting the featured company.',
        icon: 'exclamation-circle'
      });
    } finally {
      submitLoading.value = false;
    }
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
              class="rounded-lg bg-white p-4 shadow-md dark:bg-neutral-800"
            >
              <div v-if="subscription.isActive">
                <UBadge>Active</UBadge>
              </div>
              <NuxtLink
                :to="`/products/${subscription.companyDomain}/reviews/`"
              >
                <h2 class="text-lg font-semibold">
                  {{ subscription.companyDomain }}
                </h2>
                <NuxtLink
                  :to="
                    subscription.categorySlug
                      ? `/products/best/${subscription.categorySlug}/`
                      : `/products`
                  "
                  ><p class="text-gray-600">
                    Category:
                    {{
                      subscription.categoryName
                        ? subscription.categoryName
                        : 'All'
                    }}
                  </p>
                </NuxtLink>
                <p class="text-gray-600">
                  Placement: {{ subscription.placement }}
                </p>
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
              :disabled="disabled"
              class="w-full"
            />
          </UFormField>
          <UFormField
            label="Placement"
            help="Select a placement"
            class="w-full"
          >
            <UInputMenu
              v-model="form.placement"
              :items="availablePlacements"
              :disabled="disabled"
              class="w-full"
            />
          </UFormField>
          <UButton
            variant="outline"
            class="mt-2"
            :loading="submitLoading"
            @click="submitFeaturedCompany"
          >
            Submit</UButton
          >
        </div>
      </template>
    </UModal>
  </div>
</template>
