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

const addRound = async (round) => {
  const url = `${configData.API_URL}/rounds`
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
      letter: round.letter,
      category: round.category,
      level: round.level,
      words: round.words,
      score: round.score,
    }),
  })
  if (!response.ok) {
    throw await response.json()
  }
}

const logIn = async (credentials) => {
  const response = await fetch(`${configData.API_URL}/sessions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(credentials),
  })
  if (response.ok) {
    return await response.json()
  } else {
    throw await response.text()
  }
}
const API = {
  logIn,
  postScore,
  addRound,
}
export default API
