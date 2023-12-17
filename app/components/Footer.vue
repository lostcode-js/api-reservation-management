<template>
  <section
    id="footer_section"
    class="w-full relative bg-primary-color text-white"
  >
    <div
      id="footer-container"
      class="h-full py-20 md:py-28 max-w-7xl md:flex md:flex-row-reverse mx-auto justify-between"
    >
      <div class="px-6 py-4 md:w-1/2 w-full mx-auto md:mb-1 mb-10 z-[5]">
        <Swiper
          :modules="[SwiperAutoplay, SwiperNavigation]"
          :slides-per-view="1"
          :loop="true"
          :autoplay="{
            delay: 6000,
            disableOnInteraction: true,
          }"                   
          :navigation="{
            enabled: true
          }"
          :breakpoints="{
            '640': {
              slidesPerView: 1,
              grid: {
                rows: 2
              },
              loop: false,
              autoplay: false,
              navigation: {
                enabled: false
              }                        
            }
          }"
        >
          <SwiperSlide>
            <iframe
              id="iframe-google-maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3005.5648818390446!2d-8.611235900000002!3d41.122192999999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd2464d46529976f%3A0xf367a549873bae08!2sR.%20de%20Soares%20dos%20Reis%2044%2C%204430-315%20Vila%20Nova%20de%20Gaia!5e0!3m2!1spt-BR!2spt!4v1700411322396!5m2!1spt-BR!2spt"
              class="w-full h-auto md:h-1/3"
              style="border: 0"
              allow="fullscreen"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              title="googleMaps"
            ></iframe>
          </SwiperSlide>
          <SwiperSlide>
            <iframe
              id="iframe-google-maps"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3005.564881839044!2d-8.6112359!3d41.122193!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd24654e2e820497%3A0x139159b796f5489e!2zRHJpcCBCUiBCYXJiZWFyaWHwn4en8J-HtyDwn5KI!5e0!3m2!1spt-BR!2sbr!4v1698618915741!5m2!1spt-BR!2sbr"              
              class="w-full h-auto md:pt-4"
              style="border: 0"
              allow="fullscreen"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              title="googleMaps"
            ></iframe>
          </SwiperSlide>
        </Swiper>
      </div>
      <div
        class="px-6 flex flex-col justify-between md:text-left text-center z-[5]"
      >
        <div>
          <div class="flex mb-6">
            <Logo class="md:mx-0 mx-auto" />
          </div>
          <div class="flex mb-8 md:pl-3 justify-center md:justify-normal gap-3">
            <NuxtLink
              v-for="link in socialLinks"
              :key="link.name"
              :href="link.url"
              target="_blank"
              class="md:ml-0 fa-2xl"
              arial-label="whatsapp link"
            >
              <Icon
                :name="link.icon"
                class="flex-shrink-0 h-12 w-12"
                aria-hidden="true"
              />
            </NuxtLink>
          </div>
          <div class="mb-8 md:pl-3">
            <p>
              <span class="font-semibold mb-6 block">
                HORÁRIOS DE FUNCIONAMENTO<br />
              </span>
              Segunda à Sábado<br />
              09:00 às 20:00
            </p>
          </div>
          <div class="mb-8 md:pl-3">
            <p>
              <span class="font-semibold mb-2 block"> SEDES<br /> </span>
              R. de Soares dos Reis 44, Vila Nova de Gaia
              <br />
              R. do Marquês de Sá da Bandeira 332, Vila Nova de Gaia
            </p>
          </div>
          <div class="p-2 w-1/2 mx-auto md:mx-0">
            <NuxtLink
              to="https://www.livroreclamacoes.pt/Inicio/"
              target="_blank"
              aria-label="Livro de reclamações"
              ><NuxtImg
                format="webp"
                src="assets/complaint-book.png"
                alt="Livro de Reclamações"
                loading="lazy"
                class="md:mx-0 mx-auto w-48 h-full"
            /></NuxtLink>
          </div>
        </div>
        <div class="mt-8 md:text-left text-center">
          <p>© 2023 Drip BR. All Right Reserved. Developed by Raydan</p>
        </div>
      </div>
    </div>
  </section>
</template> 

<script setup lang="ts">

const socialLinks = [
  {
    name: "Whatsapp",
    url: "https://wa.me/351930692647",
    icon: "mdi:whatsapp",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/dripbrbarbearia/",
    icon: "mdi:instagram",
  },
];
</script>

<style scoped>
#iframe-google-maps {
  min-height: 250px;  
}

@media (max-width: 600px) {
  #iframe-google-maps {
    min-height: 350px;
  }
}
</style>