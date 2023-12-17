<template>
  <EmployeeLayout>
    <Table
      :columns="columns"
      :data="datasource"
      @create="handleCreate"
      @update="handleUpdate"
      @delete="handleDelete"
      :loading="loading"
            :sorted="sort"
      @sort-changed="requestPagination"
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

    <SidebarForm
      v-if="isOpen"
      :isOpen="isOpen"
      @closeModal="closeForm"
      :isUpdate="!!currentItem?._id"
      title="Disponibilidade"
    >
      <form
        class="h-full w-full flex flex-col justify-between"
        @submit="onSubmit"
      >
        <div>
          <label class="block text-sm mt-2">
            <span class="text-gray-700">Dia da Semana</span>
            <select
              class="block w-full mt-1 text-sm focus:border-sky-400 focus:outline-none focus:shadow-outline-sky form-input"
              v-bind="form.dayOfWeek"
            >
              <option
                v-for="item in daysOfWeek"
                :key="item"
                :value="item.value"
              >
                {{ item.label }}
              </option>
            </select>
            <span class="text-red-600 text-sm mt-2">{{
              errors.dayOfWeek
            }}</span>
          </label>

          <label class="block text-sm">
            <span class="text-gray-700">Data</span>
            <input
              type="date"
              class="block w-full mt-1 text-sm focus:border-sky-400 focus:outline-none focus:shadow-outline-sky form-input"
              v-bind="form.date"
              :min="getMinDate"
            />
            <span class="text-red-600 text-sm mt-2">{{ errors.date }}</span>
          </label>

          <label class="block text-sm">
            <span class="text-gray-700">Inicia em</span>
            <input
              type="time"
              class="block w-full mt-1 text-sm focus:border-sky-400 focus:outline-none focus:shadow-outline-sky form-input"
              v-bind="form.startTime"
            />
            <span class="text-red-600 text-sm mt-2">{{
              errors.startTime
            }}</span>
          </label>

          <label class="block text-sm">
            <span class="text-gray-700">Termina em</span>
            <input
              type="time"
              class="block w-full mt-1 text-sm focus:border-sky-400 focus:outline-none focus:shadow-outline-sky form-input"
              v-bind="form.endTime"
            />
            <span class="text-red-600 text-sm mt-2">{{ errors.endTime }}</span>
          </label>
        </div>

        <div class="flex justify-center">
          <button
            class="block px-6 py-3 mt-4 text-lg font-medium leading-5 text-center text-white transition-colors duration-150 bg-gray-600 border border-transparent rounded-lg active:bg-gray-600 hover:bg-gray-700 focus:outline-none focus:shadow-outline-gray"
            type="button"
            @click="closeForm"
          >
            <span class="flex items-center"> Voltar </span>
          </button>

          <button
            class="block px-6 py-3 mt-4 text-lg font-medium leading-5 text-center text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue flex items-center ml-auto"
            type="submit"
          >
            <span class="flex items-center">
              <Icon
                name="material-symbols:save"
                class="flex-shrink-0 h-4 w-4 mr-2"
                aria-hidden="true"
              />
              Salvar
            </span>
          </button>
        </div>
      </form>
    </SidebarForm>
  </EmployeeLayout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useForm, useFieldArray } from "vee-validate";
import { useUserStore } from "@/stores/userStores";
import { required, number } from "@/composable/rules";

const userStore = useUserStore();
const plugin = useNuxtApp();
const config = useRuntimeConfig();
const snackbar = useSnackbar();

const $swal: any = plugin.$swal;

const { token } = userStore;

definePageMeta({
  middleware: ["auth"],
});

const api_url = config.public.api_url;
const datasource: any = ref([]);
const currentPage = ref(1);
const itemsPerPage = ref(10);
const totalItems = ref(0);

const sort = ref({
  key: 'date',
  order: 1
});

const loading = ref(false);
const isOpen = ref(false);
const currentItem = ref(null as unknown as any);

const daysOfWeek = ref([
  { label: "Domingo", value: "0" },
  { label: "Segunda-feira", value: "1" },
  { label: "Terça-feira", value: "2" },
  { label: "Quarta-feira", value: "3" },
  { label: "Quinta-feira", value: "4" },
  { label: "Sexta-feira", value: "5" },
  { label: "Sábado", value: "6" },
]);

const state = ref({});

const {
  defineInputBinds,
  defineComponentBinds,
  handleSubmit,
  errors,
  setValues,
  resetForm,
} = useForm({
  validationSchema: {
    date: [],
    dayOfWeek: [],
    startTime: [required],
    endTime: [required],
    type: [required],
  },
});

