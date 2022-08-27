import SelectionPage from './SelectionPage'
import GamePage from './GamePage'
import GameScore from './GameScore'
import { useState } from 'react'

function Game() {
  const [settings, setSettings] = useState({ level: 0, category: 0 })
  const [lastWords, setLastWords] = useState([])

  function stopGame() {
    setSettings({ level: 0, category: 0 })
    const words = JSON.parse(localStorage.getItem('words'))
    if (words) {
      setLastWords(words)
      localStorage.setItem('words', JSON.stringify([]))
    }
  }

  if (lastWords.length > 0) {
    return <GameScore lastWords={lastWords} setLastWords={setLastWords} />
  } else if (settings.level && settings.category) {
    return <GamePage settings={settings} stopGame={stopGame} />
  } else {
    return <SelectionPage setSettings={setSettings} />
  }
}

export default Game
