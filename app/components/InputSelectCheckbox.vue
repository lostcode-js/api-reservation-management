<template>
  <div class="block text-sm grid gap-2">
    <span class="text-gray-700 dark:text-gray-400 font-semibold text-lg">
      {{ label }}
    </span>

    <div class="grid gap-4">
      <template v-for="(item, index) in options" :key="index">
        <span
          :class="{
            'border-sky-600 shadow-md': value === item[key],
          }"
          class="p-4 border border-sky-400 rounded-lg"
        >
          <label class="grid gap-1" :for="item[title]">
            <span class="font-semibold flex items-center gap-1.5">
              <input
                @click="toggleService(item[key])"
                type="checkbox"
                :name="title"
                :value="item[key]"
                :checked="model.includes(item[key])"
              />
             {{ item[title] }} - A partir de: {{ convertToEuro(item.price) }}
            </span>
            <p class="text-sm">{{ item[text] }}</p></label
          >
        </span>
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
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["update:modelValue"]);

const model = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

const toggleService = (_id: string) => {
  if (model.value.includes(_id)) {
    emit(
      "update:modelValue",
      model.value.filter((s) => s !== _id)
    );
  } else {
    emit("update:modelValue", [...model.value, _id]);
  }
};

function convertToEuro(value: any) {
  const euroFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
  });

  return euroFormat.format(value);
}
</script>
