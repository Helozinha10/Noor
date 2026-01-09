<template>
  <!-- 
    SlidingDuoInteraction.vue - COMPONENTE CRÍTICO
    
    ============================================
    MATEMÁTICA DO PARALLAX INTERATIVO:
    ============================================
    
    Este componente cria um efeito onde duas imagens se movem em direções
    opostas baseado na posição do mouse, simulando fotos soltas numa mesa.
    
    CONCEITOS:
    1. Posição Normalizada:
       - mouseX/Y variam de -1 (esquerda/cima) a +1 (direita/baixo)
       - O centro do container é o ponto zero (0, 0)
       
    2. Fator de Velocidade:
       - Imagem 1: speedFactor positivo (+0.05) → segue o mouse
       - Imagem 2: speedFactor negativo (-0.05) → se afasta do mouse
       
    3. Fórmula do Transform:
       transform: translate3d(
         mouseX * baseMovement * speedFactor * 100,  // deslocamento X em px
         mouseY * baseMovement * speedFactor * 100,  // deslocamento Y em px
         0
       ) rotate(mouseX * rotationDegrees);           // rotação proporcional ao X
       
    4. Sombra Dinâmica:
       - A sombra se move na direção OPOSTA ao objeto
       - Isso cria a ilusão de uma fonte de luz fixa
       
    ACCESIBILIDADE:
    - Em mobile (< 768px), o efeito é desativado
    - Fallback para layout estático empilhado
    - Suporte a prefers-reduced-motion
    
    ============================================
  -->
  <section 
    class="sliding-duo relative py-20 md:py-32 bg-cream-paper overflow-hidden"
    ref="containerRef"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
    aria-label="Galeria interativa de imagens"
  >
    <!-- Background decoration -->
    <div 
      class="absolute inset-0 pointer-events-none opacity-5"
      style="
        background-image: radial-gradient(circle at 20% 30%, var(--color-retro-pink) 1px, transparent 1px),
                          radial-gradient(circle at 80% 70%, var(--color-gold-star) 1px, transparent 1px);
        background-size: 60px 60px;
      "
      aria-hidden="true"
    ></div>
    
    <div class="container mx-auto px-6">
      <!-- Section title -->
      <div class="text-center mb-16">
        <span 
          class="font-body text-xs uppercase tracking-[0.3em] text-glass-green block mb-4"
        >
          Nossa Essência
        </span>
        <h2 class="font-display text-3xl md:text-4xl lg:text-5xl text-royal-blue">
          Duas faces do <span class="font-hand text-retro-pink italic">mesmo brilho</span>
        </h2>
      </div>
      
      <!-- Interactive Container -->
      <div 
        class="duo-container relative h-[400px] md:h-[500px] lg:h-[600px] 
               flex items-center justify-center"
      >
        <!-- 
          IMAGEM 1: "Shine like a noor girl"
          - Move-se NA DIREÇÃO do mouse (speedFactor positivo)
          - Rotação positiva quando mouse vai para direita
        -->
        <div 
          class="image-card image-1 absolute w-[280px] md:w-[350px] lg:w-[400px]
                 transition-all duration-300 ease-out"
          :class="{ 'md:cursor-grab': !isMobile }"
          :style="getImage1Style()"
        >
          <!-- Paper frame -->
          <div class="paper-texture p-3 md:p-4 levitate-shadow">
            <img 
              :src="shineNoorGirlImage" 
              alt="Colagem 'Shine like a noor girl' - design com listras azuis, estrela dourada e glitter"
              class="w-full h-auto block"
              loading="lazy"
            />
          </div>
          
          <!-- Decorative tape -->
          <div 
            class="absolute -top-3 left-1/3 w-12 h-5 bg-yellow-200/80 
                   rotate-[-8deg] shadow-sm"
            aria-hidden="true"
          ></div>
          
          <!-- Label -->
          <div 
            class="absolute -bottom-4 right-4 bg-royal-blue text-cream-paper 
                   font-hand text-sm px-3 py-1 rotate-3"
          >
            ★ noor girl
          </div>
        </div>
        
        <!-- 
          IMAGEM 2: "Funky but Chic"
          - Move-se na DIREÇÃO OPOSTA ao mouse (speedFactor negativo)
          - Rotação negativa quando mouse vai para direita
          - Cria efeito de "distanciamento/parallax"
        -->
        <div 
          class="image-card image-2 absolute w-[260px] md:w-[320px] lg:w-[380px]
                 transition-all duration-300 ease-out"
          :class="{ 'md:cursor-grab': !isMobile }"
          :style="getImage2Style()"
        >
          <!-- Paper frame -->
          <div class="paper-texture p-3 md:p-4 levitate-shadow">
            <img 
              :src="funkyChicImage" 
              alt="Colagem 'Funky but Chic' - design com blocos de vidro coloridos, estrela bordada e olho vintage"
              class="w-full h-auto block"
              loading="lazy"
            />
          </div>
          
          <!-- Decorative tape -->
          <div 
            class="absolute -top-3 right-1/4 w-14 h-5 bg-retro-pink/60 
                   rotate-[5deg] shadow-sm"
            aria-hidden="true"
          ></div>
          
          <!-- Label -->
          <div 
            class="absolute -bottom-4 left-4 bg-retro-pink text-cream-paper 
                   font-hand text-sm px-3 py-1 rotate-[-5deg]"
          >
            funky ✦
          </div>
        </div>
        
        <!-- Center decoration (visible when images separate) -->
        <div 
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                 text-gold-star text-6xl opacity-20 pointer-events-none"
          :style="{ transform: `translate(-50%, -50%) scale(${1 + Math.abs(normalizedX) * 0.3})` }"
          aria-hidden="true"
        >
          ✦
        </div>
      </div>
      
      <!-- Instruction text -->
      <p 
        class="text-center mt-8 font-body text-sm text-royal-blue/50"
        :class="{ 'hidden': isMobile }"
      >
        <span class="inline-flex items-center gap-2">
          <span class="w-4 h-4 border border-royal-blue/30 rounded-full flex items-center justify-center">
            ↔
          </span>
          Mova o mouse para explorar
        </span>
      </p>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Imports das imagens
