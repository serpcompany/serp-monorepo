<script setup lang="ts">
  import { v4 as uuidv4 } from 'uuid';

  const { loggedIn, user } = useUserSession();
  if (!loggedIn.value) {
    navigateTo('/');
  }

  const activeTab = ref('general');
  const tabs = ref([{ label: 'General', value: 'general' }]);

  const company = ref({
    id: null,
    name: '',
    domain: '',
    pricing: '',
    tags: '',
    oneLiner: '',
    description: '',
    categories: [],
    logo: ''
  });

  let uuid = uuidv4();
  const isPriority = ref(false);

  const categories = await useCompanyCategories();
  const categoryOptions = ref(categories?.map((category) => category.name));
  const pricingOptions = ref(['Free', 'Paid', 'Subscription']);

  const route = useRoute();
  const id = route.query.id;
  const existingForm = ref(false);
  if (id) {
    const submissionData = await useCompanySubmissions(id);
    if (submissionData) {
      if (submissionData.approved) {
        navigateTo(`/products/${submissionData.domain}/reviews/`);
      }
      company.value.id = submissionData.id;
      company.value.name = submissionData.name;
      company.value.domain = submissionData.domain;
      company.value.pricing = submissionData.pricing;
      company.value.tags = submissionData.tags;
      company.value.oneLiner = submissionData.oneLiner;
      company.value.description = submissionData.description;
      company.value.categories = submissionData.categories
        ? submissionData.categories.map(
            (category) => categories.find((c) => c.id === category)?.name
          )
        : [];
      company.value.logo = submissionData.logo;
      uuid = submissionData.uuid;
      isPriority.value = submissionData.isPriority;
      existingForm.value = true;
    }
  }

  const stripeComponent = ref(null);

  const toast = useToast();
  const loading = ref(false);

  const allFields = [
    { key: 'name', label: 'Name' },
    { key: 'domain', label: 'Domain' },
    { key: 'categories', label: 'Category(s)' },
    { key: 'pricing', label: 'Pricing' },
    { key: 'tags', label: 'Tags' },
    { key: 'oneLiner', label: 'One-Liner' },
    { key: 'description', label: 'RichDescription' },
    { key: 'logo', label: 'Logo' }
  ];

  const requiredFields = [
    { key: 'name', label: 'Name' },
    { key: 'domain', label: 'Domain' },
    { key: 'pricing', label: 'Pricing' },
    { key: 'oneLiner', label: 'One-Liner' },
    { key: 'description', label: 'RichDescription' }
  ];

  function checkIfValidValue(value) {
    if (typeof value === 'string') return value.trim() !== '';
    if (Array.isArray(value)) return value.length > 0;
    return false;
  }

  const isComplete = computed(() =>
    requiredFields.every(
      (field) =>
        company.value[field.key] && checkIfValidValue(company.value[field.key])
    )
  );

  const getCategories = computed(() => {
    return company.value.categories.map((category: string) => {
      // find matching category by name
      const category_ = categories.find((c) => c.name === category);
      return {
        id: category_.id,
        name: category_.name,
        slug: category_.slug
      };
    });
  });

  const getCategoryIds = computed(() =>
    getCategories.value.map((category) => category.id)
  );

  const s3 = useS3Object();
  const runtimeConfig = useRuntimeConfig();

  // Handle the image file selection and upload
  async function onImageSelected(e: Event) {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.add({
        id: 'upload-error',
        title: 'Invalid File',
        description: 'Please select an image file.',
        icon: 'exclamation-circle'
      });
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result as string;
      img.onload = () => {
        // Calculate new dimensions based on the longest side being 512px
        let width = img.width;
        let height = img.height;
        if (width > height) {
          if (width > 512) {
            height = Math.round(height * (512 / width));
            width = 512;
          }
        } else {
          if (height > 512) {
            width = Math.round(width * (512 / height));
            height = 512;
          }
        }

        // Create an offscreen canvas to resize and convert the image
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          toast.add({
            id: 'upload-error',
            title: 'Processing Error',
            description: 'Failed to get canvas context.',
            icon: 'exclamation-circle'
          });
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);

        // Convert canvas to a WebP blob
        canvas.toBlob(
          async (blob) => {
            if (!blob) {
              toast.add({
                id: 'upload-error',
                title: 'Conversion Error',
                description: 'Could not convert image.',
                icon: 'exclamation-circle'
              });
              return;
            }
            // Create a new File from the blob with a .webp extension
            const processedFile = new File(
              [blob],
              file.name.replace(/\.[^.]+$/, '.webp'),
              { type: 'image/webp' }
            );
            try {
              const uploaded = await s3.upload(processedFile, {
                prefix: 'images',
                meta: { purpose: 'company-logo' }
              });
              company.value.logo = `${runtimeConfig.public.cloudflareR2PublicUrl}${uploaded.replace(
                '/api/s3/query',
                ''
              )}`;
              toast.add({
                id: 'upload-success',
                title: 'Logo Uploaded',
                description:
                  'Your company logo has been uploaded successfully!',
                icon: 'check-circle'
              });
            } catch (err) {
              toast.add({
                id: 'upload-error',
                title: 'Upload Failed',
                description: err.message || 'Failed to upload logo.',
                icon: 'exclamation-circle'
              });
            }
          },
          'image/webp',
          1.0 // Image quality
        );
      };
      img.onerror = () => {
        toast.add({
          id: 'upload-error',
          title: 'Image Load Error',
          description: 'Could not load the image for processing.',
          icon: 'exclamation-circle'
        });
      };
    };
    reader.onerror = () => {
      toast.add({
        id: 'upload-error',
        title: 'File Read Error',
        description: 'Could not read the selected file.',
        icon: 'exclamation-circle'
      });
    };
  }

  async function saveCompany() {
    try {
      loading.value = true;
      if (!isComplete.value) {
        throw new Error('Please fill in all required fields');
      }
      if (!user?.value?.email) {
        throw new Error('Please login to save your company');
      }

      const payload = {
        ...company.value,
        categories: getCategoryIds.value,
        uuid: uuid
      };

      const { data: response, error } = await useFetch('/api/company/submit', {
        method: 'POST',
        headers: useRequestHeaders(['cookie']),
        body: JSON.stringify(payload)
      });

      if (error.value) {
        throw new Error(`Failed to save company - ${error.value.message}`);
      }

      if (response.value.message && response.value.message === 'success') {
        toast.add({
          id: 'company-saved',
          title: 'Company saved',
          description: 'Your company has been saved successfully',
          icon: 'check-circle'
        });
      } else {
        throw new Error(`Failed to save company - ${response.value.message}`);
      }
    } catch (error) {
      toast.add({
        id: 'company-save-error',
        title: 'Error saving company',
        description: error.message,
        icon: 'exclamation-circle'
      });
    } finally {
      loading.value = false;
    }
  }

  async function priorityQueueCheckout() {
    try {
      loading.value = true;
      const response = await $fetch(
        `/api/stripe/create-checkout-session?type=company-priority-queue&id=${uuid}`,
        {
          method: 'GET'
        }
      );

      if (response) {
        window.location.href = response;
      }
    } catch (error) {
      toast.add({
        id: 'checkout-error',
        title: 'Checkout Error',
        description: error.message,
        icon: 'exclamation-circle'
      });
    } finally {
      loading.value = false;
    }
  }
