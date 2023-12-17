<template>
  <div class="flex items-center min-h-screen p-6 bg-gray-50">
    <div
      class="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl"
    >
      <div class="flex flex-col overflow-y-auto md:flex-row">
        <div class="h-32 md:h-auto md:w-1/2">
          <img
            aria-hidden="true"
            class="object-cover w-full h-full"
            src="../public/assets/login-office01.jpg"
            alt="Office"
          />
        </div>
        <div class="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
          <form @submit="onSubmit">
            <div class="w-full">
              <h1 class="mb-4 text-xl font-semibold text-gray-700">Login</h1>
              <label class="block text-sm">
                <span class="text-gray-700">E-mail</span>
                <input
                  v-bind="form.email"
                  class="block w-full mt-1 text-sm focus:border-sky-400 focus:outline-none focus:shadow-outline-black form-input"
                  placeholder="example@dripbarber.com"
                />
                <span class="text-red-600 text-sm mt-2">{{
                  errors.email
                }}</span>
              </label>
              <label class="block mt-4 text-sm">
                <span class="text-gray-700">Senha</span>
                <input
                  v-bind="form.password"
                  class="block w-full mt-1 text-sm focus:border-sky-400 focus:outline-none focus:shadow-outline-black form-input"
                  placeholder="***************"
                  type="password"
                />
                <span class="text-red-600 text-sm mt-2">{{
                  errors.password
                }}</span>
              </label>

              <button
                class="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-sky-600 border border-transparent rounded-lg active:bg-sky-600 hover:bg-sky-700 focus:outline-none focus:shadow-outline-sky"
                type="submit"
              >
                Login
              </button>

              <hr class="my-8" />

              <p class="mt-4">
                <router-link
                  class="text-sm font-medium text-sky-600 hover:underline"
                  to="forgotpassword"
                >
                  Esqueceu a senha?
                </router-link>
              </p>
              <p class="mt-1">
                <router-link
                  class="text-sm font-medium text-sky-600 hover:underline"
                  to="register"
                >
                  Cadastre-se
                </router-link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "@/stores/userStores";
import { required, email, password } from "@/composable/rules";
import { useForm } from "vee-validate";

const router = useRouter();
const config = useRuntimeConfig();
const api_url = config.public.api_url;
const snackbar = useSnackbar();

const { defineInputBinds, handleSubmit, errors } = useForm({
  validationSchema: {
    email: [required, email],
    password: [required, password],
  },
});

const form = ref({
  email: defineInputBinds("email"),
  password: defineInputBinds("password"),
});

const doLogin = async (values) => {
  try {
    const { data, error } = await useFetch(`${api_url}/login`, {
      method: "POST",
      body: { ...values },
    });

    if (error.value?.data?.message) {
      snackbar.add({
        type: "error",
        text: error.value.data.message,
      });
      return;
    }

    const userStore = useUserStore();

    userStore.setToken(data.value.token);
    userStore.setUser({
      _id: data.value.user._id,
      picture: data.value.user.picture,
      email: data.value.user.email,
      name: data.value.user.name,
      type: data.value.user.type,
    });

    if (data.value.token) {
      if (data.value.user.type === "admin") {
        router.replace({ path: "admin/appointment" });
        return;
      }

      if (data.value.user.type === "employee") {
        router.replace({ path: "employee/appointment" });
        return;
      }

      router.replace({ path: "user/appointment" });
    }
  } catch (error) {
    console.log("error", error);
  }
};

const onSubmit = handleSubmit(doLogin);
</script>


<style scoped>
.max-w-4xl {
  max-width: 56rem;
}
</style>