<template>
  <div class="block text-sm grid gap-2">
    <span class="text-gray-700 dark:text-gray-400 font-semibold text-lg"> {{ label }} </span>

    <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
      <template v-for="(item, index) in options" :key="index">
        <span
          :class="{
            'border-sky-600 shadow-sm': value === item[key],
          }"
          class="p-4 border rounded-lg"
        >
          <label class="grid gap-1" :for="item[title]">
            <span class="font-semibold flex items-center gap-1.5">
              <input
                v-model="value"
                type="radio"
                :name="title"
                :value="item[key]"
              />{{ item[title] }}</span
            >
            <p class="text-sm">{{ item[text] }}</p></label
          >
        </span>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  options: {
    type: Array,
    default: () => [],
  },
  title: {
    type: String,
    default: "",
  },
  text: {
    type: String,
    default: "",
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
    default: ""
  }
});

const emit = defineEmits(['update:modelValue'])

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
</script>
