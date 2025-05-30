<script lang="ts" setup>
  const links = [
    {
      label: 'Back to Dashboard',
      icon: 'i-lucide-chevron-left',
      to: '/dashboard'
    },
    {
      label: 'Users',
      icon: 'i-lucide-users',
      to: '/dashboard/super-admin'
    },
    {
      label: 'Teams',
      icon: 'i-lucide-users',
      to: '/dashboard/super-admin/teams'
    },
    {
      label: 'Stripe Plans',
      icon: 'i-lucide-credit-card',
      to: '/dashboard/super-admin/stripe-plans'
    },
    {
      label: 'Feedback Submissions',
      icon: 'i-lucide-message-circle',
      to: '/dashboard/super-admin/feedback-submissions'
    },
    {
      label: 'Newsletter Subscribers',
      icon: 'i-lucide-mail',
      to: '/dashboard/super-admin/newsletter-subscribers'
    }
  ];
</script>

<template>
  <div>
    <header class="px-2">
      <p class="font-bold">Super Admin</p>
    </header>
    <AppSidebarContent class="mt-2">
      <AppSidebarGroup>
        <AppSidebarLink v-for="link in links" :key="link.to" v-bind="link" />
      </AppSidebarGroup>
    </AppSidebarContent>
  </div>
</template>
