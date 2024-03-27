import type { MapContext } from '@geospatial-sdk/core'

const API_PATH = 'http://localhost:8000/api/?q='

const MOCK_RESPONSE: MapContext = {
  view: {
    center: [538453.1875, 179974.234375],
    zoom: 10
  },
  layers: [
    {
      type: 'wms',
      url: 'https://wms0.geo.admin.ch/',
      name: 'ch.astra.veloland'
    }
  ]
}

export function callLLm(request: string): Promise<MapContext> {
  return fetch(API_PATH + request)
    .then((response) => response.json())
    .catch((error) => MOCK_RESPONSE)
}
