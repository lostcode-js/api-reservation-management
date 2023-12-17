<template>
  <AdminLayout>
    <Table
      :columns="columns"
      :data="datasource"
      hide-update
      hide-delete
      hide-create
      :sorted="sort"
      @sort-changed="requestPaginationSorted"
    >
      <template v-slot:paginate>
        <Pagination
          :data="datasource"
          :items_per_page="itemsPerPage"
          :current_page="currentPage"
          :total_items="totalItems"
          @page-changed="requestPagination"
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
  key: "date",
  order: 1,
});

onMounted(async () => {
  await requestPagination();
  await readAll();
});

const columns = [
  {
    key: "message",
    label: "Mensagem",
  },
  {
    key: "createdAt",
    label: "Criado em",
    type: "date",
  },
];

const readAll = async () => {
  try {
    await $fetch(`${api_url}/user`, {
      method: "POST",
      body: {},
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const requestPaginationSorted = async (values: any = {}) => {
  await requestPagination({
    ...values,
    paginate: {
      currentPage,
      itemsPerPage,
    },
  });
};

const requestPagination = async (values: any = {}) => {
  const response: any = await $fetch(`${api_url}/notification/paginate`, {
    method: "GET",
    query: { ...values, user: userStore.user._id },
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (response?.notifications) {
    datasource.value = response.notifications;
    currentPage.value = response.paginate.currentPage;
    itemsPerPage.value = response.paginate.itemsPerPage;
    totalItems.value = response.paginate.totalItems;
    sort.value.key = response?.sort?.key;
    sort.value.order = response?.sort?.order;
  }
};
</script>