<template>
  <section
    id="home_section"
    class="w-full h-[100vh] bg-cover bg-center relative"
  >
    <NuxtImg
      format="webp"
      src="/assets/home-background.jpg"
      alt="homeBackground"
      class="absolute h-full w-full object-cover object-center z-[5]"
    />
    <div
      class="font-permanent-marker h-full flex flex-col-reverse justify-center md:flex-row max-w-7xl mx-auto"
    >
      <div
        id="home-container"
        class="flex flex-col items-center justify-center md:h-full z-10 relative pt-8 md:pt-12 md:grow"
      >
        <div class="text-white text-center">
          <h1 class="relative text-3xl mb-2 md:text-4xl lg:text-8xl">
            Sinta-se em casa
          </h1>
          <h2 class="flex items-center justify-center px-8 mt-2 md:mt-6">
            <span class="block bg-white w-8 md:w-16 mx-1 h-0.5 md:mx-2"></span>
            <span class="text-base md:text-2xl">Horários: 09:00 às 20:00</span>
            <span class="block bg-white w-8 md:w-16 h-0.5 mx-1 md:mx-2"></span>
          </h2>
        </div>
        <BtnReservation
          class="bg-fourth-color hover:bg-sixth-color mt-5 md:mt-10"
        />
      </div>
      <div class="md:grow">
        <div
          class="flex items-center justify-center text-white h-full w-full relative z-10 pt-6 md:pt-0"
        >
          <iframe
            src="https://www.youtube.com/embed/PBZrIEw2A5A?si=k8r-B_GuM57gRvu6"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
            class="mx-auto aspect-[9/16] md:w-9/12 md:aspect-w-1 md:h-3/4 md:mx-8 pt-8"
            autoplay
            height="360"
          ></iframe>
        </div>
      </div>
    </div>
  </section>
</template> 

<script setup lang="ts">
</script>

<style scoped>
#home_section::before {
  content: "";
  position: absolute;
  top: 0%;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
}
</style>