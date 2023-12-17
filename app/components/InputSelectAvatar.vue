<template>
  <div class="block text-sm grid gap-2">
    <span class="text-gray-700 dark:text-gray-400 font-semibold text-lg">
      {{ label }}
    </span>

    <div class="flex grid gap-4 grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
      <template v-for="(item, index) in options" :key="index">
        <button
          :class="{
            'border-sky-400 shadow-sm ': value === item[key],
            'border-transparent': value !== item[key],
          }"
          class="p-4 border cursor-pointer rounded-lg"
          @click="value = item[key]"
          type="button"
        >
          <input
            v-model="value"
            type="radio"
            :name="title"
            :value="item[key]"
            class="hidden"
          />
          <label class="grid gap-1" :for="item[title]">
            <span class="cursor-pointer flex flex-col gap-1.5">
              <div class="relative mx-auto w-20 h-20 rounded-full md:block">
                <img
                  v-if="item.picture"
                  class="object-cover w-full h-full rounded-full border border-gray-300"
                  :src="item.picture"
                  :alt="item.name"
                  loading="lazy"
                />
                <Icon
                  v-else
                  name="ph:user-bold"
                  class="object-cover w-full h-full rounded-full"
                />
              </div>
              <div class="font-semibold">{{ item?.name }}</div>
            </span>
          </label>
        </button>
      </template>
      <template v-if="!options.length">
        <p class="italic text-gray-400">Não existem registros disponíveis</p>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  options: {
    type: Array,
    default: () => [],
  },
  label: {
    type: String,
    default: "",
  },
  key: {
    type: String,
    default: "_id",
  },
  modelValue: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
</script>
