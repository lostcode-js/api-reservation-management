<template>
  <section
    id="about_section"
    class="w-full md:h-full pb-5 md:pb-10 pt-8 md:pt-10 lg:pt-14 relative overflow-hidden"
  >
    <div
      id="about-container"
      class="max-w-7xl md:flex items-center text-top justify-center h-full overflow-hidden pt-12 md:pt-16 md:pb-6 px-6 z-[5] mx-auto"
    >
      <div
        class="text-left md:w-1/2 p-4 md:pt-0 md:px-6 xl:px-10"
      >
        <h3 
          class="text-third-color md:text-2xl text-2xl mb-1 md:mb-6 font-semibold">
          BEM VINDO
        </h3>
        <h1 class="md:text-6xl text-4xl mb-6 font-semibold md:mb-10">
          Barbearia<br /> DRIP BR
        </h1>
        <p class="lg:text-xl sm:text-base text-sm mb-2 lg:mb-6">
          Sabemos que imigrar para um país desconhecido e recomeçar a vida do zero não é fácil! Acontece diversas coisas que nos deixam tristes, desmotivados e com muita saudade. 
        </p>
        <p class="lg:text-xl sm:text-base text-sm  mb-2 lg:mb-6">
          É por isso que nós surgimos, estamos aqui para ajudar, fazer todos os imigrantes se sentirem no Brasil, em casa. Vamos preencher o vazio no peito de cada um com o sentimento de pertencimento, trazendo a nostalgia e a cultura do nosso país para todo o mundo.
        </p>
        <p class="lg:text-xl sm:text-base text-sm mb-2 lg:mb-6">
          Aqui você vai escutar aquela música boa, tomar uma cervejinha gelada, jogar aquele Bomba Patch, aquele flyper com The King Of Fighters 98, aquela sinuquinha e é claro, aquela resenha que só quem é brasileiro sabe e ainda vai sair na régua! 
        </p>
        <p class="lg:text-xl sm:text-base text-sm mb-2 lg:mb-6">
          O Brasil nunca esteve tão perto, isso aqui é Drip BR, sinta-se em casa! 
        </p>        
        
      </div>
      <div
        class="md:w-1/2  mx-auto z-[5]"
      >
        <ul class="flex flex-wrap justify-center gap-2.5" 
        >
          <li
          v-for="(img, index) in aboutImgs"
          :key="index"
          :class="img.class"
          class="lg:basis-48 md:basis-36 basis-24 "
          >            
            <img        
            :src=img.src
            :alt=img.description
            class=" object-cover h-auto w-full mx-auto align-middle rounded"
            />

          </li>
        </ul>
        
       
      </div>
    </div>
  </section>
</template> 

<script setup lang="ts">
  interface aboutImgs{
    description: string,
    src: string,
    class: string
  }

  const aboutImgs: aboutImgs[] =[
    {description: "image1", src: "assets/about-item001.jpg", class: ''},
    {description: "image2", src: "assets/about-item03.jpg", class: ''},
    {description: "image3", src: "assets/about-item05.jpg", class: 'transform scale-x-[-1]'},
    {description: "image4", src: "assets/about-item006.jpg", class: 'transform scale-x-[-1]'},
    {description: "image5", src: "assets/teste5.jpg", class: ''},
    {description: "image6", src: "assets/teste3.jpg", class: 'transform scale-x-[-1]'},
  ]
</script>