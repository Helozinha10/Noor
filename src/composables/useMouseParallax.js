/**
 * useMouseParallax - Composable para efeitos parallax baseados no mouse
 * 
 * Matemática do Parallax:
 * - Calculamos a posição relativa do mouse em relação ao centro do container
 * - Normalizamos os valores entre -1 e 1
 * - Aplicamos um fator de velocidade para controlar a intensidade do efeito
 * 
 * @param {Object} options - Opções de configuração
 * @param {number} options.speedFactor - Multiplicador de velocidade (default: 0.05)
 * @param {boolean} options.invert - Inverte a direção do movimento (default: false)
 * @returns {Object} - Valores reativos e handlers
 */
import { ref, computed, onMounted, onUnmounted } from 'vue'

export function useMouseParallax(options = {}) {
    const {
        speedFactor = 0.05,
        invert = false,
        rotationFactor = 2,
        enableRotation = true
    } = options

    // Posição do mouse (normalizada entre -1 e 1)
    const mouseX = ref(0)
    const mouseY = ref(0)

    // Referência do container para cálculos relativos
    const containerRef = ref(null)

    // Flag para detectar mobile
    const isMobile = ref(false)

    /**
     * Handler do movimento do mouse
     * Calcula a posição relativa ao centro do container
     */
    const handleMouseMove = (event) => {
        if (!containerRef.value || isMobile.value) return

        const rect = containerRef.value.getBoundingClientRect()

        // Centro do container
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        // Posição relativa (normalizada entre -1 e 1)
        // Quando o mouse está no centro: 0
        // Quando está na borda esquerda/superior: -1
        // Quando está na borda direita/inferior: +1
        const rawX = (event.clientX - centerX) / (rect.width / 2)
        const rawY = (event.clientY - centerY) / (rect.height / 2)

        // Limita os valores entre -1 e 1 para evitar valores extremos
        mouseX.value = Math.max(-1, Math.min(1, rawX))
        mouseY.value = Math.max(-1, Math.min(1, rawY))
    }

    /**
     * Reset quando mouse sai do viewport
     */
    const handleMouseLeave = () => {
        // Transição suave de volta ao centro
        mouseX.value = 0
        mouseY.value = 0
    }

    /**
     * Detecta se é dispositivo móvel
     */
    const checkMobile = () => {
        isMobile.value = window.matchMedia('(max-width: 768px)').matches
    }

    // Lifecycle
    onMounted(() => {
        checkMobile()
        window.addEventListener('resize', checkMobile)

        if (containerRef.value) {
            containerRef.value.addEventListener('mousemove', handleMouseMove)
            containerRef.value.addEventListener('mouseleave', handleMouseLeave)
        }
    })

    onUnmounted(() => {
        window.removeEventListener('resize', checkMobile)

        if (containerRef.value) {
            containerRef.value.removeEventListener('mousemove', handleMouseMove)
            containerRef.value.removeEventListener('mouseleave', handleMouseLeave)
        }
    })

    /**
     * Computed: Transform CSS para o elemento
     * 
     * A fórmula do parallax:
     * translate3d(x * factor * base, y * factor * base, 0)
     * 
     * @param {number} baseMovement - Movimento base em pixels (default: 20)
     * @param {boolean} invertMovement - Inverte para efeito oposto
     */
    const getTransformStyle = (baseMovement = 20, invertMovement = false) => {
        const direction = (invert || invertMovement) ? -1 : 1

        // Cálculo do deslocamento:
        // mouseX/Y variam de -1 a 1
        // Multiplicamos pelo movimento base e pelo fator de velocidade
        const translateX = mouseX.value * baseMovement * speedFactor * direction * 100
        const translateY = mouseY.value * baseMovement * speedFactor * direction * 100

        // Cálculo da rotação:
        // Rotação proporcional à posição X do mouse
        const rotation = enableRotation
            ? mouseX.value * rotationFactor * direction
            : 0

        return {
            transform: `translate3d(${translateX}px, ${translateY}px, 0) rotate(${rotation}deg)`,
            transition: 'transform 0.3s ease-out'
        }
    }

    /**
     * Computed: Estilo de sombra dinâmica
     * A sombra se move na direção oposta ao objeto para criar
     * a ilusão de uma fonte de luz fixa
     */
    const getDynamicShadowStyle = () => {
        // Sombra se move na direção oposta ao mouse
        const shadowX = -mouseX.value * 10
        const shadowY = -mouseY.value * 10 + 20 // offset base de 20px para baixo
        const blur = 30 + Math.abs(mouseX.value * 10)

        return {
            boxShadow: `${shadowX}px ${shadowY}px ${blur}px rgba(0, 0, 0, 0.2)`
        }
    }

    return {
        mouseX,
        mouseY,
        containerRef,
        isMobile,
        getTransformStyle,
        getDynamicShadowStyle,
        handleMouseMove,
        handleMouseLeave
    }
}
