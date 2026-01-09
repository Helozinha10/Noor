<template>
  <!-- 
    MarqueeBar.vue - Faixa de texto rolando infinitamente
    
    Efeito: Texto duplicado para criar loop contínuo
    Performance: Usa CSS animation ao invés de JS
  -->
  <div 
    class="marquee-wrapper bg-royal-blue py-3 md:py-4 overflow-hidden"
    :class="{ 'bg-retro-pink': variant === 'pink', 'bg-gold-star': variant === 'gold' }"
    role="marquee"
    aria-label="Mensagem promocional"
  >
    <div class="marquee-track flex whitespace-nowrap">
      <!-- Duplicamos o conteúdo para criar o efeito de loop infinito -->
      <div 
        class="marquee-content flex items-center gap-8 animate-marquee"
        :style="{ animationDuration: `${duration}s` }"
      >
        <template v-for="n in 2" :key="n">
          <span 
            v-for="(item, index) in items" 
            :key="`${n}-${index}`"
            class="flex items-center gap-8"
          >
            <span 
              :class="[
                'text-cream-paper uppercase tracking-widest',
                textClass
              ]"
            >
              {{ item }}
            </span>
            <!-- Separator -->
            <span class="text-cream-paper opacity-60">{{ separator }}</span>
          </span>
        </template>
      </div>
      
      <!-- Cópia para loop perfeito -->
      <div 
        class="marquee-content flex items-center gap-8 animate-marquee"
        :style="{ animationDuration: `${duration}s` }"
        aria-hidden="true"
      >
        <template v-for="n in 2" :key="`copy-${n}`">
          <span 
            v-for="(item, index) in items" 
            :key="`copy-${n}-${index}`"
            class="flex items-center gap-8"
          >
            <span 
              :class="[
                'text-cream-paper uppercase tracking-widest',
                textClass
              ]"
            >
              {{ item }}
            </span>
            <span class="text-cream-paper opacity-60">{{ separator }}</span>
          </span>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

/**
 * Props
 * @property {Array} items - Textos a serem exibidos
 * @property {string} separator - Separador visual entre items
 * @property {number} duration - Duração da animação em segundos
 * @property {string} variant - Variante de cor: 'default', 'pink', 'gold'
 * @property {string} fontStyle - Estilo da fonte: 'hand', 'display', 'body'
 */
const props = defineProps({
  items: {
    type: Array,
    default: () => ['HANDMADE', 'NOOR', 'UNIQUE', 'BORDADO À MÃO']
  },
  separator: {
    type: String,
    default: '✦'
  },
  duration: {
    type: Number,
    default: 25
  },
  variant: {
    type: String,
    default: 'default',
    validator: (v) => ['default', 'pink', 'gold'].includes(v)
  },
  fontStyle: {
    type: String,
    default: 'hand',
    validator: (v) => ['hand', 'display', 'body'].includes(v)
  }
})

// Computed class para o estilo de fonte
const textClass = computed(() => {
  const fontClasses = {
    'hand': 'font-hand text-lg md:text-xl',
    'display': 'font-display text-base md:text-lg italic',
    'body': 'font-body text-xs md:text-sm'
  }
  return fontClasses[props.fontStyle]
})
</script>

<style scoped>
.marquee-wrapper {
  /* Previne seleção de texto durante scroll */
  user-select: none;
}

.marquee-track {
  width: max-content;
}

.animate-marquee {
  animation: marquee-scroll var(--duration, 25s) linear infinite;
}

@keyframes marquee-scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

/* Pausa animação ao hover para acessibilidade */
.marquee-wrapper:hover .animate-marquee {
  animation-play-state: paused;
}

/* Respeita preferências de movimento reduzido */
@media (prefers-reduced-motion: reduce) {
  .animate-marquee {
    animation: none;
  }
}
</style>
