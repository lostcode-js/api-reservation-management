<template>
  <div
    v-if="isVisible"
    class="fixed bottom-4 right-4 p-2 bg-green-500 text-white rounded-lg shadow-md"
  >
    {{ message }}
  </div>
</template>

<script setup>
const isVisible = ref(false);
const message = ref("");

const showToast = (msg, duration = 3000) => {
  message.value = msg;
  isVisible.value = true;
  setTimeout(() => {
    isVisible.value = false;
  }, duration);
};
</script>