<script setup lang="ts">
import { onMounted } from 'vue'
import { type LngLatLike, Map } from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

onMounted(() => {
  const zoom = 7
  const center: LngLatLike = [8.231973, 46.8182]

  new Map({
    container: 'mapContainer',
    //style: 'https://demo.baremaps.com/style.json',
    style: 'https://vectortiles.geo.admin.ch/styles/ch.swisstopo.leichte-basiskarte.vt/style.json',
    center,
    zoom: zoom
  })
})
</script>

<template>
  <div id="mapContainer" class="grow rounded-xl"></div>
</template>

<style scoped></style>
