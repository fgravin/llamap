<script setup lang="ts">
import { type Ref, ref } from 'vue'
import 'maplibre-gl/dist/maplibre-gl.css'
import IconRocket from '@/components/icons/IconRocket.vue'
import IconClose from '@/components/icons/IconClose.vue'

const prompt: Ref<String> = ref('')
defineProps({
  loading: Boolean
})
const emit = defineEmits(['update:prompt'])

const sendPrompt = () => {
  emit('update:prompt', prompt.value)
}
const reset = () => {
  prompt.value = ''
}
</script>

<template>
  <form @submit.prevent="sendPrompt" class="relative flex w-[80%] text-3xl" @keydown.esc="reset">
    <input
      type="text"
      v-model="prompt"
      autofocus
      class="grow text-primary-800 focus:shadow-3xl transition-all outline-2 outline-none focus:shadow-primary-700 border-primary-500 h-18 rounded-xl border px-12 py-6 pl-32"
      placeholder="Que souhaitez-vous afficher ?"
    />
    <div
      class="flex items-center text-primary-300 text-5xl absolute inset-y-0 left-12"
      :class="{ shake: loading }"
    >
      <IconRocket />
    </div>

    <button
      class="flex items-center text-primary-300 text-5xl absolute inset-y-0 right-12 hover:text-primary-800 transition-colors"
      @click="reset"
      type="button"
      :class="{ invisible: !prompt }"
    >
      <IconClose></IconClose>
    </button>
  </form>
</template>

<style>
.shake {
  animation: bounceIn 1s infinite;
}
@keyframes bounceIn {
  from,
  20%,
  40%,
  60%,
  80%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  0% {
    opacity: 1;
    transform: scale3d(0.3, 0.3, 0.3);
  }

  20% {
    transform: scale3d(1.1, 1.1, 1.1);
  }

  40% {
    transform: scale3d(0.9, 0.9, 0.9);
  }

  60% {
    opacity: 1;
    transform: scale3d(1.03, 1.03, 1.03);
  }

  80% {
    transform: scale3d(0.97, 0.97, 0.97);
  }

  to {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
}
</style>
