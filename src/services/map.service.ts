import type { MapContextLayerWms } from '@geospatial-sdk/core'
import { Map } from 'maplibre-gl'

export function addWMSLayer(map: Map, layer: MapContextLayerWms) {
  map.addSource('wms-source', {
    type: 'raster',
    tiles: [
      `${layer.url}?service=WMS&request=GetMap&version=1.3.0&layers=${layer.name}&styles=&format=image/png&transparent=true&height=256&width=256&bbox={bbox-epsg-3857}&crs=EPSG:3857`
    ],
    tileSize: 256
  })
  map.addLayer({
    id: 'wms-layer',
    type: 'raster',
    source: 'wms-source',
    paint: {}
  })
}

export function addGeojson(map: Map, geojson) {
  const sourceId = 'overpass'

  if (map.getSource(sourceId)) {
    map.removeLayer('points')
    map.removeLayer('outlines')
    map.removeLayer('fills')
    map.removeSource(sourceId)
  }

  map.addSource(sourceId, {
    type: 'geojson',
    data: geojson
  } as any)

  map.addLayer({
    filter: ['all', ['==', ['geometry-type'], 'Point']],
    id: 'points',
    type: 'circle',
    source: sourceId,
    paint: {
      'circle-radius': 8,
      'circle-stroke-width': 4,
      'circle-color': 'red',
      'circle-stroke-color': 'white'
    }
  })
  map.addLayer({
    filter: ['all', ['==', ['geometry-type'], 'Polygon']],
    id: 'fills',
    type: 'fill',
    source: sourceId, // reference the data source
    layout: {},
    paint: {
      'fill-color': '#ff0000', // red color fill
      'fill-opacity': 0.5
    }
  })
  map.addLayer({
    filter: ['all', ['==', ['geometry-type'], 'LineString']],
    id: 'outlines',
    type: 'line',
    source: sourceId,
    layout: {},
    paint: {
      'line-color': '#ff0000',
      'line-width': 6
    }
  })
}
