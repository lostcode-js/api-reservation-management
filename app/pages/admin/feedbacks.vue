<template>
  <AdminLayout>
    <Table
      :columns="columns"
      :data="datasource"
      hide-update
      hide-delete
      hide-create
      :sorted="sort"
      @sort-changed="requestSorted"
    >
      <template v-slot:paginate>
        <Pagination
          :data="datasource"
          :items_per_page="itemsPerPage"
          :current_page="currentPage"
          :total_items="totalItems"
          @page-changed="requestPaginated"
        />
      </template>
    </Table>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "@/stores/userStores";
const userStore = useUserStore();
const { token } = userStore;

definePageMeta({
  middleware: ["auth"],
});

const config = useRuntimeConfig();
const api_url = config.public.api_url;
const datasource: any = ref([]);
const currentPage = ref(1);
const itemsPerPage = ref(10);
const totalItems = ref(0);

const sort = ref({
  key: "createdAt",
  order: -1,
});

onMounted(async () => {
  requestPagination();
});

const columns = [
  {
    key: "createdBy",
    label: "Criado por",
    type: "user",
  },
  {
    key: "note",
    label: "Nota de Atendimento",
    type: "status",
    validate: (item: any, label: string) => {
      return {
        approved: item.note >= 7,
        warning: item.note <= 6 && item.note >= 5,
        danger: item.note <= 4,
      };
    },
    align: "center",
    sort: true,
  },
  {
    key: "message",
    label: "Motivo",
  },
  {
    key: "createdAt",
    label: "Criado em",
    type: "date",
    sort: true,
  },
];

const requestSorted = async (values: any = {}) => {
  await requestPagination({
    ...values,
    paginate: {
      currentPage: currentPage.value,
      itemsPerPage: itemsPerPage.value,
    },
  });
};

const requestPaginated = async (values: any = {}) => {
  await requestPagination({
    ...values,
    sort: {
      key: sort.value.key,
      order: sort.value.order,
    },
  });
};

const requestPagination = async (values: any = {}) => {
  const response: any = await $fetch(`${api_url}/feedback/paginate`, {
    method: "GET",
    query: { ...values },
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (response?.feedbacks) {
    datasource.value = response.feedbacks;
    currentPage.value = response.paginate.currentPage;
    itemsPerPage.value = response.paginate.itemsPerPage;
    totalItems.value = response.paginate.totalItems;
    sort.value.key = response?.sort?.key;
    sort.value.order = response?.sort?.order;
  }
};
</script>