<script setup lang="ts">
  import { h, resolveComponent } from 'vue';
  import type { TableColumn } from '@nuxt/ui';

  const UBadge = resolveComponent('UBadge');

  interface Invoice {
    id: string;
    planName: string;
    amount: number;
    date: string;
    status: 'paid' | 'pending' | 'failed';
    invoiceUrl: string;
  }

  const data = ref<Invoice[]>([
    {
      id: 'INV-2024-001',
      planName: 'Business',
      amount: 99.99,
      date: '2024-03-11T15:30:00',
      status: 'pending',
      invoiceUrl: '/invoices/INV-2024-001.pdf'
    },
    {
      id: 'INV-2024-002',
      planName: 'Hobby',
      amount: 49.99,
      date: '2024-02-11T15:30:00',
      status: 'paid',
      invoiceUrl: '/invoices/INV-2024-002.pdf'
    },
    {
      id: 'INV-2024-003',
      planName: 'Hobby',
      amount: 49.99,
      date: '2024-01-11T15:30:00',
      status: 'paid',
      invoiceUrl: '/invoices/INV-2024-003.pdf'
    },
    {
      id: 'INV-2024-004',
      planName: 'Hobby',
      amount: 49.99,
      date: '2024-03-11T15:30:00',
      status: 'paid',
      invoiceUrl: '/invoices/INV-2024-004.pdf'
    },
    {
      id: 'INV-2024-005',
      planName: 'Hobby',
      amount: 49.99,
      date: '2024-03-10T15:30:00',
      status: 'failed',
      invoiceUrl: '/invoices/INV-2024-005.pdf'
    }
  ]);

  const columns: TableColumn<Invoice>[] = [
    {
      accessorKey: 'id',
      header: 'Invoice',
      cell: ({ row }) => row.getValue('id')
    },
    {
      accessorKey: 'planName',
      header: 'Plan Name'
    },
    {
      accessorKey: 'amount',
      header: () => h('div', { class: 'text-right' }, 'Amount'),
      cell: ({ row }) => {
        const amount = Number.parseFloat(row.getValue('amount'));
        const formatted = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(amount);
        return h('div', { class: 'text-right font-medium' }, formatted);
      }
    },
    {
      accessorKey: 'date',
      header: 'Date',
      cell: ({ row }) => {
        return new Date(row.getValue('date')).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
      }
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status');
        const color = {
          paid: 'success',
          pending: 'warning',
          failed: 'error'
        }[status] as 'success' | 'warning' | 'error';

        return h(
          UBadge,
          { class: 'capitalize', variant: 'subtle', color },
          () => status
        );
      }
    },
    {
      id: 'actions',
      header: '',
      cell: ({ row }) => {
        return h('div', { class: 'flex gap-2' }, [
          h(resolveComponent('UButton'), {
            color: 'neutral',
            variant: 'soft',
            icon: 'i-lucide-eye',
            size: 'sm',
            onClick: () => window.open(row.original.invoiceUrl, '_blank')
          }),
          h(resolveComponent('UButton'), {
            color: 'neutral',
            variant: 'soft',
            icon: 'i-lucide-download',
            size: 'sm',
            onClick: () => window.open(row.original.invoiceUrl, '_blank')
          })
        ]);
      }
    }
  ];
</script>

<template>
  <UTable
    :data="data"
    :columns="columns"
    class="mt-2 flex-1 rounded-lg border border-neutral-200 dark:border-white/10"
  />
</template>