import shineNoorGirlImage from '@/assets/images/shine-noor-girl.jpg'
import funkyChicImage from '@/assets/images/funky-chic.jpg'

// ============================================
// CONFIGURAÇÃO DO PARALLAX
// ============================================

// Fator de velocidade base para o movimento
// Valores menores = movimento mais sutil
const SPEED_FACTOR = 0.05

// Movimento base em pixels (antes de aplicar o fator)
const BASE_MOVEMENT = 20

// Rotação máxima em graus
const MAX_ROTATION = 5

// ============================================
// STATE REATIVO
// ============================================

// Referência do container para cálculos de posição
const containerRef = ref(null)

// Posição do mouse normalizada (-1 a 1)
const normalizedX = ref(0)
const normalizedY = ref(0)

// Detecta mobile
const isMobile = ref(false)

// ============================================
// LÓGICA DO PARALLAX
// ============================================

/**
 * Handler do movimento do mouse
 * 
 * Calcula a posição relativa do mouse em relação ao CENTRO do container
 * e normaliza os valores entre -1 e 1.
 * 
 * @param {MouseEvent} event - Evento do mouse
 */
const handleMouseMove = (event) => {
  if (!containerRef.value || isMobile.value) return
  
  // Obtém as dimensões e posição do container
  const rect = containerRef.value.getBoundingClientRect()
  
  // Calcula o centro do container
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2
  
  // Normaliza a posição do mouse:
  // - Divide pela metade da largura/altura para obter valores -1 a 1
  // - Quando mouse está no centro: (0, 0)
  // - Quando na borda esquerda: (-1, y)
  // - Quando na borda direita: (1, y)
  const rawX = (event.clientX - centerX) / (rect.width / 2)
  const rawY = (event.clientY - centerY) / (rect.height / 2)
  
  // Limita os valores para evitar extremos quando mouse sai do container
  normalizedX.value = Math.max(-1, Math.min(1, rawX))
  normalizedY.value = Math.max(-1, Math.min(1, rawY))
}

/**
 * Reset quando mouse sai do container
 * Faz transição suave de volta ao centro
 */
const handleMouseLeave = () => {
  normalizedX.value = 0
  normalizedY.value = 0
}

/**
 * Gera o estilo CSS para a Imagem 1
 * 
 * FÍSICA:
 * - Move-se NA DIREÇÃO do mouse (multiplicador positivo)
 * - Rotação proporcional à posição X
 * - Sombra se move na direção OPOSTA para simular luz fixa
 * 
 * @returns {Object} Objeto de estilo CSS
 */
