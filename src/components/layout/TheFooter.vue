<template>
  <!-- 
    TheFooter.vue - Footer Estilo Zine
    
    Design: Links grandes, layout assimétrico, 
    estética de revista/fanzine
  -->
  <footer class="bg-royal-blue text-cream-paper py-16 md:py-24 relative overflow-hidden">
    <!-- Decorative elements -->
    <div class="absolute top-10 right-10 font-hand text-6xl opacity-10 rotate-12">
      ★
    </div>
    <div class="absolute bottom-20 left-10 font-hand text-4xl opacity-10 -rotate-12">
      xoxo
    </div>
    
    <div class="container mx-auto px-6">
      <!-- Main Footer Grid -->
      <div class="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
        
        <!-- Brand Column -->
        <div class="md:col-span-4">
          <h2 class="font-display text-5xl md:text-6xl mb-6 leading-tight">
            N<span class="text-gold-star">✦</span>OR
          </h2>
          <p class="font-body text-sm opacity-80 max-w-xs leading-relaxed">
            Bolsas bordadas à mão com amor. Cada peça é única, 
            assim como você.
          </p>
          
          <!-- Social Links -->
          <div class="flex gap-4 mt-8">
            <a 
              v-for="social in socials" 
              :key="social.name"
              :href="social.url"
              :aria-label="social.name"
              class="w-10 h-10 border border-cream-paper/30 rounded-full 
                     flex items-center justify-center
                     hover:bg-retro-pink hover:border-retro-pink 
                     transition-all duration-300 group"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span class="font-body text-xs">{{ social.icon }}</span>
            </a>
          </div>
        </div>
        
        <!-- Links Column -->
        <div class="md:col-span-3 md:col-start-6">
          <h3 class="font-hand text-2xl mb-6 text-retro-pink">NAVEGAR</h3>
          <ul class="space-y-3">
            <li v-for="link in navLinks" :key="link.name">
              <a 
                :href="link.href"
                class="font-body text-sm uppercase tracking-wider 
                       hover:text-gold-star transition-colors
                       relative group"
              >
                {{ link.name }}
                <span 
                  class="absolute -left-4 opacity-0 group-hover:opacity-100 
                         transition-opacity"
                >
                  →
                </span>
              </a>
            </li>
          </ul>
        </div>
        
        <!-- Contact Column -->
        <div class="md:col-span-3">
          <h3 class="font-hand text-2xl mb-6 text-retro-pink">CONTATO</h3>
          <div class="space-y-4">
            <a 
              href="mailto:hello@noor.com.br" 
              class="font-body text-sm block hover:text-gold-star transition-colors"
            >
              hello@noor.com.br
            </a>
            <a 
              href="https://wa.me/5511999999999" 
              class="font-body text-sm block hover:text-gold-star transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              +55 11 99999-9999
            </a>
          </div>
          
          <!-- Newsletter Mini Form -->
          <div class="mt-8">
            <p class="font-hand text-lg mb-3">JOIN THE CLUB ✉</p>
            <div class="flex gap-2">
              <input 
                type="email" 
                placeholder="seu@email.com"
                class="flex-1 bg-transparent border-b border-cream-paper/30 
                       py-2 text-sm font-body
                       focus:outline-none focus:border-gold-star
                       placeholder:text-cream-paper/50"
                aria-label="Seu email para newsletter"
              />
              <button 
                class="font-hand text-gold-star hover:text-retro-pink transition-colors"
                aria-label="Inscrever no newsletter"
              >
                GO!
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Bottom Bar -->
      <div class="mt-16 pt-8 border-t border-cream-paper/10 
                  flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="font-body text-xs opacity-60">
          © 2026 NOOR. Handmade with ♡ in Brasil.
        </p>
        <div class="flex gap-6">
          <a 
            href="#privacy" 
            class="font-body text-xs opacity-60 hover:opacity-100 transition-opacity"
          >
            Privacidade
          </a>
          <a 
            href="#terms" 
            class="font-body text-xs opacity-60 hover:opacity-100 transition-opacity"
          >
            Termos
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Social links
const socials = [
  { name: 'Instagram', icon: 'IG', url: 'https://instagram.com/noor' },
  { name: 'TikTok', icon: 'TK', url: 'https://tiktok.com/@noor' },
  { name: 'Pinterest', icon: 'PT', url: 'https://pinterest.com/noor' }
]

// Navigation links
const navLinks = [
  { name: 'Shop', href: '#shop' },
  { name: 'Diary', href: '#diary' },
  { name: 'About', href: '#about' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Trocas', href: '#returns' }
]
</script>
