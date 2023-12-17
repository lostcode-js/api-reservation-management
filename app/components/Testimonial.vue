<template>
  <section
    id="testimonial_section"
    class="w-full md:min-h-[550px] pb-5 md:pb-10 pt-4 md:pt-6 relative overflow-hidden z-[5]"
  >
    <NuxtImg
      format="webp"
      src="/assets/testimonial-background.jpg"
      alt="DRIP BR logo"
      sizes="sm:300px md:1440px lg:2048px"
      class="absolute h-full w-full object-cover object-top z-0 grayscale"
    />
    <div
      id="testimonial-container"
      class="flex items-center justify-center h-full p-6 max-w-7xl mx-auto z-5 relative"
    >
      <div class="columns-3 md:flex hidden mt-20 h-auto">
        <iframe
          class="w-full p-4 card text-center flex flex-col items-center mr-4"
          v-for="(card, index) in testimonialCards"
          :key="index"
          :src="`https://www.youtube.com/embed/${card.src}`"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
          autoplay
          height="560"
        ></iframe>
      </div>

      <div class="md:hidden w-11/12 mx-auto mt-8">
        <Swiper
          :modules="[SwiperAutoplay, SwiperNavigation, SwiperPagination]"
          :slides-per-view="1"
          :spaceBetween="30"
          :pagination="{
            clickable: true,
          }"          
        >
          <SwiperSlide v-for="(card, index) in testimonialCards" :key="index">
            <div
              class=" p-5 mt-4 mb-4 md:mt-20 text-center mr-4 w-full flex flex-col items-center"
            >
              <iframe
                class=""
                :src="`https://www.youtube.com/embed/${card.src}`"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
                autoplay
                height="560"
              ></iframe>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </section>
</template> 

<script setup lang="ts">
interface testimonialCards {
  src: string;
}

const testimonialCards: testimonialCards[] = [
  {
    src: "Gb4N2P8g-og?si=oo33lseUbgfPqDDa",
  },
  {
    src: "ouO_A8zwNCE?si=oPvPNQLxPWl3Ax-9",
  },
  {
    src: "80VVVyCG2Xo?si=WLdlV8rY0JJZjWnr",
  },
];
</script>

<style scoped>
.card {
  background: rgba(217, 217, 217, 0.15);
  border-radius: 20px;
}

.perfil {
  margin-top: -94px;
}
</style>