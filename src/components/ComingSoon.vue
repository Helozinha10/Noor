<template>
  <div class="coming-soon min-h-screen flex flex-col items-center justify-center bg-cream-paper relative overflow-hidden">
    
    <div class="noise-overlay" aria-hidden="true"></div>
    
    <div class="mb-12">
      <img 
        :src="noorLogo" 
        alt="Noor Branding"
        class="h-32 md:h-40 w-auto"
      />
    </div>
    
    <div class="text-center px-6 max-w-2xl">
      <h1 class="font-vintage text-5xl md:text-7xl lg:text-8xl text-royal-blue mb-8">
        Em Breve
      </h1>
      
      <div class="flex justify-center gap-4">
        <span class="text-gold-star text-2xl">*</span>
        <span class="text-retro-pink text-2xl">*</span>
        <span class="text-glass-green text-2xl">*</span>
      </div>
    </div>
    
    <button 
      @click="showAdminModal = true"
      class="absolute text-royal-blue/10 hover:text-royal-blue/40 text-lg transition-colors"
      style="bottom: 10px; right: 10px;"
      aria-label="Admin"
    >
      .
    </button>
    
    <Teleport to="body">
      <div 
        v-if="showAdminModal"
        class="admin-modal-overlay"
        @click.self="showAdminModal = false"
      >
        <div class="admin-modal-content">
          <h3 class="font-display text-2xl text-royal-blue mb-6">
            Acesso Admin
          </h3>
          <input 
            v-model="adminPassword"
            type="password"
            placeholder="Digite a senha"
            class="w-full px-4 py-3 border-2 border-royal-blue/20 font-body text-base mb-4
                   focus:outline-none focus:border-royal-blue bg-white"
            @keyup.enter="checkPassword"
          />
          <div class="flex gap-3">
            <button 
              @click="showAdminModal = false"
              class="flex-1 px-4 py-3 border-2 border-royal-blue text-royal-blue font-body text-sm
                     hover:bg-royal-blue/10 transition-colors"
            >
              Cancelar
            </button>
            <button 
              @click="checkPassword"
              class="flex-1 px-4 py-3 bg-royal-blue text-cream-paper font-body text-sm
                     hover:bg-retro-pink transition-colors"
            >
              Entrar
            </button>
          </div>
          <p v-if="error" class="text-red-500 text-sm font-body mt-4 text-center">
            {{ error }}
          </p>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import noorLogo from '@/assets/images/noor-logo.png'

const emit = defineEmits(['unlock'])

const showAdminModal = ref(false)
const adminPassword = ref('')
const error = ref('')

const ADMIN_PASSWORD = 'noor2024'

const checkPassword = () => {
  if (adminPassword.value === ADMIN_PASSWORD) {
    localStorage.setItem('noor_admin', 'true')
    showAdminModal.value = false
    emit('unlock')
  } else {
    error.value = 'Senha incorreta'
    setTimeout(() => {
      error.value = ''
    }, 3000)
  }
}
</script>

<style scoped>
.admin-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(10, 30, 64, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999;
}

.admin-modal-content {
  background-color: #F2F0E6;
  padding: 2rem;
  border-radius: 8px;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}
</style>
