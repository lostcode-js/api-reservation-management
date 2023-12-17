<template>
  <main class="flex">
    <Sidebar :pages="pages" />

    <div class="w-full">
      <Navigation route="employee" />

      <div class="mx-8 mt-4">
        <slot />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";

const { isSideMenuOpen } = defineProps(["isSideMenuOpen"]);
const emits = defineEmits(["closeSideMenu"]);

const pages = [
  {
    name: "Reservas",
    icon: "mdi:calendar-text",
    to: "employee/appointment",
  },
  {
    name: "Disponibilidade",
    icon: "mdi:timetable",
    to: "employee/availability",
  }
];

function closeSideMenu() {
  return emits("closeSideMenu");
}
</script>