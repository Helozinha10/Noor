# NOOR - Bolsas Bordadas a Mao

<div align="center">
  <img src="public/noor-favicon.svg" alt="NOOR Logo" width="80" height="80">
  
  **"Shine like a NOOR girl"**
  
  *Experiencia visual imersiva para uma marca de bolsas bordadas a mao*
</div>

---

## Estetica e Conceito

O site NOOR e uma experiencia visual **Neo-Vintage**, combinando elementos digitais com texturas analogicas:

- **Digital Scrapbook**: Colagens, papeis rasgados, fitas adesivas
- **Y2K Vibes**: Cores vibrantes, formas organicas, elementos brilhantes
- **Collage Art**: Sobreposicao agressiva de camadas (z-index)
- **Funky but Chic**: Diversao com elegancia

## Stack Tecnologico

| Tecnologia | Versao | Proposito |
|------------|--------|-----------|
| **Vue.js 3** | 3.x | Core Framework (Composition API) |
| **Vite** | 7.x | Build Tool e Dev Server |
| **Tailwind CSS** | 4.x | Utilitarios de Estilo |

## Estrutura do Projeto

```text
src/
├── assets/
│   ├── images/
│   │   ├── shine-noor-girl.jpg
│   │   ├── funky-chic.jpg
│   │   └── products/
│   └── main.css
├── components/
│   ├── layout/
│   │   ├── TheHeader.vue
│   │   └── MarqueeBar.vue
│   ├── sections/
│   │   ├── HeroCollage.vue
│   │   └── ProductGridMasonry.vue
│   └── ComingSoon.vue
├── data/
│   └── products.json
├── App.vue
└── main.js
```

## Efeitos Visuais Implementados

1. **Noise Overlay**: Textura de filme analogico sobre todo o site
2. **Glassmorphism**: Header com blur no scroll
3. **Paper Texture**: Fundo com textura de papel
4. **Levitating Shadows**: Sombras dinamicas nos cards
5. **Zoom Lightbox**: Visualizacao ampliada de produtos

## Como Executar

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Design Tokens

```css
:root {
  --color-royal-blue: #0A1E40;
  --color-cream-paper: #F2F0E6;
  --color-gold-star: #C5A059;
  --color-glass-green: #4A6B63;
  --color-retro-pink: #D988B9;
  
  --font-display: 'Playfair Display', serif;
  --font-hand: 'Permanent Marker', cursive;
  --font-body: 'Space Mono', monospace;
}
```

## Acessibilidade

- Skip link para navegacao por teclado
- Todas as imagens com alt descritivo
- Suporte a prefers-reduced-motion
- ARIA labels em elementos interativos

## Responsividade

- **Mobile First**: Componentes adaptados para telas pequenas
- **Grid Adaptativo**: Layout flexivel em todas as resolucoes

---

<div align="center">
  
  **NOOR** - Handmade in Brasil
  
  *"Funky but chic. Unica como voce."*
  
</div>
