<template>
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled ? 'py-3 glass' : 'py-6 bg-transparent'
    ]"
  >
    <div class="container mx-auto px-6 flex items-center justify-between">
      <a 
        href="#" 
        class="logo"
        aria-label="NOOR - Pagina Inicial"
      >
        <img 
          :src="noorLogo" 
          alt="Noor Branding - Logo"
          class="h-20 md:h-24 w-auto"
        />
      </a>
      
      <nav 
        class="hidden md:flex items-center gap-8"
        role="navigation"
        aria-label="Menu Principal"
      >
        <a 
          v-for="item in menuItems" 
          :key="item.name"
          :href="item.href"
          class="nav-link font-body text-sm uppercase tracking-widest text-royal-blue 
                 relative overflow-hidden group"
        >
          <span class="relative z-10">{{ item.name }}</span>
          <span 
            class="absolute bottom-0 left-0 w-full h-0.5 bg-retro-pink 
                   transform -translate-x-full group-hover:translate-x-0 
                   transition-transform duration-300"
          ></span>
        </a>
      </nav>
      
      <button 
        class="md:hidden flex flex-col gap-1.5 p-2"
        @click="toggleMobileMenu"
        :aria-expanded="isMobileMenuOpen"
        aria-label="Abrir menu"
      >
        <span 
          :class="[
            'w-6 h-0.5 bg-royal-blue transition-all duration-300',
            isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
          ]"
        ></span>
        <span 
          :class="[
            'w-6 h-0.5 bg-royal-blue transition-all duration-300',
            isMobileMenuOpen ? 'opacity-0' : ''
          ]"
        ></span>
        <span 
          :class="[
            'w-6 h-0.5 bg-royal-blue transition-all duration-300',
            isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
          ]"
        ></span>
      </button>
    </div>
    
    <Transition name="slide-down">
      <div 
        v-if="isMobileMenuOpen"
        class="md:hidden absolute top-full left-0 right-0 bg-cream-paper 
               shadow-lg border-t border-royal-blue/10"
      >
        <nav class="container mx-auto px-6 py-8 flex flex-col gap-6">
          <a 
            v-for="item in menuItems" 
            :key="item.name"
            :href="item.href"
            class="font-display text-2xl text-royal-blue hover:text-retro-pink 
                   transition-colors"
            @click="isMobileMenuOpen = false"
          >
            {{ item.name }}
          </a>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import noorLogo from '@/assets/images/noor-logo.png'

const menuItems = [
  { name: 'Shop', href: '#shop' }
]

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
