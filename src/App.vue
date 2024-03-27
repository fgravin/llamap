<script setup lang="ts">
import Map from './components/Map.vue'
import Prompt from '@/components/Prompt.vue'
import { useLLMStore } from '@/stores/llm'
import { storeToRefs } from 'pinia'
import { callOpenAI } from '@/services/openai.client'
import { callOverpassApi } from '@/services/overpass.client'
import { addGeojson } from '@/services/map.service'

const llmStore = useLLMStore()
const { loading } = storeToRefs(llmStore)
const sendPrompt = async (prompt: string) => {
  llmStore.setLoading(true)

  const chatResponse = await callOpenAI(prompt)
  const osmResponse = await callOverpassApi(chatResponse)
  llmStore.setGeojson(osmResponse)
  llmStore.setLoading(false)
}
</script>

<template>
  <header class="">
    <div class="h-24 flex gap-8">
      <div class="flex gap-8 ml-8">
        <img src="./assets/C2C_2022_RGB_moto_square_logo.png" class="my-4" />
        <img src="./assets/llamap-logo.webp" />
      </div>
      <div
        class="flex grow items-center bg-gradient-to-r from-white from-3% via-primary-600 via-20% to-primary-800 py-4 text-6xl transition transition-all duration-500 font-serif"
      >
        <div class="ml-24 text-white tracking-widest font-title">LLaMap</div>
      </div>
    </div>
  </header>
  <main class="grow flex mx-24 mt-12 shadow-2xl rounded-3xl">
    <Map />
  </main>
  <footer class="h-64 flex items-center justify-center">
    <Prompt @update:prompt="sendPrompt" :loading="loading" />
  </footer>
</template>
