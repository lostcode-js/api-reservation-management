<template>
  <AdminLayout>
    <Table
      :columns="columns"
      :data="datasource"
      @create="handleCreate"
      @update="handleUpdate"
      @delete="handleDelete"
      :loading="loading"
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

    <SidebarForm
      :isOpen="isOpen"
      @closeModal="closeForm"
      :isUpdate="!!currentItem?._id"
      title="barbeiro"
    >
      <form
        class="h-full w-full flex flex-col justify-between"
        @submit="onSubmit"
      >
        <div>
          <div class="w-24 h-24 mx-auto cursor-pointer">
            <input
              type="file"
              @change="uploadPhoto"
              id="fileUpload"
              hidden
              accept=".jpg, .jpeg, .png, .svg"
            />
            <img
              v-if="state.picture"
              class="object-cover w-full h-full rounded-full"
              :src="state.picture"
              loading="lazy"
              @click="openFileInput()"
            />
            <Icon
              v-else
              @click="openFileInput()"
              name="ph:user-bold"
              class="object-cover w-full h-full rounded-full"
            />
          </div>

          <label class="block text-sm">
            <span class="text-gray-700">Nome</span>
            <input
              class="block w-full mt-1 text-sm focus:border-sky-400 focus:outline-none focus:shadow-outline-sky form-input"
              v-bind="form.name"
            />
            <span class="text-red-600 text-sm mt-2">{{ errors.name }}</span>
          </label>

          <label class="block text-sm mt-2">
            <span class="text-gray-700">Email</span>
            <input
              class="block w-full mt-1 text-sm focus:border-sky-400 focus:outline-none focus:shadow-outline-sky form-input"
              v-bind="form.email"
            />
            <span class="text-red-600 text-sm mt-2">{{ errors.email }}</span>
          </label>

          <label class="block text-sm mt-2" v-if="!currentItem">
            <span class="text-gray-700">Password</span>
            <input
              class="block w-full mt-1 text-sm focus:border-sky-400 focus:outline-none focus:shadow-outline-sky form-input"
              v-bind="form.password"
              type="password"
            />
            <span class="text-red-600 text-sm mt-2">{{ errors.password }}</span>
          </label>

          <label class="block text-sm mt-2">
            <span class="text-gray-700">Telefone</span>
            <input
              class="block w-full mt-1 text-sm focus:border-sky-400 focus:outline-none focus:shadow-outline-sky form-input"
              v-bind="form.phone"
            />
            <span class="text-red-600 text-sm mt-2">{{ errors.phone }}</span>
          </label>

          <label class="block text-sm mt-2">
            <span class="text-gray-700">Sobre</span>
            <input
              class="block w-full mt-1 text-sm focus:border-sky-400 focus:outline-none focus:shadow-outline-sky form-input"
              v-bind="form.about"
            />
            <span class="text-red-600 text-sm mt-2">{{ errors.about }}</span>
          </label>

          <label class="block text-sm mt-2">
            <span class="text-gray-700">Empresa</span>
            <select
              class="block w-full mt-1 text-sm focus:border-sky-400 focus:outline-none focus:shadow-outline-sky form-input"
              v-bind="form.employer"
            >
              <option
                v-for="company in companys"
                :key="company"
                :value="company._id"
              >
                {{ company.name }}
              </option>
            </select>
          </label>

          <label class="block text-sm mt-2">
            <span class="text-gray-700">Serviços</span>
            <select
              class="block w-full mt-1 text-sm focus:border-sky-400 focus:outline-none focus:shadow-outline-sky form-input"
              v-model="state.services"
              multiple
            >
              <option
                v-for="service in services"
                :key="service"
                :value="service._id"
              >
                {{ service.description }}
              </option>
            </select>
          </label>

          <label class="block text-sm mt-2">
            <span class="text-gray-700">Endereço</span>
            <input
              class="block w-full mt-1 text-sm focus:border-sky-400 focus:outline-none focus:shadow-outline-sky form-input"
              v-bind="form.address"
            />
            <span class="text-red-600 text-sm mt-2">{{ errors.address }}</span>
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
  </AdminLayout>
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
  key: "email",
  order: 1,
});

