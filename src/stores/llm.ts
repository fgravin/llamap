import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { MapContext } from '@geospatial-sdk/core'

export const useLLMStore = defineStore('llm', () => {
  const loading = ref(false)
  const mapContext = ref({} as MapContext)
  const geojson = ref(null)
  function setLoading(loading_: boolean) {
    loading.value = loading_
  }
  function setMapContext(mapContext_: MapContext) {
    mapContext.value = mapContext_
  }

  function setGeojson(geojson_) {
    geojson.value = geojson_
  }

  return { loading, setLoading, mapContext, setMapContext, geojson, setGeojson }
})
