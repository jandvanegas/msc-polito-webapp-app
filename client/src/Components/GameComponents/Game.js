import SelectionPage from './SelectionPage'
import GamePage from './GamePage'
import GameScore from './GameScore'
import { useState } from 'react'

function Game() {
  const [settings, setSettings] = useState({ level: 0, category: 0 })
  const [lastWords, setLastWords] = useState([])
  const [letter, setLetter] = useState('')

  if (lastWords.length > 0 && letter) {
    return (
      <GameScore lastWords={lastWords} letter={letter} settings={settings} />
    )
  } else if (settings.level && settings.category) {
    return (
      <GamePage
        settings={settings}
        setLetter={setLetter}
        setLastWords={setLastWords}
      />
    )
  } else {
    return <SelectionPage setSettings={setSettings} />
  }
}

export default Game
