export async function callOverpassApi(response: any): Promise<object> {
  const pattern = /\(([-+]?\d+\.\d+),\s*([-+]?\d+\.\d+),\s*([-+]?\d+\.\d+),\s*([-+]?\d+\.\d+)\)/

  // Use the regex pattern to extract bounding box coordinates

  const osmURL = response.choices[0].message.content?.replace(/\n/g, '')
  const matches = osmURL.match(pattern)
  const bbox = matches.slice(1).map(parseFloat)
  return fetch(`https://overpass-api.de/api/interpreter?${osmURL}`)
    .then((response) => response.text())
    .then((data) => {
      const json = JSON.parse(data)
      // @ts-ignore
      const geojson = osmtogeojson(json)
      geojson.bbox = bbox
      return geojson
    })
}
