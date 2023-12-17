<template>
  <main class="flex">
    <Sidebar :pages="pages" />

    <div class="w-full">
      <Navigation route="admin" />

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
    to: "admin/appointment",
  },
  {
    name: "Disponibilidade",
    icon: "mdi:timetable",
    to: "admin/availability",
  },
  {
    name: "Serviços",
    icon: "mdi:toolbox-outline",
    to: "admin/services",
  },
  {
    name: "Barbeiros",
    icon: "mdi:account-multiple-outline",
    to: "admin/employee",
  },
  {
    name: "Empresa",
    icon: "mdi:domain",
    to: "admin/company",
  },
  {
    name: "Feedbacks",
    icon: "mdi:comment-quote-outline",
    to: "admin/feedbacks",
  },
];

function closeSideMenu() {
  return emits("closeSideMenu");
}
</script>