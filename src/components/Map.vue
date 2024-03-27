<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { LngLatBounds, type LngLatLike, Map } from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { storeToRefs } from 'pinia'
import { useLLMStore } from '@/stores/llm'
import proj4 from 'proj4'
import { addGeojson, addWMSLayer } from '@/services/map.service'
import type { MapContextLayerWms } from '@geospatial-sdk/core'

proj4.defs(
  'EPSG:21781',
  '+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 +x_0=600000 +y_0=200000 +ellps=bessel +towgs84=674.374,15.056,405.346,0,0,0,0 +units=m +no_defs'
)
proj4.defs('EPSG:4326', '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs')

const llmStore = useLLMStore()
const { mapContext, geojson } = storeToRefs(llmStore)
let map: Map

onMounted(() => {
  const zoom = 7
  const center: LngLatLike = [8.231973, 46.8182]

  map = new Map({
    container: 'mapContainer',
    //style: 'https://demo.baremaps.com/style.json',
    style: 'https://vectortiles.geo.admin.ch/styles/ch.swisstopo.leichte-basiskarte.vt/style.json',
    center,
    zoom: zoom
  })
})

watch(mapContext, (newMapContext) => {
  const { view, layers } = newMapContext
  const { zoom, center } = view
  const transformedCenter = proj4('EPSG:21781', 'EPSG:4326', center)
  map.setCenter(transformedCenter as LngLatLike)
  map.setZoom(zoom as number)
  addWMSLayer(map, layers[0] as MapContextLayerWms)
})

watch(geojson, (newGeojson: any) => {
  addGeojson(map, newGeojson)
  const { bbox } = newGeojson
  const lonlatBounds = [bbox[1], bbox[0], bbox[3], bbox[2]] as any
  map.fitBounds(lonlatBounds, { padding: { top: 10, bottom: 25, left: 15, right: 5 } })
})
</script>

<template>
  <div id="mapContainer" class="grow rounded-xl"></div>
</template>

<style scoped></style>
