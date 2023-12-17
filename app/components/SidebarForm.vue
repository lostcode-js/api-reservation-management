<template>
  <Transition name="slide-fade">
    <div
      v-if="isOpen"
      class="fixed top-0 right-0 h-screen w-1/4 bg-white shadow-md flex flex-col z-30"
    >
      <div class="bg-gray-100 text-gray-500 py-4 px-4 flex justify-between">
        <div class="flex items-center justify-center">
          <span class="font-bold text-lg">{{
            (isUpdate ? "Editar " : "Criar ") + title
          }}</span>
        </div>

        <button
          class="inline-flex items-center text-sm font-semibold transition duration-200 ease-in ml-auto hover:text-gray-800 py-2 px-2 rounded-full"
          @click="$emit('closeModal', false)"
        >
          <Icon
            name="material-symbols:close-rounded"
            class="flex-shrink-0 h-6 w-6"
            aria-hidden="true"
          />
        </button>
      </div>
      <div class="p-4 h-full overflow-y-auto">
        <slot></slot>
      </div>
    </div>
  </Transition>
</template>

<script setup  lang='ts'>
const props = defineProps({
  title: { type: String, default: "" },
  isUpdate: {
    type: Boolean,
    default: false,
  },
  isOpen: {
    type: Boolean,
    default: true,
  },
});
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(80px);
  opacity: 0;
}
</style>
