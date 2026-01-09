import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'

// Alpine.js para micro-interações de alta performance
import Alpine from 'alpinejs'
import intersect from '@alpinejs/intersect'

// Registra plugins do Alpine
Alpine.plugin(intersect)

// Expõe Alpine globalmente para uso nos componentes
window.Alpine = Alpine

// Inicia o Alpine após a montagem do Vue
const app = createApp(App)

app.mount('#app')

// Inicia o Alpine.js
Alpine.start()
