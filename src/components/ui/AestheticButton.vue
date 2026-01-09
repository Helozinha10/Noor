<template>
  <!-- 
    AestheticButton.vue - Botão com hover único
    
    Efeitos:
    - Mudança de cor no hover
    - Leve rotação e escala
    - Efeito "shine" passando
  -->
  <component
    :is="href ? 'a' : 'button'"
    :href="href"
    :type="href ? undefined : type"
    :class="[
      'aesthetic-btn relative inline-flex items-center justify-center gap-2',
      'font-hand text-lg md:text-xl uppercase tracking-wide',
      'px-6 py-3 md:px-8 md:py-4',
      'overflow-hidden',
      'transition-all duration-300 ease-out',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-star focus-visible:ring-offset-2',
      variantClasses,
      { 'opacity-60 cursor-not-allowed': disabled }
    ]"
    :disabled="disabled"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <!-- Shine effect overlay -->
    <span 
      class="shine-effect absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent
             -translate-x-full"
      :class="{ 'animate-shine': isHovered }"
    ></span>
    
    <!-- Content -->
    <span class="relative z-10 flex items-center gap-2">
      <slot name="icon-left"></slot>
      <slot>{{ text }}</slot>
      <slot name="icon-right"></slot>
    </span>
    
    <!-- Corner decoration -->
    <span 
      v-if="decorated"
      class="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 
             transition-all duration-300"
      :class="isHovered ? 'border-cream-paper' : 'border-current opacity-50'"
    ></span>
    <span 
      v-if="decorated"
      class="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 
             transition-all duration-300"
      :class="isHovered ? 'border-cream-paper' : 'border-current opacity-50'"
    ></span>
  </component>
</template>

<script setup>
import { ref, computed } from 'vue'

/**
 * Props
 */
const props = defineProps({
  text: {
    type: String,
    default: 'Click Me'
  },
  variant: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'secondary', 'outline', 'ghost'].includes(v)
  },
  href: {
    type: String,
    default: null
  },
  type: {
    type: String,
    default: 'button'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  decorated: {
    type: Boolean,
    default: true
  }
})

// State
const isHovered = ref(false)

// Computed classes based on variant
const variantClasses = computed(() => {
  const variants = {
    primary: `
      bg-royal-blue text-cream-paper border-2 border-royal-blue
      hover:bg-retro-pink hover:border-retro-pink hover:rotate-[-2deg] hover:scale-105
    `,
    secondary: `
      bg-retro-pink text-royal-blue border-2 border-retro-pink
      hover:bg-gold-star hover:border-gold-star hover:rotate-[2deg] hover:scale-105
    `,
    outline: `
      bg-transparent text-royal-blue border-2 border-royal-blue
      hover:bg-royal-blue hover:text-cream-paper hover:rotate-[-1deg] hover:scale-105
    `,
    ghost: `
      bg-transparent text-royal-blue border-2 border-transparent
      hover:border-retro-pink hover:text-retro-pink
    `
  }
  return variants[props.variant]
})
</script>

<style scoped>
@keyframes shine {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(200%);
  }
}

.animate-shine {
  animation: shine 0.6s ease-out;
}
</style>
