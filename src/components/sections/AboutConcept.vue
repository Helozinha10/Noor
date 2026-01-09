<template>
  <!-- 
    AboutConcept.vue - Seção "Sobre" com layout de revista
    
    Design:
    - Layout assimétrico
    - Texto em colunas com destaque
    - Elementos decorativos tipo scrapbook
  -->
  <section 
    id="about"
    class="about-section relative py-20 md:py-32 bg-cream-paper overflow-hidden"
    aria-labelledby="about-title"
    ref="sectionRef"
  >
    <!-- Decorative tape/torn paper at top -->
    <div 
      class="absolute top-0 left-0 right-0 h-4 bg-gold-star/20 torn-edge-bottom"
      aria-hidden="true"
    ></div>
    
    <div class="container mx-auto px-6">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        <!-- Text Content -->
        <div 
          class="lg:col-span-7 relative"
          :class="{ 'opacity-100 translate-x-0': isVisible, 'opacity-0 -translate-x-8': !isVisible }"
          style="transition: all 0.8s ease-out;"
        >
          <!-- Pre-title badge -->
          <div 
            class="inline-block bg-royal-blue text-cream-paper font-hand 
                   text-sm px-4 py-2 mb-6 rotate-[-2deg]"
          >
            SOBRE NÓS ✦
          </div>
          
          <!-- Main Title -->
          <h2 
            id="about-title"
            class="font-display text-4xl md:text-5xl lg:text-6xl 
                   text-royal-blue leading-tight mb-8"
          >
            Cada bolsa é uma 
            <span class="text-highlight-pink font-hand italic">obra de arte</span>
          </h2>
          
          <!-- Description with highlighted text -->
          <div class="space-y-6 font-body text-royal-blue/80 leading-relaxed">
            <p>
              A <strong class="font-display text-royal-blue">NOOR</strong> nasceu do amor 
              pelo artesanato e pela 
              <span class="text-highlight">beleza das coisas feitas à mão</span>. 
              Cada peça passa por um processo de criação único, onde o bordado 
              ganha vida ponto a ponto.
            </p>
            
            <p>
              Nosso nome vem do árabe e significa 
              <span class="font-hand text-retro-pink text-lg">"luz"</span>. 
              Acreditamos que cada mulher tem sua própria luz, e nossas bolsas 
              são uma extensão dessa energia única.
            </p>
            
            <!-- Quote block -->
            <blockquote 
              class="relative pl-6 border-l-4 border-retro-pink 
                     font-display italic text-xl text-royal-blue"
            >
              "Funky but chic. Única como você."
              <span 
                class="absolute -left-2 -top-4 font-hand text-4xl text-gold-star"
              >
                "
              </span>
            </blockquote>
          </div>
          
          <!-- Stats/Features -->
          <div class="flex flex-wrap gap-8 mt-10">
            <div 
              v-for="(stat, index) in stats" 
              :key="stat.label"
              class="text-center"
              :style="{ transitionDelay: `${index * 100 + 200}ms` }"
              :class="{ 'opacity-100 translate-y-0': isVisible, 'opacity-0 translate-y-4': !isVisible }"
            >
              <span class="block font-display text-3xl md:text-4xl text-gold-star">
                {{ stat.value }}
              </span>
              <span class="font-body text-xs uppercase tracking-wider text-royal-blue/60">
                {{ stat.label }}
              </span>
            </div>
          </div>
        </div>
        
        <!-- Visual Element / Collage -->
        <div 
          class="lg:col-span-5 relative"
          :class="{ 'opacity-100 translate-x-0': isVisible, 'opacity-0 translate-x-8': !isVisible }"
          style="transition: all 0.8s ease-out 0.3s;"
        >
          <div class="relative">
            <!-- Background shape -->
            <div 
              class="absolute inset-4 bg-glass-green/10 rounded-sm rotate-3"
              aria-hidden="true"
            ></div>
            
            <!-- Main image card -->
            <div 
              class="relative bg-cream-paper p-4 levitate-shadow rotate-[-2deg]"
            >
              <img 
                :src="funkyChicImage" 
                alt="Colagem artística com texto 'Funky but Chic', estrela dourada bordada, olho vintage e blocos de vidro coloridos"
                class="w-full h-auto"
                loading="lazy"
              />
              
              <!-- Photo corners -->
              <div 
                class="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-gold-star"
                aria-hidden="true"
              ></div>
              <div 
                class="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-gold-star"
                aria-hidden="true"
              ></div>
              <div 
                class="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-gold-star"
                aria-hidden="true"
              ></div>
              <div 
                class="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-gold-star"
                aria-hidden="true"
              ></div>
            </div>
            
            <!-- Floating sticker -->
            <div 
              class="absolute -bottom-6 -left-6 bg-retro-pink text-cream-paper 
                     font-hand text-lg px-4 py-2 rotate-12 shadow-lg"
            >
              100% handmade
            </div>
            
            <!-- Star decoration -->
            <div 
              class="absolute -top-4 -right-4 text-4xl jitter"
              aria-hidden="true"
            >
              ✨
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Bottom decoration -->
    <div 
      class="absolute bottom-0 left-0 right-0 h-4 bg-retro-pink/20 torn-edge-top"
      aria-hidden="true"
    ></div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Import da imagem
import funkyChicImage from '@/assets/images/funky-chic.jpg'

// Stats data
const stats = [
  { value: '500+', label: 'Peças criadas' },
  { value: '100%', label: 'Artesanal' },
  { value: '♡', label: 'Feito com amor' }
]

// Scroll animation state
const sectionRef = ref(null)
const isVisible = ref(false)
let observer = null

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true
        observer.unobserve(entry.target)
      }
    },
    { threshold: 0.2 }
  )
  
  if (sectionRef.value) {
    observer.observe(sectionRef.value)
  }
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<style scoped>
.text-highlight-pink {
  background: linear-gradient(180deg, transparent 50%, var(--color-retro-pink) 50%);
  padding: 0 0.25em;
}
</style>
