<template>
  <section
    id="videos_section"
    class="w-full pb-5 md:pb-10 pt-4 md:pt-6 md:px-4 h-full relative"
  >
    <div
      id="videos-container"
      class="flex items-center justify-center h-full p-6 py-10 lg:pt-2 "
    >
      <div class="text-white text-center w-full z-10">        
        <div class="w-full flex flex-col md:flex-row max-w-7xl mx-auto justify-center pt-10 md:pt-20">
          <video 
          class="w-4/5 md:w-1/4 aspect-w-1 aspect-h-1 mx-8 pt-4" 
          controls muted
          v-for="(videos, index) in displayVideos"
          :key="index"
          >
            <source :src=videos.src poster="assets/poster-video-1.png" type="video/mp4">
            <track kind="captions">
            Your browser does not support the video tag.
          </video>          
        </div>
      </div>
    </div>
  </section>
</template> 

<script setup lang="ts">
  interface displayVideos {
    src: string,
  }

  const displayVideos: displayVideos[] = [
    {src: "/assets/video-01.mp4"},
    {src: "/assets/video-02.mp4"},
    {src: "/assets/video-03.mp4"},
  ]
</script>

<style scoped>

</style>