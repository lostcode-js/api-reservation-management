<template>
  <div class="flex items-center col-span-3">
    {{ paginationStart }} - {{ paginationEnd }} de {{ total_items }} items
  </div>
  <div class="col-span-2"></div>
  <div class="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
    <nav aria-label="Table navigation">
      <ul class="inline-flex items-center">
        <li>
          <button
            @click="previousPage"
            class="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-sky"
            :disabled="currentPage === 1"
            aria-label="Previous"
          >
            <svg
              aria-hidden="true"
              class="w-4 h-4 fill-current"
              viewBox="0 0 20 20"
            >
              <path
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clip-rule="evenodd"
                fill-rule="evenodd"
              ></path>
            </svg>
          </button>
        </li>
        <li v-for="pageNumber in visiblePageNumbers" :key="pageNumber">
          <button
            @click="goToPage(pageNumber)"
            class="px-3 py-1 rounded-md"
            :class="{
              'focus:outline-none focus:shadow-outline-sky':
                currentPage !== pageNumber,
              'text-white transition-colors duration-150 bg-sky-600 border border-r-0 border-sky-600 rounded-md focus:outline-none focus:shadow-outline-sky':
                currentPage === pageNumber,
            }"
          >
            {{ pageNumber }}
          </button>
        </li>
        <li>
          <button
            @click="nextPage"
            class="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-sky"
            :disabled="currentPage === totalPages"
            aria-label="Next"
          >
            <svg
              class="w-4 h-4 fill-current"
              aria-hidden="true"
              viewBox="0 0 20 20"
            >
              <path
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
                fill-rule="evenodd"
              ></path>
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  current_page: {
    type: Number,
    default: 1,
  },
  items_per_page: {
    type: Number,
    default: 10,
  },
  total_items: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits();

const paginationEnd = computed(() =>
  Math.min(props.current_page * props.items_per_page, props.total_items)
);
const paginationStart = computed(() =>
  paginationEnd.value ? (props.current_page - 1) * props.items_per_page + 1 : 0
);

const totalPages = computed(() =>
  Math.ceil(props.total_items / props.items_per_page)
);

const VISIBLE_PAGES = 3;

const visiblePageNumbers = computed(() => {
  const pageNumbers = [];
  const totalPagesValue = totalPages.value;
  const currentPageValue = props.current_page;

  for (
    let i = Math.max(1, currentPageValue - VISIBLE_PAGES);
    i < currentPageValue;
    i++
  ) {
    pageNumbers.push(i);
  }

  pageNumbers.push(currentPageValue);

  for (
    let i = currentPageValue + 1;
    i <= Math.min(totalPagesValue, currentPageValue + VISIBLE_PAGES);
    i++
  ) {
    pageNumbers.push(i);
  }

  return pageNumbers;
});

const previousPage = () => {
  if (props.current_page > 1) {
    emit("page-changed", {
      paginate: {
        currentPage: props.current_page - 1,
        itemsPerPage: props.items_per_page,
      },
    });
  }
};

const nextPage = () => {
  if (props.current_page < totalPages.value) {
    emit("page-changed", {
      paginate: {
        currentPage: props.current_page + 1,
        itemsPerPage: props.items_per_page,
      },
    });
  }
};

const goToPage = (pageNumber: any) => {
  emit("page-changed", {
    paginate: { currentPage: pageNumber, itemsPerPage: props.items_per_page },
  });
};
</script>