</script>

<template>
  <div class="p-4">
    <div class="grid grid-cols-3 gap-4">
      <!-- Left side column -->
      <div class="col-span-1 space-y-4">
        <!-- Waiting Line Card -->
        <UCard>
          <div v-if="!isPriority && existingForm">
            <p class="text-sm text-neutral-500">
              The current waiting time is > 30 days.
            </p>
            <p class="text-sm text-neutral-500">
              Join the <b><i>priority queue</i></b> to get your company listed
              within 24 hours.
            </p>
            <UButton
              variant="outline"
              class="mt-2"
              @click="priorityQueueCheckout"
              >Join the priority queue</UButton
            >
          </div>
          <div v-else-if="isPriority">
            <UBadge>Priority</UBadge>
            <p class="text-sm text-neutral-500">
              You are in the priority queue. Your company will be listed within
              24 hours.
            </p>
          </div>
        </UCard>

        <!-- Completion Status Card -->
        <UCard>
          <div class="p-3">
            <h3 class="text-lg font-medium">
              {{ isComplete ? '✅ Complete' : '❌ Incomplete' }}
            </h3>
            <p class="mb-2 text-xs text-neutral-600">
              Complete your company before launching it
            </p>
            <div class="grid grid-cols-2 gap-1">
              <div
                v-for="field in allFields"
                :key="field.key"
                class="flex items-center text-xs"
              >
                <span class="mr-1">{{
                  company[field.key] && checkIfValidValue(company[field.key])
                    ? '✅'
                    : '❌'
                }}</span>
                <span>{{ field.label }}</span>
              </div>
            </div>
          </div>
        </UCard>

        <!-- Company Card Preview -->
        <UCard>
          <div class="p-3">
            <CompanyCard
              :company="{
                id: 0,
                name: company.name,
                slug: company.domain,
                oneLiner: company.oneLiner,
                categories: getCategories,
                serplyLink: `https://${company.domain}?ref=serp.co&ref_type=adv`,
                logo: company.logo
              }"
            />
          </div>
        </UCard>

        <!-- Action Buttons -->
        <div class="flex space-x-2">
          <UButton
            type="primary"
            :loading="loading"
            :disabled="!isComplete"
            @click="saveCompany"
            >Save Company</UButton
          >
        </div>
      </div>

      <!-- Right side column (Tabbed Card) -->
      <div class="col-span-2">
        <UCard>
          <UTabs
            v-model="activeTab"
            :items="tabs"
            :content="false"
            class="mb-3"
          />
          <TransitionGroup name="fade" tag="div">
            <div v-if="activeTab === 'general'">
              <form @submit.prevent="saveCompany">
                <div class="grid grid-cols-2 gap-2">
                  <UFormField
                    label="Name"
                    help="Enter your company name"
                    required
                    class="w-full"
                  >
                    <UInput
                      v-model="company.name"
                      placeholder="Enter your company name"
                      class="w-full"
                    />
                  </UFormField>
                  <UFormField
                    label="Domain"
                    help="Only put the domain, we assume all submitted companies are available at the HTTPS protocol"
                    required
                    class="w-full"
                  >
                    <UInput
                      v-model="company.domain"
                      placeholder="serp.co"
                      class="w-full"
                    />
                  </UFormField>
                  <UFormField
                    label="Pricing"
                    help="Select pricing type"
                    required
                    class="w-full"
                  >
                    <UInputMenu
                      v-model="company.pricing"
                      :items="pricingOptions"
                      class="w-full"
                    />
                  </UFormField>
                  <UFormField
                    label="Category(s)"
                    help="Select a category(s)"
                    class="w-full"
                  >
                    <UInputMenu
                      v-model="company.categories"
                      multiple
                      :items="categoryOptions"
                      class="w-full"
                    />
                  </UFormField>
                  <UFormField
                    label="Tags"
                    help="e.g. AI, SEO, Marketing"
                    class="w-full"
                  >
                    <UInput
                      v-model="company.tags"
                      placeholder="e.g. AI, SEO, Marketing"
                      class="w-full"
                    />
                  </UFormField>

                  <div class="col-span-2">
                    <UFormField
                      label="Company Logo"
                      help="Upload your company logo (image file)"
                      class="w-full"
                    >
                      <input
                        type="file"
                        accept="image/*"
                        @change="onImageSelected"
                      >
                    </UFormField>
                  </div>

                  <!-- Full-width fields -->
                  <div class="col-span-2">
                    <UFormField
                      label="One-Liner"
                      help="A short company tagline (one-liner)"
                      required
                      class="w-full"
                    >
                      <UInput
                        v-model="company.oneLiner"
                        placeholder="A short company tagline"
                        class="w-full"
                        maxlength="100"
                      />
                    </UFormField>
                  </div>
                  <div class="col-span-2">
                    <UFormField
                      label="Rich Description"
                      help="Detailed overview of your company"
                      required
                      class="w-full"
                    >
                      <UTextarea
                        v-model="company.description"
                        rows="5"
                        placeholder="Give a detailed overview of your company..."
                        class="w-full"
                      />
                    </UFormField>
                  </div>
                </div>
              </form>
            </div>
          </TransitionGroup>
        </UCard>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }

  .fade-enter-to,
  .fade-leave-from {
    opacity: 1;
  }
</style>
