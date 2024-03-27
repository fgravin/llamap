const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions'

interface OpenAIResponse {
  id: string
  object: string
  created: number
  model: string
  choices: Choice[]
}

interface Choice {
  message: Message
  finish_reason: string
  index: number
}

interface Message {
  role: string
  content: string
}

const lsnBbox = '46.4900,6.5800,46.5500, 6.6800'

export function callOpenAI(request: string): Promise<OpenAIResponse> {
  return fetch(OPENAI_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant.'
        },
        {
          role: 'user',
          content: buildPrompt(request)
        }
      ]
    })
  }).then((response) => response.json())
}

export function buildPrompt(request: string) {
  const openAIPrompt = `Write me a data query for Open Streetmap that returns common features known to exist in the OpenStreetMap database that are related to the term "${request}" within the bounding box extracted from query location.
Respond with just the "data" part of the querystring on a single line and no explanation.
Just insert the natural filter, and the bounding box filter if needed.
Format your response like this: data=[out:json][timeout:25];{INSERT_QUERY_HERE};out;>;out skel qt;

Example phrases and expected responses are:
"Hills that are over a height of 4000 meters" in Switzerland
data=[out:json][timeout:25];nwr["natural"="peak"](if:number(t["ele"])>500)(45.8179,5.9576,47.8085, 10.4921);out;>;out skel qt;

"Hilltops" in Lausanne
data=[out:json][timeout:25];nwr["natural"="peak"](46.4900,6.5800,46.5500, 6.6800);out;>;out skel qt;

"Buildings" within Lausanne
data=[out:json][timeout:25];nwr["building"](46.4900,6.5800,46.5500, 6.6800);out;>;out skel qt;

"Bridges over rivers" within Lausanne
?data=[out:json][timeout:25];nwr["waterway"="river"](46.4900,6.5800,46.5500, 6.6800);nwr(around:0)["bridge"];out;>;out skel qt;`

  return openAIPrompt
}
