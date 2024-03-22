import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLLMStore = defineStore('counter', () => {
  const loading = ref(false)
  function setLoading(loading_: boolean) {
    loading.value = loading_
  }

  return { loading, setLoading }
})
