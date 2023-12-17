<template>
  <aside
    class="z-20 flex-shrink-0 hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 md:flex h-screen border-r border-gray-200 dark:border-gray-700"
  >
    <div class="py-4 text-gray-500 dark:text-gray-400">
      <router-link
        class="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200"
        to="/"
      >
        Drip Barber
      </router-link>
      <ul class="mt-12">
        <li class="relative px-6 py-1" v-for="page in pages" :key="page.name">
          <router-link
            exact-active-class="bg-sky-400 text-white"
            class="inline-flex items-center w-full text-sm font-semibold transition duration-200 ease-in hover:bg-sky-500 hover:text-white py-2 px-2 rounded-lg"
            :to="`/${page.to}`"
          >
            <Icon
              :name="page.icon"
              class="flex-shrink-0 h-6 w-6"
              aria-hidden="true"
            />
            <span class="mx-4">{{ page.name }}</span>
          </router-link>
        </li>
      </ul>
    </div>
  </aside>

  <!-- Mobile Sidebar -->
  <div
    v-if="isSideMenuOpen"
    x-transition:enter="transition ease-in-out duration-150"
    x-transition:enter-start="opacity-0"
    x-transition:enter-end="opacity-100"
    x-transition:leave="transition ease-in-out duration-150"
    x-transition:leave-start="opacity-100"
    x-transition:leave-end="opacity-0"
    class="fixed inset-0 z-10 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center"
    v-on:click="closeSideMenu"
  ></div>
  <aside
    class="fixed inset-y-0 z-20 flex-shrink-0 w-96 mt-16 overflow-y-auto bg-white dark:bg-gray-800 md:hidden"
    v-if="isSideMenuOpen"
    x-transition:enter="transition ease-in-out duration-150"
    x-transition:enter-start="opacity-0 transform -translate-x-20"
    x-transition:enter-end="opacity-100"
    x-transition:leave="transition ease-in-out duration-150"
    x-transition:leave-start="opacity-100"
    x-transition:leave-end="opacity-0 transform -translate-x-20"
    @keydown.escape="closeSideMenu"
  >
    <div class="py-4 text-gray-500 dark:text-gray-400">
      <router-link
        class="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200"
        to="#"
      >
        Drip Barber
      </router-link>
      <ul>
        <li class="relative px-6 py-3" v-for="page in pages" :key="page.name">
          <router-link
            active-class="bg-sky-200"
            class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
            :to="`/${page.to}`"
          >
            <component
              :is="page.icon"
              class="flex-shrink-0 h-6 w-6"
              aria-hidden="true"
            />
            <span class="mx-4">{{ page.name }}</span>
          </router-link>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref } from "vue";

const emits = defineEmits(["closeSideMenu"]);

const props = defineProps({
  isSideMenuOpen: {
    type: Boolean,
    default: false,
  },
  pages: {
    type: Array,
    required: true,
  },
});

function closeSideMenu() {
  return emits("closeSideMenu");
}
</script>