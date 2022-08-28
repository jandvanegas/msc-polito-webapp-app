import configData from './config'

const postScore = async (category, letter, level, words) => {
  const response = await fetch(`${configData.API_URL}/score`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      category: category,
      letter: letter,
      level: parseInt(level),
      words: words,
    }),
  })
  if (response.ok) {
    return await response.json()
  } else {
    throw await response.text()
  }
}
const API = {
  postScore,
}
export default API
