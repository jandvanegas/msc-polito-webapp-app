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

const getUserInfo = async () => {
  const response = await fetch(`${configData.API_URL}/sessions/current`, {
    credentials: 'include',
  })

  if (response.ok) {
    const message = await response.json()
    if (message.status === 'logged_in') {
      return message.user
    }
    return null
  } else {
    throw await response.text()
  }
}

const logOut = async () => {
  const response = await fetch(`${configData.API_URL}/sessions/current`, {
    method: 'DELETE',
    credentials: 'include',
  })
  if (response.ok) return null
}

const API = {
  logIn,
  logOut,
  postScore,
  addRound,
  getUserInfo,
}
export default API
