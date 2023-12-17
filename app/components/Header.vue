<template>
  <header class="w-full  bg-fourth-color/90 fixed z-50 text-white font-roboto">
    <nav
      class="max-w-7xl mx-auto px-4 md:py-2 md:flex md:justify-between md:items-center font-semibold"
    >
      <div class="flex justify-between items-center">
        <Logo />
        <!--Mobile Friendly Header-->
        <div class="flex">          
          <div class="md:hidden" @click="showMobileMenu">
            <svg
              v-if="!isMenuVisible"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 text-second-color"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 text-second-color"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
      </div>
      <div
        class="absolute md:relative w-full md:w-auto left-0"
      >
        <ul
          class="md:flex md:items-center z-[-1] md:z-auto md:static md:w-auto pb-6 md:p-auto bg-fourth-color/90 md:bg-transparent  "
          :class="{ hidden: !isMenuVisible, block: isMenuVisible }"
        >
          <li
            v-for="(item, index) in menuItems"
            :key="index"
            class="mx-7 md:mx-3 lg:mx-6 pt-6 md:my-0"
          >
            <NuxtLink
              class="uppercase relative text-sm lg:text-2xl w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-second-color after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center"
              :to="item.link"
              @click="delaydMobileMenuClick"
              >{{ item.name}}</NuxtLink
            >
          </li>
        </ul>
        
      </div>
      
    </nav>
  </header>
</template>


<script setup lang="ts">
import { ref } from "vue";
interface menuItems {
  name: string;
  link: string;
}

const menuItems: menuItems[] = [
  { name: "home", link: "#home_section" },
  { name: "serviços", link: "#services_section" },
  { name: "sobre nós", link: "#about_section" },
  { name: "contato", link: "#footer_section" },
  { name: "marcação", link: "/login"}
];

const isMenuVisible = ref(false);

const showMobileMenu = () => {
  isMenuVisible.value = !isMenuVisible.value;
};

const clickDelay = 600;

const delaydMobileMenuClick = () => {
  setTimeout(() => {
    showMobileMenu();
  }, clickDelay);
};
</script>