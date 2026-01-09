<template>
  <section 
    id="shop"
    class="products-section relative py-32 md:py-40 bg-cream-paper overflow-hidden"
    aria-labelledby="products-title"
    ref="sectionRef"
  >
    <div 
      class="w-full flex justify-center items-center"
      style="padding-bottom: 120px;"
    >
      <h2 
        id="products-title"
        class="font-vintage text-5xl md:text-6xl lg:text-7xl text-royal-blue text-center"
      >
        Lançamentos
      </h2>
    </div>
    
    <div class="w-full px-4 md:px-6 lg:px-8">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 md:gap-8">
        
        <article 
          v-for="(product, index) in availableProducts" 
          :key="product.id"
          class="product-card bg-white rounded-lg overflow-hidden shadow-lg 
                 hover:shadow-xl transition-shadow duration-300"
          :class="{ 'opacity-100 translate-y-0': isVisible, 'opacity-0 translate-y-8': !isVisible }"
          :style="{ transitionDelay: `${index * 150}ms`, transition: 'all 0.6s ease-out' }"
        >
          <div 
            class="relative aspect-square overflow-hidden bg-cream-paper cursor-zoom-in group"
            @click="openLightbox(product)"
          >
            <img 
              :src="getProductImage(product.image)" 
              :alt="product.name"
              class="w-full h-full object-contain p-4 transition-transform duration-300 
                     group-hover:scale-110"
              loading="lazy"
            />
            
            <div class="absolute inset-0 flex items-center justify-center bg-royal-blue/0 
                        group-hover:bg-royal-blue/10 transition-colors duration-300">
              <span class="text-royal-blue/0 group-hover:text-royal-blue/60 text-3xl 
                          transition-all duration-300">
                +
              </span>
            </div>
            
            <div 
              v-if="product.uniquePiece"
              class="absolute top-4 left-4 bg-royal-blue text-cream-paper 
                     font-body text-xs uppercase tracking-wider px-3 py-1 z-10"
            >
              Peça Única
            </div>
          </div>
          
          <div class="p-6">
            <div class="flex justify-between items-start mb-4">
              <h3 class="font-vintage text-2xl md:text-3xl text-royal-blue">
                {{ product.name }}
              </h3>
              <span class="font-body text-lg font-bold text-royal-blue bg-highlight-yellow px-2 py-1">
                R$ {{ formatPrice(product.price) }}
              </span>
            </div>
            
            <div class="mb-6 p-3 bg-cream-paper rounded">
              <h4 class="font-body text-xs uppercase tracking-wider text-royal-blue/50 mb-2">
                Dimensões
              </h4>
              <div class="flex gap-4 font-body text-sm text-royal-blue">
                <span>L: {{ product.dimensions.width }}</span>
                <span>A: {{ product.dimensions.height }}</span>
                <span>P: {{ product.dimensions.depth }}</span>
              </div>
            </div>
            
            <a 
              :href="getWhatsAppLink(product)"
              target="_blank"
              rel="noopener noreferrer"
              class="block w-full bg-royal-blue text-cream-paper font-hand text-lg 
                     text-center py-3 px-6 hover:bg-retro-pink transition-colors duration-300"
            >
              COMPRAR AGORA
            </a>
          </div>
        </article>
        
      </div>
      
      <div 
        v-if="availableProducts.length === 0"
        class="text-center py-20"
      >
        <p class="font-display text-2xl text-royal-blue/50">
          Todas as peças foram vendidas!
        </p>
        <p class="font-body text-sm text-royal-blue/40 mt-2">
          Novas coleções em breve...
        </p>
      </div>
    </div>
    
    <Teleport to="body">
      <div 
        v-if="lightboxProduct"
        class="fixed inset-0 z-[99999] flex items-center justify-center p-4"
        @click="closeLightbox"
      >
        <div class="absolute inset-0 bg-royal-blue/95"></div>
        
        <div class="relative max-w-4xl max-h-[90vh] z-10" @click.stop>
          <img 
            :src="getProductImage(lightboxProduct.image)" 
            :alt="lightboxProduct.name"
            class="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
          />
          
          <div class="text-center mt-4">
            <h3 class="font-vintage text-3xl text-cream-paper">
              {{ lightboxProduct.name }}
            </h3>
            <p class="font-body text-lg text-cream-paper/70 mt-2">
              R$ {{ formatPrice(lightboxProduct.price) }}
            </p>
          </div>
        </div>
        
        <button 
          @click="closeLightbox"
          class="absolute top-6 right-6 text-cream-paper text-4xl hover:text-retro-pink 
                 transition-colors z-20"
          aria-label="Fechar"
        >
          X
        </button>
      </div>
    </Teleport>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import productsData from '@/data/products.json'

const productImages = import.meta.glob('@/assets/images/products/*.jpeg', { eager: true })

const products = ref(productsData)
const sectionRef = ref(null)
const isVisible = ref(false)
const lightboxProduct = ref(null)

const openLightbox = (product) => {
  lightboxProduct.value = product
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  lightboxProduct.value = null
  document.body.style.overflow = ''
}

const whatsappNumber = '5514996925260'

const availableProducts = computed(() => {
  return products.value.filter(p => p.available)
})

const getProductImage = (imageName) => {
  for (const [key, module] of Object.entries(productImages)) {
    if (key.includes(imageName)) {
      return module.default
    }
  }
  return ''
}

const getWhatsAppLink = (product) => {
  const message = encodeURIComponent(
    `Olá! Tenho interesse na bolsa *${product.name}* (R$ ${formatPrice(product.price)}). ` +
    `Ela ainda está disponível?`
  )
  return `https://wa.me/${whatsappNumber}?text=${message}`
}

const formatPrice = (price) => {
  return price.toLocaleString('pt-BR', { 
    minimumFractionDigits: 2,
    maximumFractionDigits: 2 
  })
}

let observer = null

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true
        observer.unobserve(entry.target)
      }
    },
    { threshold: 0.1 }
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
.product-card:hover img {
  transform: scale(1.02);
  transition: transform 0.3s ease;
}
</style>
