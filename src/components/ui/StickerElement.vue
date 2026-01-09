<template>
  <!-- 
    StickerElement.vue - Wrapper para transformar elementos em "adesivos"
    
    Efeitos:
    - Sombra de drop-shadow
    - Rotação aleatória leve
    - Hover com lift e rotação
    - Opcional: borda ondulada tipo selo
  -->
  <div
    :class="[
      'sticker-element inline-block',
      'transition-all duration-300 ease-out',
      { 'sticker-stamp': stampBorder }
    ]"
    :style="{
      transform: `rotate(${rotation}deg)`,
      '--rotation': `${rotation}deg`
    }"
    @mouseenter="handleHover(true)"
    @mouseleave="handleHover(false)"
  >
    <div
      :class="[
        'sticker-inner relative',
        isHovered ? 'scale-105' : 'scale-100',
        'transition-transform duration-300'
      ]"
      :style="{
        filter: `drop-shadow(${shadowX}px ${shadowY}px ${shadowBlur}px rgba(0,0,0,${shadowOpacity}))`
      }"
    >
      <slot></slot>
      
      <!-- Optional spinning text badge -->
      <div 
        v-if="badge"
        class="absolute -top-2 -right-2 w-14 h-14 z-10"
      >
        <div class="spin-slow w-full h-full">
          <svg viewBox="0 0 100 100" class="w-full h-full">
            <defs>
              <path 
                id="circle" 
                d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
              />
            </defs>
            <circle 
              cx="50" 
              cy="50" 
              r="40" 
              :fill="badgeColor"
            />
            <text class="font-hand text-[10px] fill-cream-paper uppercase">
              <textPath href="#circle" startOffset="0%">
                {{ badge }} • {{ badge }} • {{ badge }} •
              </textPath>
            </text>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

/**
 * Props
 */
const props = defineProps({
  rotation: {
    type: Number,
    default: null // Se null, gera rotação aleatória
  },
  stampBorder: {
    type: Boolean,
    default: false
  },
  badge: {
    type: String,
    default: null
  },
  badgeColor: {
    type: String,
    default: '#D988B9' // retro-pink
  }
})

// State
const isHovered = ref(false)
const randomRotation = ref(0)

// Computed rotation (usa prop ou gera aleatório)
const rotation = computed(() => {
  return props.rotation ?? randomRotation.value
})

// Shadow values que mudam com hover
const shadowX = computed(() => isHovered.value ? 8 : 4)
const shadowY = computed(() => isHovered.value ? 12 : 6)
const shadowBlur = computed(() => isHovered.value ? 16 : 10)
const shadowOpacity = computed(() => isHovered.value ? 0.3 : 0.2)

// Handlers
const handleHover = (hovering) => {
  isHovered.value = hovering
}

// Generate random rotation on mount
onMounted(() => {
  if (props.rotation === null) {
    // Random rotation between -5 and 5 degrees
    randomRotation.value = (Math.random() - 0.5) * 10
  }
})
</script>

<style scoped>
.spin-slow {
  animation: spin 8s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Stamp border effect - borda ondulada tipo selo postal */
.sticker-stamp {
  --stamp-color: var(--color-cream-paper, #F2F0E6);
}

.sticker-stamp::before {
  content: '';
  position: absolute;
  inset: -6px;
  background: var(--stamp-color);
  -webkit-mask: 
    radial-gradient(circle at 6px 50%, transparent 4px, black 4.5px) left / 12px 100%,
    radial-gradient(circle at 50% 6px, transparent 4px, black 4.5px) top / 100% 12px;
  -webkit-mask-composite: source-in;
  mask: 
    radial-gradient(circle at 6px 50%, transparent 4px, black 4.5px) left / 12px 100%,
    radial-gradient(circle at 50% 6px, transparent 4px, black 4.5px) top / 100% 12px;
  mask-composite: intersect;
  z-index: -1;
}
</style>
