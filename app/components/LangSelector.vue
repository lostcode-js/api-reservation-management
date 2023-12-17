<template>
  <div class="relative mr-4 lg:mr-8 ml-2">
    <div
      class="flex items-center cursor-pointer"
      @mouseenter="toggleDropdown"
      @mouseleave="hideLangMenu"
    >
      <NuxtImg
        format="webp"
        :src="selectedOption?.image"
        class="h-6 w-6 rounded-full"
        alt="Language Icon"
        width="512"
        height="512"
      />
      <div
        v-if="isDropdownVisible"
        class="top-6 -translate-x-1/2 absolute border border-gray-700 rounded-lg shadow-lg bg-slate-900"
      >
        <div
          v-for="option in languageOptions"
          :key="option.value"
          class="flex justify-start items-center py-3 pl-4 pr-10 cursor-pointer hover:text-white duration-500"
          @click="selectOption(option)"
        >
          <NuxtImg
            format="webp"
            :src="option.image"
            class="h-6 w-6 rounded-full mr-3"
            alt="Language Icon"
            width="512"
            height="512"
          />
          <span class="text-sm font-semibold text-right">{{
            option.name
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { useI18n } from "vue-i18n";
import nuxtStorage from "nuxt-storage";

interface LanguageOption {
  value: string;
  name: string;
  image: string;
}
const { locale } = useI18n();

const lang = ref<string>(
  nuxtStorage?.localStorage?.getData("jambu-bar-lang") || "pt"
);

const languageOptions: LanguageOption[] = [
  { value: "pt", name: "Português", image: "assets/portugal.png" },
  { value: "en", name: "English", image: "assets/usa.png" },
  { value: "es", name: "Español", image: "assets/spain.png" },
];

const selectedOption = computed(() => {
  return languageOptions.find((option) => option.value === lang.value);
});

watch(lang, (newLang: string) => {
  nuxtStorage.localStorage.setData("jambu-bar-lang", newLang);
  locale.value = newLang;
});

const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  lang.value = target.value;
};

const isDropdownVisible = ref(false);

const toggleDropdown = () => {
  isDropdownVisible.value = !isDropdownVisible.value;
};

const selectOption = (option: LanguageOption) => {
  lang.value = option.value;
  isDropdownVisible.value = false;
};

const hideLangMenu = () => {
  isDropdownVisible.value = false;
};
</script>