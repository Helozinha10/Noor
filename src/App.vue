<template>
  <ComingSoon v-if="!isUnlocked" @unlock="unlockSite" />
  
  <div v-else id="noor-app" class="app-container relative min-h-screen">
    
    <div class="noise-overlay" aria-hidden="true"></div>
    
    <TheHeader />
    
    <main id="main-content">
      <HeroCollage />
      <ProductGridMasonry />
    </main>
    
    <footer class="bg-cream-paper py-8 border-t border-royal-blue/10">
      <div class="container mx-auto px-6 flex justify-between items-center">
        <a 
          href="https://wa.me/5514996925260"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 font-body text-sm text-royal-blue 
                 hover:text-retro-pink transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          WhatsApp: (14) 99692-5260
        </a>
        
        <button 
          @click="lockSite"
          class="font-body text-xs text-royal-blue/30 hover:text-royal-blue/60 transition-colors"
        >
          Sair do modo admin
        </button>
      </div>
    </footer>
    
    <a 
      href="#main-content" 
      class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 
             focus:z-[10000] focus:bg-royal-blue focus:text-cream-paper 
             focus:px-4 focus:py-2 focus:font-body"
    >
      Pular para o conteudo principal
    </a>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ComingSoon from '@/components/ComingSoon.vue'
import TheHeader from '@/components/layout/TheHeader.vue'
import HeroCollage from '@/components/sections/HeroCollage.vue'
import ProductGridMasonry from '@/components/sections/ProductGridMasonry.vue'

const isUnlocked = ref(false)

onMounted(() => {
  const adminAccess = localStorage.getItem('noor_admin')
  if (adminAccess === 'true') {
    isUnlocked.value = true
  }
})

const unlockSite = () => {
  isUnlocked.value = true
}

const lockSite = () => {
  localStorage.removeItem('noor_admin')
  isUnlocked.value = false
}
</script>

<style>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  overflow-x: hidden;
  cursor: auto;
}

::selection {
  background-color: var(--color-retro-pink);
  color: var(--color-cream-paper);
}
</style>
