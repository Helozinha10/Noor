/**
 * useScrollReveal - Composable para animações de entrada baseadas em scroll
 * 
 * Utiliza Intersection Observer para detectar quando elementos
 * entram no viewport e aplicar animações de fade-up
 * 
 * @param {Object} options - Opções de configuração
 * @param {number} options.threshold - Porcentagem visível para trigger (default: 0.1)
 * @param {string} options.rootMargin - Margem do root (default: '0px')
 * @param {boolean} options.once - Anima apenas uma vez (default: true)
 * @returns {Object} - Ref para o elemento e estado de visibilidade
 */
import { ref, onMounted, onUnmounted } from 'vue'

export function useScrollReveal(options = {}) {
    const {
        threshold = 0.1,
        rootMargin = '0px 0px -50px 0px',
        once = true
    } = options

    // Referência do elemento a ser observado
    const elementRef = ref(null)

    // Estado de visibilidade
    const isVisible = ref(false)

    // Observer instance
    let observer = null

    /**
     * Callback do Intersection Observer
     */
    const handleIntersection = (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                isVisible.value = true

                // Se once=true, desconecta após primeira animação
                if (once && observer) {
                    observer.unobserve(entry.target)
                }
            } else if (!once) {
                isVisible.value = false
            }
        })
    }

    // Lifecycle
    onMounted(() => {
        if (!elementRef.value) return

        // Cria o Intersection Observer
        observer = new IntersectionObserver(handleIntersection, {
            threshold,
            rootMargin
        })

        observer.observe(elementRef.value)
    })

    onUnmounted(() => {
        if (observer) {
            observer.disconnect()
        }
    })

    /**
     * Retorna classes CSS baseadas no estado de visibilidade
     */
    const revealClasses = () => {
        return {
            'opacity-0 translate-y-8': !isVisible.value,
            'opacity-100 translate-y-0': isVisible.value,
            'transition-all duration-700 ease-out': true
        }
    }

    /**
     * Retorna um delay para animações em cascata
     * @param {number} index - Índice do elemento
     * @param {number} baseDelay - Delay base em ms (default: 100)
     */
    const getStaggerDelay = (index, baseDelay = 100) => {
        return {
            transitionDelay: `${index * baseDelay}ms`
        }
    }

    return {
        elementRef,
        isVisible,
        revealClasses,
        getStaggerDelay
    }
}

/**
 * useScrollRevealMultiple - Para animar múltiplos elementos em sequência
 */
export function useScrollRevealMultiple(count, options = {}) {
    const items = Array.from({ length: count }, (_, i) => ({
        ref: ref(null),
        isVisible: ref(false),
        index: i
    }))

    return items
}