const loading = ref(false);
const isOpen = ref(false);
const currentItem = ref(null as unknown as any);

const companys = ref([]);
const services = ref([]);
const state = ref({
  services: [],
  picture: "" as unknown as any,
  attachment: "" as unknown as any,
  loadValue: {},
});

const {
  defineInputBinds,
  defineComponentBinds,
  handleSubmit,
  errors,
  setValues,
  resetForm,
} = useForm({
  validationSchema: {
    name: [required],
    email: [required],
    password: [required],
    phone: [required],
    about: [],
    address: [required],
    employer: [required],
  },
});

const form = ref({
  name: defineInputBinds("name"),
  email: defineInputBinds("email"),
  phone: defineInputBinds("phone"),
  about: defineInputBinds("about"),
  password: defineInputBinds("password"),
  employer: defineInputBinds("employer"),
  address: defineInputBinds("address"),
});

onMounted(async () => {
  try {
    loading.value = true;
    await requestPagination();
    await requestPaginationCompanys();
    await requestPaginationServices();
    loading.value = false;
  } catch (error) {
    loading.value = false;
  }
});

const openFileInput = () => {
  document.getElementById("fileUpload")?.click();
};

const uploadPhoto = ({ target }: any) => {
  state.value.attachment = target.files[0];

  const maxSize = 50 * 1024; // 50 KB
  if (state.value.attachment.size > maxSize) {
    snackbar.add({
      type: "error",
      text: "Tamanho da imagem não pode exceder o limite (60 KB).",
    });
    return;
  }

  if (state.value.attachment) {
    const reader = new FileReader();
    reader.onload = () => {
      state.value.picture = reader.result;
    };
    reader.readAsDataURL(state.value.attachment);
  }
};

const handleCreate = (item: any) => {
  state.value.services = [];
  state.value.picture = "";
  state.value.attachment = "";

  resetForm();
  setValues({});
  currentItem.value = null;
  isOpen.value = true;
};

const handleUpdate = async (item: any) => {
  state.value.services = [];
  state.value.picture = "";
  state.value.attachment = "";

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
    key: "picture",
    label: "Nome",
    type: "picture",
  },
  {
    key: "email",
    label: "Email",
    sort: true,
  },
  {
    key: "phone",
    label: "Telefone",
  },
  {
    key: "address",
    label: "Endereço",
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
  const response: any = await $fetch(`${api_url}/user/paginate`, {
    method: "GET",
    query: { ...values, type: "employee" },
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (response?.users) {
    datasource.value = response.users;
    currentPage.value = response.paginate.currentPage;
    itemsPerPage.value = response.paginate.itemsPerPage;
    totalItems.value = response.paginate.totalItems;
    sort.value.key = response?.sort?.key;
    sort.value.order = response?.sort?.order;
  }
};

const requestPaginationCompanys = async (values: any = {}) => {
  const response: any = await $fetch(`${api_url}/company`, {
    method: "GET",
    query: { ...values },
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (response?.companys) {
    companys.value = response.companys;
  }
};

const requestPaginationServices = async (values: any = {}) => {
  const response: any = await $fetch(`${api_url}/service`, {
    method: "GET",
    query: { ...values },
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (response?.services) {
    services.value = response.services;
  }
};

const create = async (values: any) => {
  try {
    const response: any = await $fetch(`${api_url}/user`, {
      method: "POST",
      body: { ...values, ...state.value, type: "employee" },
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    if (!response?.user) {
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
      `${api_url}/user/${currentItem?.value?._id}`,
      {
        method: "PUT",
        body: { ...state.value.loadValue, ...values, ...state.value },
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
    const response: any = await $fetch(`${api_url}/user/${_id}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    state.value.loadValue = response.user;

    setValues({
      name: response.user.name,
      email: response.user.email,
      phone: response.user.phone,
      about: response.user.about,
      password: response.user.password,
      employer: response.user.employer,
      address: response.user.address,
    });

    state.value.picture = response.user?.picture ?? "";
    state.value.services = response.user?.services ?? [];
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
          const response: any = await $fetch(`${api_url}/user/${_id}`, {
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