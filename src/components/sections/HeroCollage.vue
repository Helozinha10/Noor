<template>
  <section 
    class="hero-collage relative min-h-[70vh] flex items-center justify-center 
           overflow-hidden bg-cream-paper py-8"
  >
    <div class="container mx-auto px-6 relative z-10">
      
      <div class="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10">
        
        <div 
          class="image-left transform rotate-[-3deg]"
          :class="{ 'opacity-100 translate-x-0': isVisible, 'opacity-0 -translate-x-8': !isVisible }"
          style="transition: all 0.8s ease-out;"
        >
          <img 
            :src="shineNoorGirlImage" 
            alt="Shine like a noor girl"
            class="w-80 md:w-96 lg:w-[28rem] h-auto rounded-sm levitate-shadow"
            loading="eager"
          />
        </div>
        
        <div 
          class="image-right"
          :class="{ 'opacity-100 translate-x-0': isVisible, 'opacity-0 translate-x-8': !isVisible }"
          style="transition: all 0.8s ease-out 0.2s;"
        >
          <img 
            :src="funkyChicImage" 
            alt="Funky but Chic"
            class="w-72 md:w-80 lg:w-96 h-auto rounded-sm levitate-shadow"
            loading="eager"
          />
        </div>
        
      </div>
      
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import shineNoorGirlImage from '@/assets/images/shine-noor-girl.jpg'
import funkyChicImage from '@/assets/images/funky-chic.jpg'

const isVisible = ref(false)

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})
</script>

<style scoped>
</style>