const getImage1Style = () => {
  if (isMobile.value) {
    // Layout estático para mobile
    return {
      transform: 'translate(-20%, -10%) rotate(-5deg)',
      zIndex: 2
    }
  }
  
  // Cálculo do deslocamento:
  // normalizedX * BASE_MOVEMENT * SPEED_FACTOR * 100
  // Ex: 0.5 * 20 * 0.05 * 100 = 50px
  const translateX = normalizedX.value * BASE_MOVEMENT * SPEED_FACTOR * 100
  const translateY = normalizedY.value * BASE_MOVEMENT * SPEED_FACTOR * 100
  
  // Rotação: proporcional ao X, limitada a MAX_ROTATION graus
  const rotation = normalizedX.value * MAX_ROTATION - 5 // -5 é o offset base
  
  // Sombra dinâmica: move na direção oposta
  const shadowX = -normalizedX.value * 10
  const shadowY = -normalizedY.value * 10 + 20
  const shadowBlur = 30 + Math.abs(normalizedX.value) * 20
  
  return {
    transform: `translate3d(calc(-20% + ${translateX}px), calc(-10% + ${translateY}px), 0) rotate(${rotation}deg)`,
    boxShadow: `${shadowX}px ${shadowY}px ${shadowBlur}px rgba(0, 0, 0, 0.2)`,
    zIndex: normalizedX.value > 0 ? 3 : 2 // Traz para frente baseado na posição
  }
}

/**
 * Gera o estilo CSS para a Imagem 2
 * 
 * FÍSICA:
 * - Move-se na DIREÇÃO OPOSTA ao mouse (multiplicador negativo)
 * - Cria o efeito de "recuo" ou "parallax"
 * - Rotação oposta à Imagem 1
 * 
 * @returns {Object} Objeto de estilo CSS
 */
const getImage2Style = () => {
  if (isMobile.value) {
    // Layout estático para mobile
    return {
      transform: 'translate(15%, 10%) rotate(8deg)',
      zIndex: 1
    }
  }
  
  // Movimento OPOSTO (multiplicador negativo)
  // Quando mouse vai para direita (normalizedX positivo),
  // a imagem vai para ESQUERDA
  const translateX = normalizedX.value * BASE_MOVEMENT * SPEED_FACTOR * -100 // Note o NEGATIVO
  const translateY = normalizedY.value * BASE_MOVEMENT * SPEED_FACTOR * -100
  
  // Rotação oposta
  const rotation = -normalizedX.value * MAX_ROTATION + 8 // +8 é o offset base
  
  // Sombra dinâmica
  const shadowX = normalizedX.value * 10 // Invertido em relação à imagem 1
  const shadowY = normalizedY.value * 10 + 20
  const shadowBlur = 30 + Math.abs(normalizedX.value) * 20
  
  return {
    transform: `translate3d(calc(15% + ${translateX}px), calc(10% + ${translateY}px), 0) rotate(${rotation}deg)`,
    boxShadow: `${shadowX}px ${shadowY}px ${shadowBlur}px rgba(0, 0, 0, 0.2)`,
    zIndex: normalizedX.value > 0 ? 2 : 3 // Inverso da imagem 1
  }
}

// ============================================
// DETECÇÃO DE MOBILE
// ============================================

const checkMobile = () => {
  isMobile.value = window.matchMedia('(max-width: 768px)').matches ||
                   'ontouchstart' in window
}

// ============================================
// LIFECYCLE
// ============================================

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>

<style scoped>
/*
  Estilos do contêiner de imagens
  
  Posicionamento inicial:
  - image-1: offset para esquerda e cima
  - image-2: offset para direita e baixo
  
  Isso cria a aparência de "fotos jogadas numa mesa"
*/
.image-card {
  will-change: transform, box-shadow;
  backface-visibility: hidden;
  -webkit-font-smoothing: antialiased;
}

/* Evita seleção durante interação */
.duo-container {
  user-select: none;
  -webkit-user-select: none;
}

/* Para mobile: stack vertical */
@media (max-width: 768px) {
  .duo-container {
    height: auto;
    min-height: 600px;
    flex-direction: column;
    gap: 2rem;
  }
  
  .image-card {
    position: relative;
    width: 85% !important;
  }
  
  .image-1 {
    z-index: 2;
  }
  
  .image-2 {
    z-index: 1;
    margin-top: -60px;
  }
}

/* Respeita preferências de movimento reduzido */
@media (prefers-reduced-motion: reduce) {
  .image-card {
    transition: none !important;
  }
}
</style>
