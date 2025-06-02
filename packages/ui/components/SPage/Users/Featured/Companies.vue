<script setup lang="ts">
  import type { Category, Company } from '@serp/types/types';

  const { loggedIn, user } = useUserSession();

  const loading = ref(false);

  const toast = useToast();

  const form = reactive({
    category: '',
    company: '',
    placement: '',
  });

  let data = [];
  if (loggedIn.value) {
    data = await useCompanyFeaturedSubscriptions(false);
  }

  let categories = await useCompanyCategories();
  if (!categories) {
    categories = [];
  }
  const categoryOptions = ref(categories?.map((category) => category.name));

  const submitLoading = ref(false);
  const disabled = ref(true);
  const companies = ref([]);
  const companyOptions = ref(companies.value.map((company) => company.slug));
  const availablePlacements = ref([]);
  async function getCompaniesForCategory(category: string) {
    try {
      const categorySlug = categories.find(
        (cat) => cat.name === category,
      )?.slug;

      const companiesData = await useAllCompaniesForCategory(categorySlug);
      if (companiesData && companiesData.entities?.length) {
        companies.value = companiesData.entities;
        companyOptions.value = companiesData.entities.map(
          (company: Company) => company.slug,
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

  function getCompanyId(company: string) {
    const companyData = companies.value.find((c) => c.slug === company);
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
          icon: 'exclamation-circle',
        });
        return;
      }
      if (!form.category || !form.company || !form.placement) {
        toast.add({
          id: 'missing-fields',
          title: 'Missing Fields',
          description: 'Please fill in all fields.',
          icon: 'exclamation-circle',
        });
        return;
      }

      submitLoading.value = true;
      // Check if placement is still open
      const data = await useCheckPlacementAvailability(
        form.placement,
        getCompanyId(form.company),
        form.category === 'all' ? null : getCategorySlug(form.category),
      );
      if (data.reservationId) {
        // If placement is available, proceed with payment
        const successRoute =
          '/users/purchase?success=true&redirectTo=/users/get-featured';
        const cancelRoute =
          '/users/purchase?cancel=true&redirectTo=/users/get-featured';
        const response = await $fetch(
          `/api/stripe/create-checkout-session?type=featured-${form.placement}&id=${getCompanyId(
            form.company,
          )}&secondaryId=${getCategoryId(form.category)}&successRoute=${encodeURIComponent(successRoute)}&cancelRoute=${encodeURIComponent(cancelRoute)}`,
          {
            method: 'GET',
          },
        );

        if (response) {
          window.location.href = response;
        }
      } else {
        toast.add({
          id: 'placement-not-available',
          title: 'Placement Not Available',
          description: 'This placement is no longer available.',
          icon: 'exclamation-circle',
        });
      }
    } catch (error) {
      console.error('Error submitting featured company:', error);
      toast.add({
        id: 'submission-error',
        title: 'Submission Error',
        description: 'An error occurred while submitting the featured company.',
        icon: 'exclamation-circle',
      });
    } finally {
      submitLoading.value = false;
    }
  }

  useSeoMeta({
    title: 'Featured',
  });
</script>

<template>
  <UPage>
    <UMain>
      <UContainer class="mx-auto mt-16 max-w-3xl">
        <div v-if="loggedIn">
          <!-- Featured Companies List -->
          <div v-if="data.length" class="mb-12">
            <h2 class="mb-6 text-2xl font-bold">Your Featured Companies</h2>
            <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <UCard
                v-for="subscription in data"
                :key="subscription.id"
                class="transition-all hover:shadow-lg"
              >
                <template #header>
                  <div class="flex items-center justify-between">
                    <h3 class="text-lg font-semibold">
                      {{ subscription.entityName }}
                    </h3>
                    <UBadge
                      v-if="subscription.isActive"
                      color="success"
                      variant="soft"
                    >
                      Active
                    </UBadge>
                  </div>
                </template>

                <div class="space-y-2">
                  <NuxtLink
                    :to="
                      subscription.categorySlug
                        ? `/products/best/${subscription.categorySlug}/`
                        : `/products`
                    "
                    class="text-gray-600 hover:underline"
                  >
                    Category:
                    {{
                      subscription.categoryName
                        ? subscription.categoryName
                        : 'All'
                    }}
                  </NuxtLink>
                  <p class="text-gray-600">
                    Placement: {{ subscription.placement }}
                  </p>
                  <p class="text-sm text-gray-500">
                    Created: {{ subscription.createdAt }}
                  </p>
                </div>

                <template #footer>
                  <NuxtLink
                    :to="`/products/${subscription.entitySlug}/reviews/`"
                    class="text-primary-600 font-medium hover:underline"
                  >
                    View Company →
                  </NuxtLink>
                </template>
              </UCard>
            </div>
          </div>

          <!-- Feature a Company Form -->
          <UCard>
            <template #header>
              <div class="flex items-center justify-between">
                <h2 class="text-xl font-semibold">Get Featured</h2>
                <UBadge color="info" variant="soft">
                  Promote Your Company
                </UBadge>
              </div>
            </template>

            <div class="space-y-5 py-4">
              <p class="mb-4 text-gray-500 dark:text-gray-400">
                Premium placement on pages that drive leads for your brand.
              </p>

              <UFormField
                label="Category"
                help="Select a category for your featured listing"
                class="w-full"
              >
                <UInputMenu
                  v-model="form.category"
                  :items="categoryOptions"
                  class="w-full"
                  placeholder="Select a category"
                  @change="getCompaniesForCategory(form.category)"
                />
              </UFormField>

              <UFormField label="Company" class="w-full">
                <UInputMenu
                  v-model="form.company"
                  :items="companyOptions"
                  :disabled="disabled"
                  class="w-full"
                  placeholder="Select company"
                />
              </UFormField>

              <UFormField label="Position" class="w-full">
                <UInputMenu
                  v-model="form.placement"
                  :items="availablePlacements"
                  :disabled="disabled"
                  class="w-full"
                  placeholder="Position you want your company featured in"
                />
              </UFormField>
            </div>

            <template #footer>
              <div class="flex justify-end">
                <UButton
                  color="primary"
                  variant="solid"
                  size="xl"
                  :loading="submitLoading"
                  :disabled="
                    disabled ||
                    !form.category ||
                    !form.company ||
                    !form.placement
                  "
                  @click="submitFeaturedCompany"
                >
                  Submit
                </UButton>
              </div>
            </template>
          </UCard>
        </div>

        <!-- Not Logged In View -->
        <div v-else>
          <UCard class="py-8 text-center">
            <h2 class="mb-4 text-xl font-semibold">Get Featured</h2>
            <p class="mb-6 text-gray-500 dark:text-gray-400">
              Login to feature your company on our platform for increased
              visibility.
            </p>
            <UButton to="/login" color="primary">Login to Continue</UButton>
          </UCard>
        </div>
      </UContainer>
    </UMain>
  </UPage>
</template>