const form = ref({
  date: defineInputBinds("date"),
  dayOfWeek: defineInputBinds("dayOfWeek"),
  startTime: defineInputBinds("startTime"),
  endTime: defineInputBinds("endTime"),
  type: defineInputBinds("type"),
});

onMounted(async () => {
  try {
    loading.value = true;
    await requestPagination();
    loading.value = false;
  } catch (error) {
    loading.value = false;
  }
});

const handleCreate = (item: any) => {
  resetForm();
  setValues({});
  currentItem.value = null;
  isOpen.value = true;
};

const handleUpdate = async (item: any) => {
  setValues({});
  resetForm();
  currentItem.value = item;
  isOpen.value = true;
  await load(currentItem?.value?._id);
};

const handleDelete = (item: any) => {
  remove(item?._id);
};

const closeForm = () => {
  isOpen.value = false;
};

const doAction = async (values: any) => {
  if (!currentItem.value) {
    create(values);
  } else if (currentItem.value._id) {
    update(values);
  }
};

const onSubmit = handleSubmit(doAction);

const columns = [
  {
    key: "startTime",
    label: "Inicia em",
  },
  {
    key: "endTime",
    label: "Termina em",
  },
  {
    key: "date",
    label: "Data",
    type: "date",
  },
  {
    key: "dayOfWeek",
    label: "Dia da Semana",
    type: "dayOfWeek",
  },
  {
    key: "",
    label: "Status",
    type: "status",
    validate: (item: any, label: string) => {
      return {
        approved: item.type === "available",
        danger: item.type === "unavailable",
      };
    },
    align: "center",
  },
  {
    key: "createdBy",
    label: "Criado por",
    type: "user",
  },
  {
    key: "createdAt",
    label: "Criado em",
    type: "date",
  },
];

const getMinDate = computed(() => {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
});

const requestPagination = async (values: any = {}) => {
  const response: any = await $fetch(`${api_url}/availability/paginate`, {
    method: "GET",
    query: { ...values, employee: userStore.user._id },
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (response?.availabilities) {
    datasource.value = response.availabilities;
    currentPage.value = response.paginate.currentPage;
    itemsPerPage.value = response.paginate.itemsPerPage;
    totalItems.value = response.paginate.totalItems;
        sort.value.key = response?.sort?.key
    sort.value.order = response?.sort?.order
  }
};

const create = async (values: any) => {
  try {
    const response: any = await $fetch(`${api_url}/availability`, {
      method: "POST",
      body: {
        ...values,
        ...state.value,
        employee: userStore.user._id,
        type: "unavailable",
      },
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    if (!response?.availability) {
      snackbar.add({
        type: "error",
        text: response.message,
      });
    }

    snackbar.add({
      type: "success",
      text: response?.message,
    });

    closeForm();

    await requestPagination();
  } catch (error) {
    snackbar.add({
      type: "error",
      text: "Ops! Ocorreu um erro...",
    });
  }
};

const update = async (values: any) => {
  try {
    const response: any = await $fetch(
      `${api_url}/availability/${currentItem?.value?._id}`,
      {
        method: "PUT",
        body: { ...values, ...state.value },
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    snackbar.add({
      type: "success",
      text: response?.message,
    });

    closeForm();

    await requestPagination();
  } catch (error) {
    snackbar.add({
      type: "error",
      text: "Ops! Ocorreu um erro...",
    });
  }
};

const load = async (_id: string) => {
  try {
    const response: any = await $fetch(`${api_url}/availability/${_id}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    setValues({
      ...response.availability,
      date: response.availability?.date
        ? new Date(response.availability?.date).toISOString().split("T")[0]
        : null,
    });
  } catch (error) {
    closeForm();
    snackbar.add({
      type: "error",
      text: "Ops! Ocorreu um erro...",
    });
  }
};

const remove = async (_id: string) => {
  try {
    $swal
      .fire({
        title: "Tem certeza?",
        text: "Você não poderá reverter isso!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sim, remover!",
        cancelButtonText: "Não, cancelar!",
        reverseButtons: true,
        customClass: {
          confirmButton:
            "ml-4 rounded-lg text-white text-bold px-4 py-2 bg-green-500 ",
          cancelButton: "rounded-lg text-white text-bold px-4 py-2 bg-red-500",
        },
        buttonsStyling: false,
      })
      .then(async (result: any) => {
        if (result.isConfirmed) {
          const response: any = await $fetch(`${api_url}/availability/${_id}`, {
            method: "DELETE",
            headers: {
              authorization: `Bearer ${token}`,
            },
          });

          snackbar.add({
            type: "success",
            text: response?.message,
          });

          await requestPagination();
        }
      });
  } catch (error) {
    closeForm();
    snackbar.add({
      type: "error",
      text: "Ops! Ocorreu um erro...",
    });
  }
};
</script>