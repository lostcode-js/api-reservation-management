<template>
  <Head>
    <!-- GENERAL TAGS -->
    <Title>Barbearia Drip BR</Title>
    <Meta name="author" content="Raydan by Daniel Soares" />
    <Meta name="author" content="Raydan by Isaac Francelino" />
    <Meta
      name="keywords"
      content="barbearia brasileira, barbearia em Portugal, corte de cabelo masculino, barba, grooming, Soares dos Reis 44, Vila Nova de Gaia, 4430-315, serviços de barbearia, estilo, moda masculina, cabeleireiro, barbeiro, beleza masculina, tratamento capilar, design de barba, experiência única, atendimento personalizado"
    />
    <Meta
      name="description"
      content="Bem-vindo à Barbearia DRIP BR! Nós entendemos as dificuldades de começar uma nova vida em um país desconhecido. Estamos aqui para proporcionar aos imigrantes uma experiência brasileira autêntica, preenchendo seus corações com o calor da nossa cultura. Na DRIP BR, você encontrará música brasileira, cerveja gelada, jogos clássicos como Bomba Patch e The King Of Fighters 98, sinuca e, é claro, aquela resenha brasileira inigualável. Sinta-se em casa, pois o Brasil nunca esteve tão próximo."
    />
    <Meta name="viewport" content="width=device-width, initial-scale=1" />
    <Meta name="copyright" content="Raydan 2023" />
    <Meta name="robots" content="index, follow" />

    <!-- TWITTER TAGS -->
    <Meta name="twitter:title" content="Barbearia - Drip BR" />
    <Meta
      name="twitter:description"
      content="Bem-vindo à Barbearia DRIP BR! Proporcionamos uma autêntica experiência brasileira para imigrantes, preenchendo corações com calor e cultura. Música brasileira, cerveja gelada, jogos clássicos como Bomba Patch e The King Of Fighters 98, sinuca e a inigualável resenha brasileira. Sinta-se em casa na DRIP BR - a proximidade do Brasil como nunca antes. 🇧🇷✂️ #DRIPBR #Barbearia #CulturaBrasileira"
    />
    <!--<Meta name="twitter:image" content="/preview.png" />-->
    <Meta name="twitter:card" content="summary" />

    <!-- FACEBOOK TAGS -->
    <Meta name="og:title" content="Barbearia - Drip BR" />
    <Meta
      name="og:description"
      content="Bem-vindo à Barbearia DRIP BR! Proporcionamos uma autêntica experiência brasileira para imigrantes, preenchendo corações com calor e cultura. Música brasileira, cerveja gelada, jogos clássicos como Bomba Patch e The King Of Fighters 98, sinuca e a inigualável resenha brasileira. Sinta-se em casa na DRIP BR - a proximidade do Brasil como nunca antes. 🇧🇷✂️ #DRIPBR #Barbearia #CulturaBrasileira"
    />
    <!--<Meta name="og:image" content="/preview.png" />-->
    <!--<Meta name="og:url" content="https://lp-jambu-bar.vercel.app/" />-->
    <Meta name="og:type”" content="website" />
    <Meta name="og:site_name" content="Barbearia - Drip BR" />
  </Head>
  <div class="relative bg-slate-200">
    <Header />
    <Home />
    <Reservation />
    <Services />    
    <About />
    <MessageBreak />
    <Gallery />    
    <Testimonial /> 
    <Place />
    <Footer />
  </div>
</template>

<script setup lang="ts">
useHead({
  htmlAttrs: {
    lang: "pt",
  },
  meta: [{ charset: "utf-8" }],
  link: [
    { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/apple-touch-icon.png",
    },
    { rel: "icon", sizes: "32x32", href: "/favicon-32x32.png" },
    { rel: "icon", sizes: "16x16", href: "/favicon-16x16.png" },
    { rel: "manifest", href: "/site.webmanifest" },
  ],
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Kalam:wght@400;700&family=Open+Sans&family=Roboto:wght@100;300;400;500;700;900&family=Smythe&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap');


html {
  scroll-behavior: smooth;
  font-family: "Kalam", sans-serif;
}

.font-roboto {
  font-family: "Roboto", sans-serif;
}

.font-permanent-marker {
  font-family: "Permanent Marker", sans-serif;
}
p {
  font-family: "Roboto", sans-serif;
}

::-webkit-scrollbar-track {
  background-color: #151515;
}
::-webkit-scrollbar {
  width: 3px;
  background: #f4f4f4;
}
::-webkit-scrollbar-thumb {
  background: #dad7d7;
}
</style>
